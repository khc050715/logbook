import { db } from '@/lib/db'; 
import { 
    collection, addDoc, getDocs, getDoc, doc, 
    query, orderBy, updateDoc, deleteDoc, serverTimestamp 
} from 'firebase/firestore'; 

const COLLECTION_NAME = 'posts';

// 헬퍼 함수: Firestore 타임스탬프를 ISO 문자열로 변환
const convertDoc = (docSnap) => {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    ...data,
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
    updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : null,
  };
};

// 1. 글 저장
export const createPost = async (title, content) => {
  try {
    await addDoc(collection(db, COLLECTION_NAME), {
      title,
      content,
      createdAt: serverTimestamp(), // 서버 시간 사용
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

// 4. 글 수정
export const updatePost = async (id, title, content) => {
    try {
        const postRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(postRef, {
            title: title,
            content: content,
            updatedAt: serverTimestamp(), // 수정 시간도 서버 시간으로
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