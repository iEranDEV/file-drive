<template>
    <div v-if="$store.state.user != {}" class="md:h-screen flex fixed md:w-24 md:bg-stone-100 lg:w-60 z-20" :class="[menu ? 'w-screen h-screen' : 'w-16 h-16']">

        <!-- Purple circle (mobile only) -->
        <div class="md:hidden transition-all bg-purple-400 duration-500 absolute rounded-full" :class="[menu ? 'w-[90rem] h-[90rem] -top-96 -left-96' : 'w-20 h-20 -top-4 -left-4']">
        </div>

        <!-- Mobile toggler -->
        <button @click="toggleMenu()" class="fixed top-0 z-20 left-0 m-3 text-stone-100 md:hidden">
            <i v-if="!menu" class="fa-solid fa-bars fa-2xl"></i>
            <i v-else class="fa-solid fa-xmark fa-2xl"></i>
        </button>

        <!-- Menu -->
        <div class="w-full h-full flex-col justify-center md:justify-around items-center z-10 transition-all duration-300 flex md:opacity-100 px-4 md:flex" :class="menu ? 'flex' : 'hidden'">
            <img src="~/assets/logo.png" alt="Logo" class="lg:h-32 hidden lg:block">
            <img src="~/assets/box_logo.png" alt="Logo" class="lg:h-32 hidden md:block lg:hidden">

            <div class="flex flex-col gap-1 w-full justify-center items-center">
                <!-- My files -->
                <nav-button route="/">
                    <template #icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:w-6 md:h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </template>
                    <template #text>My files</template>
                </nav-button>

                <!-- Shared files -->
                <nav-button route="/shared">
                    <template #icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:w-6 md:h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                    </template>
                    <template #text>Shared files</template>
                </nav-button>

                <!-- Starred -->
                <nav-button route="/starred">
                    <template #icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:w-6 md:h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </template>
                    <template #text>Starred</template>
                </nav-button>

                <!-- Recycle bin -->
                <nav-button route="/trash">
                    <template #icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:w-6 md:h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </template>
                    <template #text>Recycle bin</template>
                </nav-button>

                <!-- Settings -->
                <nav-button route="/settings">
                    <template #icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:w-6 md:h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                        </svg>
                    </template>
                    <template #text>Settings</template>
                </nav-button>
            </div>

            <div class="flex flex-col gap-1 w-full justify-center items-center">
                <!-- Help center -->
                <nav-button route="/test">
                    <template #icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:w-6 md:h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                    </template>
                    <template #text>Help center</template>
                </nav-button>
            
                <!-- Settings -->
                <button @click="logOut()" class="w-full">
                    <div class="flex justify-start md:justify-center lg:justify-start items-center w-full gap-4 px-2 py-2 hover:bg-stone-200 hover:text-stone-700 rounded-lg" :class="$route.path == route ? 'text-purple-400 bg-purple-100 font-semibold' : 'text-stone-100 md:text-stone-700'">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 md:w-6 md:h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                        <p class="text-lg md:text-base md:hidden lg:block">Log out</p>
                    </div>
                </button>
                
            </div>
            
        </div>

        </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const menu = ref(false);
        const firebase = useFirebase();

        return {
            menu,
            firebase,
        }
    },
    methods: {
        toggleMenu() {
            this.menu = !this.menu;
        },
        logOut() {
            this.firebase.auth.signOut();
            this.$store.commit('setUser', {});
            navigateTo('/accounts/login');
        }
    }
})
</script>


<style>

</style>