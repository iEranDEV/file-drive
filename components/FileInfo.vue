<template>
    <div class="flex h-screen flex-col transition-all duration-1000" :class="$store.state.selectedFile != null ? 'w-96 ' : 'w-0'">
        <div class="w-full p-4 flex flex-col gap-2 text-stone-700" :class="{'hidden': $store.state.selectedFile === null}">
            <div class="flex justify-end items-center py-4">
                <i @click="$store.commit('setSelectedFile', null)" class="fa-solid fa-xmark fa-lg cursor-pointer"></i>
            </div>
            <div class="w-full flex flex-col gap-2">
                <img v-if="$store.state.selectedFile?.format.includes('image')" :src="$store.state.selectedFile.dbURL" alt="">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>


<style>

</style>