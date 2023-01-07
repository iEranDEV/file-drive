<template>
    <div class="w-full h-full flex flex-col gap-4">
        <div class="flex items-center gap-8">
            <div class="w-20 h-20 rounded-xl border-2 border-dashed border-stone-400 flex justify-center items-center text-stone-400 hover:text-purple-400 hover:border-purple-400 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                
            </div>
            <p class="font-semibold text-stone-400 text-sm">Click to change your profile picture</p>
        </div>
        <div class="flex flex-col gap-1">
            <label for="displayName" class="font-semibold text-stone-400 text-xs uppercase">Display name</label>
            <input type="text" name="displayName" class="rounded-xl p-2 bg-stone-300 placeholder-stone-500" placeholder="Enter display name">
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>