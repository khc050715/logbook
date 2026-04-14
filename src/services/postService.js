// src/services/postService.js
import { db } from '@/lib/firebase'; 
import { 
    collection, addDoc, getDocs, getDoc, doc, 
    query, orderBy, updateDoc, deleteDoc, writeBatch 
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
  //글 생성
  async create(title, content) {
    try {
      await addDoc(collection(db, COLLECTION_NAME), {
        title,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPinned: false,     // [추가] 고정 여부 기본값
        pinnedAt: null,
      });
      return true;
    } catch (error) {
      console.error("Error creating post:", error);
      return false;
    }
  },

  //전체 목록 조회
  async getAll() {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy("isPinned", "desc"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(convertDoc);
    } catch (error) {
      console.error("Error fetching posts:", error);
      // 복합 색인이 없는 경우 여기서 에러가 발생합니다.
      return [];
    }
  },
  //단일 글 조회
  async getById(id) {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? convertDoc(docSnap) : null;
  },

  //글 수정
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

  //글 삭제
  async delete(id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      return false;
    }
  },

  //글 상단 고정 기능
  async togglePin(id, currentStatus) {
    try {
      const newStatus = !currentStatus;
      const updateData = {
        isPinned: newStatus,
        pinnedAt: newStatus ? new Date().toISOString() : null,
      };
        
      const postRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(postRef, updateData);
        
      return { id, ...updateData };
    } catch (error) {
      console.error("Error toggling pin:", error);
      throw error;
    }
  }
};