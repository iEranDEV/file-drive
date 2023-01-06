<template>
    <div class="w-full h-full flex flex-col gap-4">

        <!-- Heading -->
        <div class="flex justify-between items-center">
            <div class="flex flex-col md:flex-row md:gap-2">
                <h1 class="text-2xl font-extrabold font-montserrat text-stone-700 uppercase cursor-pointer" @click="currentPath = []">Favorites</h1>
                <p v-for="path in currentPath" :key="path.id" class="flex gap-2 items-center text-stone-400">
                    <i class="fa-solid fa-chevron-right text-stone-400"></i>
                    <span class="text-lg font-semibold font-montserrat">{{ path.name }}</span>
                </p>
            </div>
        </div>

        <!-- Data table -->
        <DataTable :currentPath="currentPath" @pathChange="handlePathChange" type="favorites" />
        
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
    data() {
        return {
            currentPath: Array<FileItem>(),
        }
    },
    methods: {
        handlePathChange(value: FileItem) {
            this.currentPath.push(value);
        }
    }
})
</script>


<style>

</style>