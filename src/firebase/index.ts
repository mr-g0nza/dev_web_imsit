import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

function initializeFirebase(): { app: FirebaseApp; auth: Auth; firestore: Firestore } {
  const apps = getApps();
  if (apps.length) {
    app = apps[0];
  } else {
    app = initializeApp(firebaseConfig);
  }
  auth = getAuth(app);
  firestore = getFirestore(app);

  return { app, auth, firestore };
}

// Export the functions and types you need from other modules
export { initializeFirebase };
export { FirebaseProvider, useFirebase, useFirebaseApp, useAuth, useFirestore } from './provider';
export { FirebaseClientProvider } from './client-provider';
export { useUser } from './auth/use-user';
