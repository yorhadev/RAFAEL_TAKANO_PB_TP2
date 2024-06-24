import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

class FirebaseService {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
  }

  currentUser() {
    return this.auth.currentUser;
  }

  async createUser(email, password) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      return { user: this.currentUser(), error: null };
    } catch (error) {
      console.error(error);
      return { user: null, error: error.message };
    }
  }

  async signIn(email, password) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return { user: this.currentUser(), error: null };
    } catch (error) {
      console.error(error);
      return { user: null, error: error.message };
    }
  }

  async signOut() {
    try {
      const user = await this.auth.signOut();
      return { user: null, error: null };
    } catch (error) {
      console.error(error);
      return { user: null, error: error.message };
    }
  }
}

const firebaseService = new FirebaseService();
export default firebaseService;
