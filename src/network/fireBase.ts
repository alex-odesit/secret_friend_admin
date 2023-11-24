import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, Database, get, child } from 'firebase/database';
import { Utils } from '@/utils/utils';

class FireBase {
    private _app: FirebaseApp;
    private _playerId: string | null = null;
    private _database: Database;
    initialize(): void {
        this._app = initializeApp(this.getConfig());
    }

    async logIn(email: string, password: string): Promise<string | undefined> {
        const auth = getAuth(this._app);
        const user = await signInWithEmailAndPassword(auth, email, password).catch(error => console.error(error));
        if (!user) throw 'User not found';
        this._playerId = user.user.uid;
        this._database = getDatabase(this._app);
        return user.user.getIdToken();
    }
    async post(data: any, path: string = ''): Promise<any> {
        try {
            await set(
                ref(this._database, `users/${this._playerId}/${path}`),
                Utils.encryptSubstitution(JSON.stringify(data))
            );
        } catch (err) {
            console.error(err);
            throw 'Data not sending';
        }
    }

    async get(key: string): Promise<any> {
        try {
            const parent = ref(this._database);
            return JSON.parse(
                Utils.decryptSubstitution((await get(child(parent, `users/${this._playerId}/${key}`))).val())
            );
        } catch (err) {
            console.error('Data not defined');
            console.error(err);
        }
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
