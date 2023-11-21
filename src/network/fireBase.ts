import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

class FireBase {
    private _app: FirebaseApp;
    initialize(): void {
        this._app = initializeApp(this.getConfig());
    }

    async logIn(email: string, password: string): Promise<any> {
        const auth = getAuth(this._app);
        return (<UserCredential | undefined>(
            await signInWithEmailAndPassword(auth, email, password).catch(error => console.error(error))
        ))?.user.getIdToken();
    }

    get app(): FirebaseApp {
        return this._app;
    }

    private getConfig() {
        return {
            apiKey: 'AIzaSyDAJ-2MTGkpqj09qtpdEgQwBXSn4I64k48',
            authDomain: 'secret-friend-5c88b.firebaseapp.com',
            projectId: 'secret-friend-5c88b',
            storageBucket: 'secret-friend-5c88b.appspot.com',
            messagingSenderId: '544150717608',
            appId: '1:544150717608:web:48314d368f0fa5bc206e9d',
            measurementId: 'G-PCQ052C8X4'
        };
    }
}

const fireBase = new FireBase();

export { fireBase };
