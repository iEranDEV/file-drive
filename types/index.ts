export {};

declare global {
    type User = {
        uid: string,
        displayName: string,
        email: string,
        provider: string,
        photoURL: string,
        colorTheme: string
    }

    type FileItem = {
        id: string,
        owner: string,
        type: 'FILE' | 'FOLDER',
        dbURL: string | null,
        name: string,
        format: string | null,
        modified: Date,
        folder: string | null,
        favorite: boolean,
    }

    type INotification = {
        id: string,
        message: string,
        type: 'SUCCESS' | 'INFO' | 'ERROR',
    }

}