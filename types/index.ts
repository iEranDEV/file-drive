export {};

declare global {
    type User = {
        uid: string,
        displayName: string,
        email: string,
        provider: string,
        photoURL: string,
        colorTheme: string,
        favorites: Array<string>
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
    }

}