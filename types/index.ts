export {};

declare global {
    type User = {
        uid: string,
        displayName: string,
        email: string,
        provider: string,
        photoURL: string,
    }

}