export {};

declare global {
    type User = {
        uid: string,
        displayName: string,
        email: string,
        provider: string,
        photoURL: string,
    }

    type FileItem = {
        owner: string,
        type: 'FILE' | 'FOLDER',
        dbURL: string,
        name: string,
        format: string,
        modified: Date,
    }

}