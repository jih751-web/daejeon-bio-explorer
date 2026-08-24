import { initializeApp as initializeAdminApp, getApps as getAdminApps, cert } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { initializeApp, getApps, FirebaseOptions } from 'firebase/app'
import { getStorage, FirebaseStorage } from 'firebase/storage'

let adminDb: Firestore | null = null

// 서버(Route Handler)에서만 호출할 것 — 서비스 계정 키 사용
export function getFirestoreAdmin(): Firestore {
  if (!adminDb) {
    if (getAdminApps().length === 0) {
      initializeAdminApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID!,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
          // .env에 저장된 개행문자(\n)가 리터럴 문자열로 들어오므로 실제 개행으로 변환
          privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
        }),
      })
    }
    adminDb = getFirestore()
  }
  return adminDb
}

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
