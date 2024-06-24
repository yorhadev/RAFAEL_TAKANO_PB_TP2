import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";

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
    this.db = getFirestore(this.app);
  }

  currentUser() {
    return this.auth.currentUser;
  }

  makeId(dataId) {
    if (!this.currentUser()) return;
    const userId = this.currentUser().uid;
    const uniqueId = `${userId}_${String(dataId).toUpperCase()}`;
    return uniqueId;
  }

  async createUser(email, password) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      if (this.currentUser()) {
        const ref = doc(this.db, "Users", this.currentUser().uid);
        await setDoc(ref, { email });
      }
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

  async createDoc(path, data) {
    try {
      if (this.currentUser()) {
        const uniqueId = this.makeId(data.id);
        const ref = doc(this.db, path, uniqueId);
        await setDoc(ref, data);
      }
      return { user: this.currentUser(), data, error: null };
    } catch (error) {
      console.error(error);
      return { user: null, data: null, error: error.message };
    }
  }

  async getDocs(path, collectionId) {
    try {
      let data = [];
      if (this.currentUser()) {
        const q = query(
          collection(this.db, path),
          where("collectionId", "==", collectionId || this.currentUser().uid)
        );
        const snap = await getDocs(q);
        snap.forEach((doc) => data.push(doc.data()));
      }
      return { user: this.currentUser(), data, error: null };
    } catch (error) {
      console.error(error);
      return { user: null, data: [], error: error.message };
    }
  }
}

const firebaseService = new FirebaseService();
export default firebaseService;
