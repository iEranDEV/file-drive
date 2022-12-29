<template>
    <div class="fixed w-screen h-screen flex justify-center items-center min-h-screen min-w-screen top-0 left-0 backdrop-blur-[1px] bg-stone-700/30 z-50 transition-all">
        <form @submit.prevent="create()" class="rounded-xl bg-stone-100 p-4 w-80 md:w-96 flex flex-col gap-2 text-stone-700">
            <div class="flex justify-between gap-4 items-center">
                <p class="font-semibold">Create new folder</p>
                <i @click="close()" class="fa-solid fa-xmark fa-lg cursor-pointer"></i>
            </div>
            <input v-model="name" type="text" placeholder="Enter folder's name..." class="bg-stone-100 py-2">
            <div class="flex justify-end">
                <button type="submit" class="w-10 h-10 bg-purple-400 hover:bg-purple-500 rounded-xl flex justify-center items-center">
                    <i class="fa-solid fa-folder-plus text-stone-100 fa-lg"></i>
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const name = ref('');

        return {
            name
        }
    },
    methods: {
        close() {
            this.name = '';
            this.$emit('close');
        },
        create() {
            this.$emit('create', this.name);
            this.close();
        }
    }
})
</script>

<style>

</style>