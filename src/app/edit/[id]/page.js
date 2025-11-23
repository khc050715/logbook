// src/app/edit/[id]/page.js 파일 내용

import { collection, getDocs } from 'firebase/firestore';
// ⭐️ firebase 경로를 '../../../../lib/firebase'로 수정합니다.
import { db } from '../../../../lib/firebase'; 
import EditPageClient from './EditPageClient'; // ⭐️ 1단계에서 이름 바꾼 파일 import

// ⭐️ generateStaticParams를 여기에 정의합니다. (서버에서 실행되어 빌드 오류 해결)
export async function generateStaticParams() {
  let postIds = [];
  
  try {
    const postsCollection = collection(db, "posts");
    const snapshot = await getDocs(postsCollection);
    
    // Firestore에서 모든 문서 ID를 추출합니다.
    postIds = snapshot.docs.map(doc => ({
      id: doc.id,
    }));
    
  } catch (error) {
    console.error("Error fetching static params:", error);
  }

  // Next.js가 빌드할 페이지 목록을 반환합니다.
  return postIds; 
}

// ⭐️ 기본 컴포넌트는 EditPageClient를 렌더링합니다.
// 이 컴포넌트는 서버에서 실행되므로, generateStaticParams와 충돌하지 않습니다.
export default function EditPageServer() {
  return <EditPageClient />;
}