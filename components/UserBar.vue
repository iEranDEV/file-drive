<template>
    <div v-if="$route.fullPath === '/settings' || $route.fullPath === '/profile'" class="w-full h-10 flex justify-end md:justify-end mb-2">
        <div class="flex justify-end items-center gap-4">
            <button class="flex justify-center items-center relative h-9 w-9 text-stone-400 hover:text-stone-700">
                <i class="fa-solid fa-bell fa-xl"></i>
                <div class="w-2 h-2 bg-purple-500 border border-stone-100 rounded-full absolute top-2 right-2"></div>
            </button>

            <!-- User profile -->
            <NuxtLink to="/" class="flex justify-center items-center">
                <img :src="this.$store.state.user.photoURL" alt="User avatar" class="h-9 w-9 rounded-full border border-purple-400">
            </NuxtLink>
        </div>
    </div>
    <div v-else class="w-full h-10 flex justify-end md:justify-between mb-2">
        <form class="gap-2 items-center hidden md:flex">
            <button type="submit" class="flex justify-center items-center text-stone-400 hover:text-stone-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </button>
            <input type="text" name="search_bar" id="search_bar" class="bg-inherit placeholder-stone-400 px-2 py-1 text-stone-700" placeholder="Search file...">
        </form>

        <div class="flex justify-between items-center gap-4">

            <button @click="$store.commit('setViewType', 'grid')" class="h-9 w-9 rounded-xl flex justify-center items-center" :class="$store.state.viewType === 'grid' ? 'text-purple-400' : 'text-stone-400 hover:text-stone-700'">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
            </button>

            <button @click="$store.commit('setViewType', 'list')" class="h-9 w-9 rounded-xl flex justify-center items-center" :class="$store.state.viewType === 'list' ? 'text-purple-400' : 'text-stone-400 hover:text-stone-700'">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            </button>

            <button class="flex justify-center items-center relative h-9 w-9 text-stone-400 hover:text-stone-700">
                <i class="fa-solid fa-bell fa-xl"></i>
                <div class="w-2 h-2 bg-purple-500 border border-stone-100 rounded-full absolute top-2 right-2"></div>
            </button>

            <NuxtLink to="/" class="flex justify-center items-center">
                <img :src="this.$store.state.user.photoURL" alt="User avatar" class="h-9 w-9 rounded-full border border-purple-400">
            </NuxtLink>
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