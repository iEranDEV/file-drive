import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { doc, getDoc, getFirestore} from 'firebase/firestore';
import { store } from "~~/plugins/vuex";

export const useFirebase = () => {
    const runtimeConfig = useRuntimeConfig();
    const firebaseConfig = {
        apiKey: runtimeConfig.public.firebase.apiKey,
        authDomain: runtimeConfig.public.firebase.authDomain,
        projectId: runtimeConfig.public.firebase.projectId,
        storageBucket: runtimeConfig.public.firebase.storageBucket,
        messagingSenderId: runtimeConfig.public.firebase.messagingSenderId,
        appId: runtimeConfig.public.firebase.appId,
        measurementId: runtimeConfig.public.firebase.measurementId
    };

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    setPersistence(auth, browserLocalPersistence);
    auth.onAuthStateChanged(async (user) => {
        store.commit('setLoaded', false);
        if(user) {
            if(store.state.user?.uid !== user.uid) {
                console.log('read')
                const userSnap = await getDoc(doc(firestore, "users", user.uid));
                if(userSnap.exists()) {
                    store.commit('setUser', userSnap.data() as User);
                }
            }
            store.commit('setLoaded', true);
        } else {
            store.commit('setUser', {});
        }
    })

    return {
        app,
        auth,
        storage,
        firestore
    }
}
