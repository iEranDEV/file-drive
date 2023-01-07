<template>
    <div class="w-full h-full flex flex-col gap-2">

        <!-- Heading -->
        <div class="flex justify-between items-center mt-16 md:mt-0">
            <h1 class="text-2xl font-extrabold font-montserrat text-stone-700 uppercase">Profile</h1>
        </div>

        <!-- Sections -->
        <div class="flex flex-col">
            <div class="w-full md:w-auto flex text-stone-700">
                <p @click="current_section = 'overview_section'" :class="{' bg-stone-200 md:bg-stone-300 rounded-t-xl' : current_section === 'overview_section'}" class="transition-all w-1/2 md:w-auto p-2 md:px-6 flex gap-2 justify-center items-center font-semibold font-montserrat cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    Overview
                </p>
                <p @click="current_section = 'settings_section'" :class="{' bg-stone-200 md:bg-stone-300 rounded-t-xl' : current_section === 'settings_section'}" class="transition-all w-1/2 md:w-auto p-2 md:px-6 flex gap-2 justify-center items-center font-semibold font-montserrat cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                    </svg>
                    Settings
                </p>
            </div>
            <div class="w-full bg-stone-200 md:bg-stone-300 rounded-b-xl p-4" :class="current_section === 'overview_section' ? 'rounded-tr-xl' : ' rounded-tl-xl md:rounded-tr-xl'">
                <SectionOverview v-if="current_section === 'overview_section'"></SectionOverview>
                <SectionSettings v-else-if="current_section === 'settings_section'"></SectionSettings>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();
        const firebase = useFirebase();
        const current_section = ref('overview_section');

        return {
            store,
            firebase,
            current_section
        }
    },
})
</script>


<style>

</style>