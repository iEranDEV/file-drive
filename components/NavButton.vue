<template>
    <NuxtLink :to="route" class="w-full">
        <div class="flex justify-start md:justify-center lg:justify-start items-center w-full gap-4 px-2 py-2 hover:bg-stone-200 hover:text-stone-700 rounded-lg" :class="$route.path == route ? 'text-purple-400 bg-purple-100 font-semibold' : 'text-stone-100 md:text-stone-700'">
            <div class=" fill-none">
                <slot name="icon" />
            </div>
            <p class="text-lg md:text-base md:hidden lg:block">
                <slot name="text" />
            </p>
        </div>
    </NuxtLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
    props: {
        route: {
            type: String,
            required: true,
        }
    }
})
</script>


<style>

</style>