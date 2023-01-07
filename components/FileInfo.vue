<template>
    <div class="fixed z-50 md:static bg-stone-100 flex h-screen flex-col md:transition-all md:duration-1000" :class="$store.state.selectedFile != null ? 'w-96 ' : 'w-0'">
        <div class="w-full h-full px-4 flex flex-col gap-2 text-stone-700" :class="{'hidden': $store.state.selectedFile === null}">
            <div class="flex justify-end items-center py-8">
                <i @click="$store.commit('setSelectedFile', null)" class="fa-solid fa-xmark fa-xl cursor-pointer"></i>
            </div>
            <div class="flex flex-col h-full justify-between">
                <div class="w-full flex flex-col gap-8">
                    <img v-if="$store.state.selectedFile?.format.includes('image')" :src="$store.state.selectedFile.dbURL" alt="" class="rounded-xl w-full">

                    <div class="flex flex-col">
                        <p class="text-xs uppercase font-extrabold text-stone-400">Name</p>
                        <p class="text-sm">{{ $store.state.selectedFile?.name }}</p>
                    </div>

                    <div class="flex flex-col">
                        <p class="text-xs uppercase font-extrabold text-stone-400">Format</p>
                        <p class="text-sm">{{ $store.state.selectedFile?.format }}</p>
                    </div>

                    <div class="flex flex-col">
                        <p class="text-xs uppercase font-extrabold text-stone-400">Created at</p>
                        <p class="text-sm">{{ $store.state.selectedFile?.modified.toDate().toLocaleString() }}</p>
                    </div>

                </div>
                <div class="w-full py-4">
                    <button @click="downloadFile" class="bg-purple-400 h-10 w-full rounded-xl flex gap-4 items-center justify-center py-2 px-4 text-stone-100 font-semibold hover:bg-purple-500 transition-all">
                        <i class="fa-solid fa-download fa-lg"></i>
                        <p>Download</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const firebase = useFirebase();
        
        return {
            firebase
        }
    },
    methods: {
        async downloadFile() {
            let file = {...this.$store.state.selectedFile};
            if(file.type === 'FILE') {
                fetch(file.dbURL).then(response => response.blob()).then(blob => {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = file.name
                    link.click()
                })
            } 
        }
    }
})
</script>


<style>

</style>