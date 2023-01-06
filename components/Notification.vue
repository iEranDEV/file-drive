<template>
    <div class="w-96 px-2 py-3 text-sm flex items-center gap-4 font-semibold rounded-xl" :class="notification.type === 'SUCCESS' ? 'bg-green-300 text-green-500' : (notification.type === 'ERROR') ? 'bg-red-300 text-red-500' : 'bg-amber-600 text-stone-100'">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <p>
            {{notification.message}}
        </p>
    </div>
</template>

<script lang="ts">
import { PropType } from 'nuxt/dist/app/compat/capi'
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
    props: {
        notification: Object as PropType<INotification>,
    }
})
</script>

<style>

</style>