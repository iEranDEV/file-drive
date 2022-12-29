<template>
    <div class="w-full h-full flex flex-col gap-4">

        <!-- Heading -->
        <div class="flex justify-between items-center h-10">
            <h1 class="text-2xl font-extrabold font-montserrat text-stone-700 uppercase">My files</h1>
            <div class="flex gap-2 items-center justify-end">
                <!-- Create folder button -->
                <button @click="folderModal = !folderModal" class="bg-purple-400 rounded-xl flex gap-4 items-center justify-center w-10 md:w-auto aspect-square md:aspect-auto md:py-2 md:px-4 text-stone-100 font-semibold hover:bg-purple-500 transition-all">
                    <i class="fa-solid fa-folder fa-lg"></i>
                    <p class="hidden md:inline">Create folder</p>
                </button>

                <!-- Create folder modal -->
                <ModalFolder v-if="folderModal" @close="folderModal = false" />

                <!-- Add file button -->
                <button @click="$refs.add_file.click()" class="bg-purple-400 rounded-xl flex gap-4 items-center justify-center w-10 md:w-auto aspect-square md:aspect-auto md:py-2 md:px-4 text-stone-100 font-semibold hover:bg-purple-500 transition-all">
                    <i class="fa-solid fa-file-arrow-up fa-lg"></i>
                    <p class="hidden md:inline">Add file</p>
                    <input @change="addFiles" type="file" class="hidden" ref="add_file" multiple>
                </button>
            </div>
        </div>

        <!-- Data table -->
        <div class="h-full md:max-h-[78vh] overflow-auto relative">
            <table class="w-full text-stone-500 text-sm table-auto">
                <thead class="w-full uppercase">
                    <tr class="w-full">
                        <th scope="col" class="text-start md:text-center w-16">Type</th>
                        <th scope="col" class="text-start">Name</th>
                        <th scope="col" class="hidden md:table-cell text-start w-32">Modified</th>
                        <th scope="col" class="hidden md:table-cell text-start w-40"></th>
                        <th scope="col" class="w-10"></th>
                    </tr>
                </thead>
                <tbody class="text-stone-700">
                    <tr v-for="file in files" :key="file" class="hover:bg-stone-300 cursor-pointer">
                        <td class="text-start md:text-center py-3">
                            <i v-if="file.type === 'FOLDER'" class="fa-regular fa-folder fa-xl text-amber-500"></i>
                            <i v-else-if="file.format === 'application/pdf'" class="fa-regular fa-file-pdf fa-xl text-red-500"></i>
                            <i v-else-if="file.format === 'image/png'" class="fa-regular fa-image fa-xl text-teal-400"></i>
                        </td>
                        <td>{{ file.name }}</td>
                        <td class="hidden md:table-cell">test</td>
                        <td class="hidden md:table-cell text-center montserrat text-stone-400 uppercase text-xs">
                            Private
                        </td>
                        <td class="text-end">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
</template>

<script lang="ts">
import { addDoc, collection, getDocs, query } from '@firebase/firestore';
import { where } from 'firebase/firestore';
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
            folderModal
        }
    },
    data() {
        return {
            files: Array<FileItem>(),
        }
    },
    async mounted() {
        const q = query(collection(this.firebase.firestore, "files"), where("owner", "==", this.store.state.user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            this.files.push(doc.data() as FileItem);
        })
    },
    methods: {
        async addFiles(event: Event) {
            const target = event.target as HTMLInputElement;
            if(target && target.files?.length && target.files?.length > 0) {
                const target = event.target as HTMLInputElement;
                console.log(target.files);

                for(const file of Array.from(target.files as FileList)) {
                    const url = await uploadBytes(FirebaseRef(this.firebase.storage, file.name), file).then(async (snapshot) => {
                        return getDownloadURL(snapshot.ref).then((url) => {
                            return url;
                        })
                    })
                    const fileItem: FileItem = {
                        owner: this.store.state.user.uid,
                        type: 'FILE',
                        format: file.type,
                        dbURL: url,
                        name: file.name,
                        modified: new Date(),
                    }
                    const docRef = await addDoc(collection(this.firebase.firestore, "files"), fileItem);
                    //console.log(docRef);
                    // console.log(url);
                    this.files.push(fileItem);
                }
            }
        },
        async createFolder() {
            const fileItem: FileItem = {
                owner: this.store.state.user.uid,
                type: 'FOLDER',
                format: '',
                dbURL: '',
                name: 'Untitled',
                modified: new Date(),
            }
            this.files.push(fileItem);
        }
    }
})
</script>


<style>

</style>