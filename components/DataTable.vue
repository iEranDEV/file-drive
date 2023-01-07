<template>
    <div class="h-full md:max-h-[78vh] overflow-auto relative transition-all">
        <!-- List view -->
        <table v-if="$store.state.viewType === 'list'" class="w-full text-stone-500 text-sm table-auto">
            <thead class="w-full uppercase">
                <tr class="w-full">
                    <th scope="col" class="text-start md:text-start w-20">
                        <div class="flex items-center gap-2 group cursor-pointer">
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
                <tr @contextmenu.prevent="openContextMenu($event, file)" v-for="file in structure" :key="file" @click="clickFile(file)" class="hover:bg-stone-300 cursor-pointer">
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
                        <svg @click.stop="openContextMenu($event, file)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- Grid view -->
        <div v-else-if="$store.state.viewType === 'grid'" class="">
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
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    setup() {
        
    },
    props: {
        currentPath: {
            type: Array as PropType<Array<FileItem>>,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            sortBy: 'none',
            sortType: 'desc',
        }
    },
    methods: {
        getDate(date: any) {
            if(date instanceof Date) {
                return date.toLocaleDateString();
            } else return date.toDate().toLocaleDateString();
        },
        clickFile(file: FileItem) {
            if(file.type === 'FOLDER') {
                this.$emit('pathChange', file);
            } else {
                this.$store.commit('setSelectedFile', file);
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
        },
        openContextMenu(event: Event, file: FileItem) {
            event.preventDefault();
            this.$store.commit('setContextMenu', {
                event: event as PointerEvent,
                file: file
            })
        }
    },
    computed: {
        structure() {
            if(!this.$store.state.files) return;
            let structure = Array<FileItem>();
            if(this.currentPath.length == 0) {
                (this.$store.state.files as Array<FileItem>).forEach((file) => {
                    if(file.folder === null) {
                        if(this.type === 'favorites' && file.favorite === true) {
                            structure.push(file)
                        } else if(this.type === 'my_files') {
                            structure.push(file);
                        }
                    }
                })
            } else {
                (this.$store.state.files as Array<FileItem>).forEach((file) => {
                    if(file.folder === this.currentPath[this.currentPath.length - 1].id) {
                        if(this.type === 'favorites' && file.favorite === true) {
                            structure.push(file)
                        } else if(this.type === 'my_files') {
                            structure.push(file);
                        }
                    }
                })
            }

            if(this.$store.state.searchQuery != null) {
                structure = structure.filter(item => item.name.toLowerCase().includes(this.$store.state.searchQuery.toLowerCase()));
            }

            structure.sort(function sortByType(a, b): number {
                if(a.type === 'FOLDER') return -1;
                return 0;
            })

            switch(this.sortBy) {
                case 'name':
                    if(this.sortType === 'desc') {
                        structure.sort((a, b) => {
                            return a.name.localeCompare(b.name);
                        })
                    } else {
                        structure.sort((a, b) => {
                            return b.name.localeCompare(a.name);
                        })
                    }
                    break;
                case 'modified':
                    if(this.sortType === 'desc') {
                        structure.sort((a, b) => {
                            return (a.modified instanceof Date ? a.modified : (a.modified as any).toDate()).getTime() - (b.modified instanceof Date ? b.modified : (b.modified as any).toDate()).getTime()
                        })
                    } else {
                        structure.sort((a, b) => {
                            return (b.modified instanceof Date ? b.modified : (b.modified as any).toDate()).getTime() - (a.modified instanceof Date ? a.modified : (a.modified as any).toDate()).getTime()
                        })
                    }
                    break;
            }

            return structure;
        }
    }
})
</script>


<style>

</style>