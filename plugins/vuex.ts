import { createStore } from "vuex";

export const store = createStore({
    state() {
        return {
            files: Array<FileItem>(),
            user: {} as User,
            loaded: false,
            viewType: 'list',
            contextMenu: null,
            notifications: Array<INotification>(),
            selectedFile: null,
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
        },
        setContextMenu(state, value) {
            state.contextMenu = value;
        },
        addNotification(state, value: INotification) {
            state.notifications.push(value);
            setTimeout(() => {
                state.notifications.splice(state.notifications.findIndex(item => item.id === value.id))
            }, 3000);
        },
        setFiles(state, value: Array<FileItem>) {
            state.files = value;
        },
        addFile(state, value: FileItem) {
            state.files.push(value);
        },
        deleteFile(state, value: FileItem) {
            state.files.splice(state.files.findIndex(item => item.id === value.id), 1);
        },
        setFile(state, value: FileItem) {
            state.files[state.files.findIndex(item => item.id === value.id)] = value;
        },
        setSelectedFile(state, value: FileItem) {
            state.selectedFile = value as any;
        }
    },
})

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
})
