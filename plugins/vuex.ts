import { createStore } from "vuex";

export const store = createStore({
    state() {
        return {
            user: {} as User,
            loaded: false,
        }
    },

    mutations: {
        setUser(state, user) {
            state.user = user as User;
        },
        setLoaded(state, value) {
            state.loaded = value;
        }
    },
})

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
})
