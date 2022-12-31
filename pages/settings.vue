<template>
    <div class="w-full h-full flex flex-col gap-4">

        <!-- Heading -->
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-extrabold font-montserrat text-stone-700 uppercase">Settings</h1>
        </div>

        <div class="w-full h-full md:max-h-[78vh] overflow-auto flex flex-col md:flex-row gap-4">
            <div class="max-w-lg w-full flex flex-col gap-2">
                
                <div class="w-2/3 grid grid-cols-5 gap-2">
                    <div class="w-full aspect-square rounded-xl flex justify-center items-center cursor-pointer" v-for="color in colors" :key="color" @click="setColorTheme(color)" :class="'bg-' + color + '-500'">
                        <i v-if="$store.state.user.colorTheme === color" class="fa-solid fa-check fa-xl text-stone-100"></i>
                    </div>
                </div>

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
        const colors = ['red', 'green', 'teal', 'indigo', 'purple'];

        return {
            store,
            firebase,
            colors
        }
    },
    methods: {
        setColorTheme(color: string) {
            this.$store.commit('setColorTheme', color);
        }
    }
})
</script>


<style>

</style>