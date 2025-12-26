// src/services/postService.js
import { db } from '@/lib/firebase'; 
import { 
    collection, addDoc, getDocs, getDoc, doc, 
    query, orderBy, updateDoc, deleteDoc   
} from 'firebase/firestore'; 

const COLLECTION_NAME = 'posts';

// 데이터 변환 헬퍼 (내부 전용)
const convertDoc = (docSnap) => {
  const data = docSnap.data();
  // Timestamp 처리 안전장치
  const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt;
  const updatedAt = data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt;

  return {
    id: docSnap.id,
    ...data,
    createdAt,
    updatedAt
  };
};

export const PostService = {
  // 1. 글 생성
  async create(title, content) {
    try {
      await addDoc(collection(db, COLLECTION_NAME), {
        title,
        content,
        createdAt: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      console.error("Error creating post:", error);
      return false;
    }
  },

  // 2. 전체 목록 조회
  async getAll() {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(convertDoc);
  },

  // 3. 단일 글 조회
  async getById(id) {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? convertDoc(docSnap) : null;
  },

  // 4. 글 수정
  async update(id, title, content) {
    try {
      const postRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(postRef, {
        title,
        content,
        updatedAt: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      console.error("Error updating post:", error);
      return false;
    }
  },

  // 5. 글 삭제
  async delete(id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      return false;
    }
  }
};