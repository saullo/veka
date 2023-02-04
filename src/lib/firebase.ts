import admin from "firebase-admin";

try {
  const credential = admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  });
  admin.initializeApp({ credential });
} catch (error: any) {
  // Skip hot reload errors
  if (error.errorInfo.code !== "app/duplicate-app") {
    console.log(error);
  }
}

export default admin;
