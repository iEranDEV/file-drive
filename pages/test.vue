<template>
    <div class="w-full h-full flex flex-col">

        <!-- Heading -->
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-extrabold font-montserrat text-stone-700 uppercase">TEST</h1>
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

        return {
            store,
            firebase
        }
    },
})
</script>


<style>

</style>