# Firestore 컬렉션 구조

- `sessions/{code}` — 문서ID = 4자리 활동 코드. { teacherName: string|null, createdAt: Timestamp }
- `observations/{autoId}` — { code, nickname, photoUrl, speciesName, confidence, description, createdAt }
- `quizResults/{autoId}` — { code, nickname, observationId, isCorrect, answeredAt }

## Firestore 보안 규칙 (참고 — Firebase 콘솔 Firestore > 규칙 탭에서 붙여넣기)

로그인이 없는 앱이라 서버(Admin SDK)만 쓰기/읽기를 하고, 브라우저는 Firestore를 전혀 직접 호출하지 않는다
(Storage 업로드만 브라우저에서 함). 따라서 Firestore 규칙은 모든 클라이언트 접근을 막아도 앱이 정상 동작한다:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Storage 보안 규칙

브라우저가 사진을 직접 업로드하므로 쓰기는 허용하되, 파일 크기를 제한한다(예: 10MB):

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /observation-photos/{allPaths=**} {
      allow read: if true;
      allow write: if request.resource.size < 10 * 1024 * 1024;
    }
  }
}
```
