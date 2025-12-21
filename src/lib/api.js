import { db } from '@/lib/db'; 
import { 
    collection, addDoc, getDocs, getDoc, doc, 
    query, orderBy, updateDoc, deleteDoc   
} from 'firebase/firestore'; 

const COLLECTION_NAME = 'posts';

// 헬퍼 함수: 날짜 데이터 안전하게 변환
const convertDoc = (docSnap) => {
  const data = docSnap.data();
  // 기존 데이터(문자열)와 Timestamp 객체 모두 호환되도록 처리
  const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt;
  const updatedAt = data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt;

  return {
    id: docSnap.id,
    ...data,
    createdAt,
    updatedAt
  };
};

// 1. 글 저장 (클라이언트 시간 사용으로 롤백)
export const createPost = async (title, content) => {
  try {
    await addDoc(collection(db, COLLECTION_NAME), {
      title,
      content,
      createdAt: new Date().toISOString(), // 👈 다시 클라이언트 시간으로 변경
    });
    return true;
  } catch (error) {
    console.error("Error creating post:", error);
    return false;
  }
};

// 2. 글 목록 불러오기
export const getAllPosts = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(convertDoc);
};

// 3. 글 상세 불러오기
export const getPostById = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return convertDoc(docSnap);
  }
  return null;
};

// 4. 글 수정 (수정 시간도 클라이언트 시간)
export const updatePost = async (id, title, content) => {
    try {
        const postRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(postRef, {
            title: title,
            content: content,
            updatedAt: new Date().toISOString(), // 👈 클라이언트 시간
        });
        return true;
    } catch (error) {
        console.error("Error updating post:", error);
        return false;
    }
};

// 5. 글 삭제
export const deletePost = async (id) => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
        return true;
    } catch (error) {
        console.error("Error deleting post:", error);
        return false;
    }
};