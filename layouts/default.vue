<template>
    <div class="h-full md:h-screen w-full">

        <NavBar />        

        <div class="w-full h-full flex flex-col md:flex-row md:pl-28 lg:pl-64">
            <div class=" md:py-4 md:pr-4 w-screen h-full md:h-screen min-h-screen md:max-h-screen">
                <div class="w-full h-full md:bg-stone-200 p-4 md:rounded-xl">
                    <div v-if="$store.state.loaded" class="w-full h-full flex flex-col gap-2">
                        <div class="h-10 w-full">
                            <UserBar />
                        </div>
                        <div class="h-max w-full">
                            <slot />
                        </div>
                    </div>
                    <div v-else class="w-full h-full flex justify-center items-center">
                        <svg class="animate-spin h-8 w-8" fill="#6b7280" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"/></svg>
                    </div>
                </div>
            </div>

            <!--<InfoBar />-->
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {

    },
    methods: {
    }
})
</script>


<style>

</style>