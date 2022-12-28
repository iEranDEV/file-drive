<template>
    <div class="w-full h-full flex flex-col gap-4">

        <!-- Heading -->
        <div class="flex justify-between items-center h-10">
            <h1 class="text-2xl font-extrabold font-montserrat text-stone-700 uppercase">My files</h1>
            <div class="flex gap-2 items-center justify-end">
                <button class="bg-purple-400 rounded-xl flex gap-4 items-center justify-center w-10 md:w-auto aspect-square md:aspect-auto md:py-2 md:px-4 text-stone-100 font-semibold hover:bg-purple-500 transition-all">
                    <i class="fa-solid fa-folder fa-lg"></i>
                    <p class="hidden md:inline">Create folder</p>
                </button>
                <button class="bg-purple-400 rounded-xl flex gap-4 items-center justify-center w-10 md:w-auto aspect-square md:aspect-auto md:py-2 md:px-4 text-stone-100 font-semibold hover:bg-purple-500 transition-all">
                    <i class="fa-solid fa-file-arrow-up fa-lg"></i>
                    <p class="hidden md:inline">Add file</p>
                </button>
            </div>
        </div>

        <!-- Data table -->
        <table class="w-full h-full overflow-auto flex flex-col text-stone-700">
            test
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();
        const firebase = useFirebase();

        return {
            store,
            firebase
        }
    },
})
</script>


<style>

</style>