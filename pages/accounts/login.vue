<template>
    <div class="w-screen h-screen flex flex-col justify-center items-center gap-4">
        <img src="~/assets/logo.png" alt="File drive logo" class="w-44">

        <!-- Social buttons -->
        <div class="flex w-60 justify-around items-center">

            <!-- Facebook -->
            <button class="border-2 border-stone-700 text-stone-700 p-2 w-14 h-14 rounded-xl hover:border-purple-400 hover:text-purple-400 hover:translate-y-2 transition-all">
                <i class="fa-brands fa-facebook-f fa-xl"></i>
            </button>

            <!-- Google -->
            <button @click="googleSignIn()" class="border-2 border-stone-700 text-stone-700 p-2 w-14 h-14 rounded-xl hover:border-purple-400 hover:text-purple-400 hover:translate-y-2 transition-all">
                <i class="fa-brands fa-google fa-xl"></i>
            </button>

            <!-- Apple -->
            <button class="border-2 border-stone-700 text-stone-700 p-2 w-14 h-14 rounded-xl hover:border-purple-400 hover:text-purple-400 hover:translate-y-2 transition-all">
                <i class="fa-brands fa-apple fa-xl"></i>
            </button>

        </div>
    </div>
</template>

<script lang="ts">
import { getRedirectResult, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { signInWithRedirect } from 'firebase/auth';
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        definePageMeta({
            layout: 'blank'
        })
        const firebase = useFirebase();

        return {
            firebase,
        }
    },
    async mounted() {
        getRedirectResult(this.firebase.auth).then(async (result) => {
            if(result) {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const userSnap = await getDoc(doc(this.firebase.firestore, "users", result.user.uid));
                if(userSnap.exists()) {
                    this.$store.commit('setUser', userSnap.data() as User);
                } else {
                    const user: User = {
                        uid: result.user.uid,
                        displayName: result.user.displayName as string,
                        email: result.user.email as string,
                        provider: 'google',
                        photoURL: result.user.photoURL as string,
                        favorites: Array<string>(),
                        colorTheme: 'purple',
                    }
                    await setDoc(doc(this.firebase.firestore, "users", result.user.uid), user);
                    this.$store.commit('setUser', user);
                }
                navigateTo('/');
            }
        }).catch((error) => {
            console.log(error);
        })
    },
    methods: {
        async googleSignIn() {
            const provider = new GoogleAuthProvider();
            signInWithRedirect(this.firebase.auth, provider);
            console.log('sign')
        }
    }
})
</script>


<style>

</style>