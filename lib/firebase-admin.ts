import { initializeApp as initializeAdminApp, getApps as getAdminApps, cert } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

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
