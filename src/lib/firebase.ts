import { App, initializeApp, cert, getApp, getApps } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";
import { Firestore, getFirestore } from "firebase-admin/firestore";

let app: App;
let auth: Auth;
let firestore: Firestore;

try {
  const credential = cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  });

  if (getApps().length > 0) {
    app = getApp();
  } else {
    app = initializeApp({ credential });
  }

  auth = getAuth(app);
  firestore = getFirestore(app);
} catch (error: any) {
  // Skip hot reload errors
  if (error.errorInfo.code !== "app/duplicate-app") {
    console.log(error);
  }
}

export { app, auth, firestore };
