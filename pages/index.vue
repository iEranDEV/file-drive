<template>
    <div class="w-full h-full">
        <p>{{ $store.state.user }}</p>
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