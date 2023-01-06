<template>
    <div class="w-full h-full flex flex-col gap-4 md:overflow-hidden">

        <!-- Heading -->
        <div class="flex justify-between items-center">
            <div class="flex flex-col md:flex-row md:gap-2">
                <h1 class="text-2xl font-extrabold font-montserrat text-stone-700 uppercase cursor-pointer" @click="currentPath = []">My files</h1>
                <p v-for="path in currentPath" :key="path.id" class="flex gap-2 items-center text-stone-400">
                    <i class="fa-solid fa-chevron-right text-stone-400"></i>
                    <span class="text-lg font-semibold font-montserrat">{{ path.name }}</span>
                </p>
            </div>
            <div class="flex gap-2 items-center justify-end">
                <!-- Create folder button -->
                <button @click="folderModal = !folderModal" class="bg-purple-400 rounded-xl flex gap-4 items-center justify-center w-10 md:w-auto aspect-square md:aspect-auto md:py-2 md:px-4 text-stone-100 font-semibold hover:bg-purple-500 transition-all">
                    <i class="fa-solid fa-folder fa-lg"></i>
                    <p class="hidden md:inline">Create folder</p>
                </button>

                <!-- Create folder modal -->
                <ModalFolder v-if="folderModal" @close="folderModal = false" @create="createFolder" />

                <!-- Add file button -->
                <button @click="$refs.add_file.click()" class="bg-purple-400 rounded-xl flex gap-4 items-center justify-center w-10 md:w-auto aspect-square md:aspect-auto md:py-2 md:px-4 text-stone-100 font-semibold hover:bg-purple-500 transition-all">
                    <i class="fa-solid fa-file-arrow-up fa-lg"></i>
                    <p class="hidden md:inline">Add file</p>
                    <input @change="addFiles" type="file" class="hidden" ref="add_file" multiple>
                </button>
            </div>
        </div>

        <!-- Data table -->
        <DataTable :currentPath="currentPath" @pathChange="handlePathChange" type="my_files" />
        
    </div>
</template>

<script lang="ts">
import { doc, setDoc } from '@firebase/firestore';
import { uploadBytes, getDownloadURL, ref as FirebaseRef } from 'firebase/storage';
import { defineComponent } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();
        const firebase = useFirebase();
        const folderModal = ref(false);

        return {
            store,
            firebase,
            folderModal,
        }
    },
    data() {
        return {
            currentPath: Array<FileItem>(),
        }
    },
    methods: {
        handlePathChange(value: FileItem) {
            this.currentPath.push(value);
        },
        async addFiles(event: Event) {
            const target = event.target as HTMLInputElement;
            if(target && target.files?.length && target.files?.length > 0) {
                const target = event.target as HTMLInputElement;
                for(const file of Array.from(target.files as FileList)) {
                    const url = await uploadBytes(FirebaseRef(this.firebase.storage, this.$store.state.user.uid + '/' + file.name), file).then(async (snapshot) => {
                        return getDownloadURL(snapshot.ref).then((url) => {
                            return url;
                        })
                    })
                    const id = (crypto as any).randomUUID();
                    const fileItem: FileItem = {
                        id: id,
                        owner: this.store.state.user.uid,
                        type: 'FILE',
                        format: file.type,
                        folder: this.currentPath.length === 0 ? null : this.currentPath[this.currentPath.length - 1].id,
                        dbURL: url,
                        name: file.name,
                        modified: new Date(),
                        favorite: false
                    }
                    await setDoc(doc(this.firebase.firestore, "files", id), fileItem);
                    this.$store.commit('addFile', fileItem);
                }
            }
        },
        async createFolder(name: string) {
            if(name) {
                const id = (crypto as any).randomUUID();
                const fileItem: FileItem = {
                    id: id,
                    owner: this.store.state.user.uid,
                    type: 'FOLDER',
                    folder: this.currentPath.length === 0 ? null : this.currentPath[this.currentPath.length - 1].id,
                    format: null,
                    dbURL: null,
                    name: name,
                    modified: new Date(),
                    favorite: false
                }
                await setDoc(doc(this.firebase.firestore, "files", id), fileItem);
                this.$store.commit('addFile', fileItem);
            }
        }
    }
})
</script>


<style>

</style>