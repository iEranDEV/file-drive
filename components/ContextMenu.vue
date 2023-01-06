<template>
    <div v-if="$store.state.contextMenu" @click="$store.commit('setContextMenu', null)" class="fixed w-screen h-screen min-h-screen min-w-screen top-0 left-0 z-50 transition-all">
        
        <div ref="context_menu" class="absolute bg-stone-100 rounded-xl py-2 flex flex-col justify-start items-center text-stone-700 shadow-xl">
            <!-- Edit button -->
            <div class="hover:bg-stone-200 flex gap-4 justify-start items-center px-4 py-2 w-full cursor-pointer">
                <i class="fa-regular fa-pen-to-square"></i>
                <p>Edit</p>
            </div>

            <!-- Share button -->
            <div class="hover:bg-stone-200 flex gap-4 justify-start items-center px-4 py-2 w-full cursor-pointer">
                <i class="fa-regular fa-share-from-square"></i>
                <p>Share</p>
            </div>

            <!-- Star button -->
            <div @click.stop="favoriteFile" class="hover:bg-stone-200 flex gap-4 justify-start items-center px-4 py-2 w-full cursor-pointer">
                <i :class="$store.state.contextMenu.file.favorite ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
                <p v-if="$store.state.contextMenu.file.favorite">Remove from favorites</p>
                <p v-else>Add to favorites</p>
            </div>

            <!-- Download button -->
            <div class="hover:bg-stone-200 flex gap-4 justify-start items-center px-4 py-2 w-full cursor-pointer">
                <i class="fa-regular fa-circle-down"></i>
                <p>Download</p>
            </div>

            <!-- Move button -->
            <div class="hover:bg-stone-200 flex gap-4 justify-start items-center px-4 py-2 w-full cursor-pointer">
                <i class="fa-regular fa-clone"></i>
                <p>Move to</p>
            </div>

            <!-- Delete button -->
            <div @click.stop="deleteFile" class="hover:bg-stone-200 flex gap-4 justify-start items-center px-4 py-2 w-full cursor-pointer">
                <i class="fa-regular fa-trash-can"></i>
                <p>Delete</p>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { collection, deleteDoc, doc, getDocs, updateDoc } from '@firebase/firestore';
import { query, where } from 'firebase/firestore';
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const firebase = useFirebase();

        return {
            firebase,
        }
    },
    methods: {
        async deleteFile() {
            let file = this.$store.state.contextMenu.file;
            await deleteDoc(doc(this.firebase.firestore, "files", file.id));
            if(file.type === 'FOLDER') {
                const q = query(collection(this.firebase.firestore, "files"), where("folder", "==", file.id));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((element) => {
                    deleteDoc(doc(this.firebase.firestore, "files", element.data().id));
                })
            }
            this.$store.commit('deleteFile', file);
            this.$store.commit('addNotification', {
                id: (crypto as any).randomUUID(),
                message: 'Removed file',
                type: 'ERROR'
            })
            this.$store.commit('setContextMenu', null)
        },
        async favoriteFile() {
            let file = {...this.$store.state.contextMenu.file};
            let value = !file.favorite;
            file.favorite = value;
            this.$store.commit('setFile', file);
            await updateDoc(doc(this.firebase.firestore, "files", file.id), {
                favorite: value,
            })
            if(file.type === 'FOLDER') {
                const q = query(collection(this.firebase.firestore, "files"), where("folder", "==", file.id));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((element) => {
                    updateDoc(doc(this.firebase.firestore, "files", element.data().id), {
                        favorite: value,
                    });
                })
            }
            this.$store.commit('addNotification', {
                id: (crypto as any).randomUUID(),
                message: file.favorite ? 'Added file to favorites' : 'Removed file from favorites',
                type: file.favorite ? 'SUCCESS' : 'ERROR'
            })
            this.$store.commit('setContextMenu', null)
        }
    },
    computed: {
        contextMenu() {
            return this.$store.state.contextMenu;
        }
    },
    watch: {
        async contextMenu(newVal, oldVal) {
            if(newVal) {
                await nextTick();
                const element = this.$refs.context_menu as HTMLElement;
                element.style.top = this.$store.state.contextMenu.event.pageY + 10 + 'px';
                element.style.left = this.$store.state.contextMenu.event.pageX - element.offsetWidth + 'px'
            }
        }
    }
})
</script>

<style>

</style>