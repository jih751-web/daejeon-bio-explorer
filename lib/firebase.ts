import { initializeApp, getApps, FirebaseOptions } from 'firebase/app'
import { getStorage, FirebaseStorage } from 'firebase/storage'

const clientConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
}

// 브라우저(촬영 화면의 Storage 업로드)에서만 호출할 것
export function getFirebaseStorage(): FirebaseStorage {
  const app = getApps().length === 0 ? initializeApp(clientConfig) : getApps()[0]
  return getStorage(app)
}
