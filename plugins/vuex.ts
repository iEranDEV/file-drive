import { createStore } from "vuex";

export const store = createStore({
    state() {
        return {
            user: {} as User,
            loaded: false,
            viewType: 'list',
        }
    },

    mutations: {
        setUser(state, user) {
            state.user = user as User;
        },
        setLoaded(state, value) {
            state.loaded = value;
        },
        setViewType(state, value) {
            state.viewType = value;
        },
        setColorTheme(state, value) {
            state.user.colorTheme = value;
        }
    },
})

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
})
