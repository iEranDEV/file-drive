<template>
    <div v-if="files.length >= 1" class="w-full h-full flex flex-col gap-2 text-stone-700">
        <div class="flex flex-col gap-4">
            <img :src="$store.state.user.photoURL" alt="Avatar" class="h-20 w-20 rounded-full">
            <p class="font-semibold">{{ $store.state.user.displayName }}</p>
        </div>
        <p class="text-stone-400">Joined {{ $store.state.user.createdAt instanceof Date ? $store.state.user.createdAt.toLocaleDateString() : $store.state.user.createdAt.toDate().toLocaleDateString() }}</p>
        <hr class="border-stone-400/20">
        <div class="w-full flex flex-col gap-4">
            <p class="font-semibold flex gap-4">Total space:
                <span class="text-purple-400 font-extrabold font-montserrat">{{calcBytes(fullSize)}}</span>
            </p>
            <div class="w-full rounded-xl flex overflow-hidden">
                <div class="h-10 bg-emerald-400 " :style="'width: ' + data.images.percent + '%'"></div>
                <div class="h-10 bg-blue-400" :style="'width: ' + data.docs.percent + '%'"></div>
                <div class="h-10 bg-rose-500" :style="'width: ' + data.videos.percent + '%'"></div>
                <div class="h-10 bg-purple-400" :style="'width: ' + data.other.percent + '%'"></div>
            </div>
            <div class="flex flex-col w-full md:w-1/2">
                <!-- Images -->
                <div class="flex items-center justify-between">
                    <div class="flex gap-2">
                        <div class="h-5 w-5 rounded-lg bg-emerald-400"></div>
                        <p>Images</p>
                    </div>
                    <span class="text-emerald-400 font-extrabold font-montserrat">{{ calcBytes(data.images.size) }}</span>
                </div>
                <!-- Docs -->
                <div class="flex gap-2 items-center justify-between">
                    <div class="flex gap-2">
                        <div class="h-5 w-5 rounded-lg bg-blue-400"></div>
                        <p>Documents</p>
                    </div>
                    <span class="text-blue-400 font-extrabold font-montserrat">{{ calcBytes(data.docs.size) }}</span>
                </div>
                <!-- Videos -->
                <div class="flex gap-2 items-center justify-between">
                    <div class="flex gap-2">
                        <div class="h-5 w-5 rounded-lg bg-rose-400"></div>
                        <p>Videos</p>
                    </div>
                    <span class="text-rose-400 font-extrabold font-montserrat">{{ calcBytes(data.videos.size) }}</span>
                </div>
                <!-- Other -->
                <div class="flex gap-2 items-center justify-between">
                    <div class="flex gap-2">
                        <div class="h-5 w-5 rounded-lg bg-purple-400"></div>
                        <p>Other</p>
                    </div>
                    <span class="text-purple-400 font-extrabold font-montserrat">{{ calcBytes(data.other.size) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { getMetadata, listAll, ref } from '@firebase/storage';
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const firebase = useFirebase();

        return {
            firebase,
        }
    },
    data() {
        return {
            files: Array<any>(),
            fullSize: 0,
        }
    },
    computed: {
        data() {
            // contentType
            let data = {
                images: {
                    size: 0,
                    percent: 0
                },
                docs: {
                    size: 0,
                    percent: 0
                },
                videos: {
                    size: 0,
                    percent: 0
                },
                other: {
                    size: 0,
                    percent: 0
                }
            };

            this.files.forEach((file) => {
                switch(file.contentType.split('/')[0]) {
                    case 'image':
                        data.images.size += file.size;
                        break;
                    case 'application':
                        data.docs.size += file.size;
                        break;
                    case 'video':
                        data.videos.size += file.size;
                        break;
                    default:
                        data.other.size += file.size;
                        break;
                }
            })

            data.images.percent = data.images.size / this.fullSize * 100;
            data.docs.percent = data.docs.size / this.fullSize * 100;
            data.videos.percent = data.videos.size / this.fullSize * 100;
            data.other.percent = data.other.size / this.fullSize * 100;

            return data;
        }
    },
    async mounted() {

        const listRef = ref(this.firebase.storage, this.$store.state.user.uid);

        listAll(listRef).then((res) => {
            res.items.forEach((element) => {
                getMetadata(ref(this.firebase.storage, element.fullPath)).then((metadata) => {
                    this.fullSize += metadata.size;
                    this.files.push(metadata);
                })
            })
        })
    },
    methods: {
        calcBytes(val: number) {
            let calc = val / 1024;
            if(calc > 1024) {
                calc = calc / 1024;
                if(calc > 1024) {
                    calc = calc / 1024;
                    return calc.toFixed(2) + ' GB';
                } else {
                    return calc.toFixed(2) + ' MB';
                }
            } else {
                return calc.toFixed(2) + ' KB';
            }
        }
    }
})
</script>


<style>

</style>