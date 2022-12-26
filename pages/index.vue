<template>
    <div class="w-screen h-screen bg-stone-200">
        test
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const firebase = useFirebase();
        const store = useStore();

        return {
            firebase,
            store,
        }
    },
})
</script>


<style>

</style>