<template>
    <div v-if="$store.state.contextMenu" @click="$store.commit('setContextMenu', null)" class="fixed w-screen h-screen min-h-screen min-w-screen top-0 left-0 z-50 transition-all">
        
        <div ref="context_menu" @click.stop="getWidth()" class="absolute bg-stone-100 rounded-xl py-2 flex flex-col justify-start items-center text-stone-700 shadow-xl">
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
            <div class="hover:bg-stone-200 flex gap-4 justify-start items-center px-4 py-2 w-full cursor-pointer">
                <i class="fa-regular fa-star"></i>
                <p>Add to favorites</p>
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
            <div class="hover:bg-stone-200 flex gap-4 justify-start items-center px-4 py-2 w-full cursor-pointer">
                <i class="fa-regular fa-trash-can"></i>
                <p>Delete</p>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {

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