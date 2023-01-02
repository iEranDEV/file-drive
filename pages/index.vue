<template>
    <div class="w-full h-full flex flex-col gap-4">

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
        <div class="h-full md:max-h-[78vh] overflow-auto relative transition-all">
            <!-- List view -->
            <table v-if="$store.state.viewType === 'list'" class="w-full text-stone-500 text-sm table-auto">
                <thead class="w-full uppercase">
                    <tr class="w-full">
                        <th scope="col" class="text-start md:text-start w-20">
                            <div @click="handleSort('type')" class="flex items-center gap-2 group cursor-pointer">
                                <p>Type</p>
                            </div>
                        </th>
                        <th scope="col" class="text-start">
                            <div @click="handleSort('name')" class="flex items-center gap-2 group cursor-pointer text-stone-500 hover:text-stone-400">
                                <p>Name</p>
                                <div>
                                    <i v-if="sortBy === 'name' && sortType === 'desc'" class="fa-solid fa-sort-down"></i>
                                    <i v-else-if="sortBy === 'name' && sortType === 'asc'" class="fa-solid fa-sort-up"></i>
                                    <i v-else class="fa-solid fa-sort hidden group-hover:inline"></i>
                                </div>
                            </div>
                        </th>
                        <th scope="col" class="hidden md:table-cell text-start w-44">
                            <div @click="handleSort('modified')" class="flex items-center gap-2 group cursor-pointer text-stone-500 hover:text-stone-400">
                                <p>Modified</p>
                                <div>
                                    <i v-if="sortBy === 'modified' && sortType === 'desc'" class="fa-solid fa-sort-down"></i>
                                    <i v-else-if="sortBy === 'modified' && sortType === 'asc'" class="fa-solid fa-sort-up"></i>
                                    <i v-else class="fa-solid fa-sort hidden group-hover:inline"></i>
                                </div>
                            </div>
                        </th>
                        <th scope="col" class="hidden md:table-cell text-start w-40"></th>
                        <th scope="col" class="w-10"></th>
                    </tr>
                </thead>
                <tbody class="text-stone-700">
                    <tr v-for="file in structure" :key="file" @click="clickFile(file)" class="hover:bg-stone-300 cursor-pointer">
                        <td class="text-start md:text-center py-3">
                            <i v-if="file.type === 'FOLDER'" class="fa-regular fa-folder fa-xl text-amber-500"></i>
                            <i v-else-if="file.format === 'application/pdf'" class="fa-regular fa-file-pdf fa-xl text-red-500"></i>
                            <i v-else-if="file.format === 'image/png'" class="fa-regular fa-image fa-xl text-teal-400"></i>
                        </td>
                        <td>{{ file.name }}</td>
                        <td class="hidden md:table-cell">{{ getDate(file.modified) }}</td>
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

            <!-- Grid view -->
            <div v-else-if="$store.state.viewType === 'grid'" class="">
                <div class="w-full h-10">
                    <!-- TODO: Order options -->
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 pt-2">
                    <div v-for="file in structure" :key="file" @click="clickFile(file)" class="rounded-xl bg-stone-50 md:bg-stone-100 w-full text-sm p-2 h-16 flex justify-between gap-2 items-center cursor-pointer hover:bg-stone-100/50">
                        <div class="flex items-center gap-2 truncate">
                            <i v-if="file.type === 'FOLDER'" class="fa-regular fa-folder fa-xl text-amber-500"></i>
                            <i v-else-if="file.format === 'application/pdf'" class="fa-regular fa-file-pdf fa-xl text-red-500"></i>
                            <i v-else-if="file.format === 'image/png'" class="fa-regular fa-image fa-xl text-teal-400"></i>
                            <p class="truncate">{{ file.name }}</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts">
import { collection, doc, getDocs, query, setDoc } from '@firebase/firestore';
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
            folderModal,
        }
    },
    data() {
        return {
            files: Array<FileItem>(),
            currentPath: Array<FileItem>(),
            sortBy: 'none',
            sortType: 'desc',
        }
    },
    computed: {
        structure() {
            const structure = Array<FileItem>();
            if(this.currentPath.length == 0) {
                this.files.forEach((file) => {
                    if(file.folder === null) structure.push(file);
                })
            } else {
                this.files.forEach((file) => {
                    if(file.folder === this.currentPath[this.currentPath.length - 1].id) structure.push(file);
                })
            }

            console.log('returned structure')

            structure.sort(function sortByType(a, b): number {
                if(a.type === 'FOLDER') return -1;
                return 0;
            })

            

            return structure;
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

                for(const file of Array.from(target.files as FileList)) {
                    const url = await uploadBytes(FirebaseRef(this.firebase.storage, file.name), file).then(async (snapshot) => {
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
                    }
                    await setDoc(doc(this.firebase.firestore, "files", id), fileItem);
                    this.files.push(fileItem);
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
                    folder: null,
                    format: null,
                    dbURL: null,
                    name: name,
                    modified: new Date(),
                }
                await setDoc(doc(this.firebase.firestore, "files", id), fileItem);
                this.files.push(fileItem);
            }
        },
        getDate(date: any) {
            if(date instanceof Date) {
                return date.toLocaleString();
            } else return date.toDate().toLocaleString();
        },
        clickFile(file: FileItem) {
            if(file.type === 'FOLDER') {
                this.currentPath.push(file);
            }
        },
        handleSort(value: string) {
            if(this.sortBy === value) {
                if(this.sortType === 'desc') this.sortType = 'asc';
                else {
                    this.sortBy = 'none';
                    this.sortType = 'desc';
                }
            } else {
                this.sortBy = value;
                this.sortType = 'desc';
            }
        }
    }
})
</script>


<style>

</style>