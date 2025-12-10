// src/lib/api.js

// 👇 여기를 './firebase' 대신 '@/lib/db'로 수정!
import { db } from '@/lib/db'; 

import { 
    collection, 
    addDoc, 
    getDocs, 
    getDoc, 
    doc, 
    query, 
    orderBy,
    updateDoc, 
    deleteDoc   
} from 'firebase/firestore'; // 모든 Firestore 관련 함수를 한 번에 import

const COLLECTION_NAME = 'posts';

// 1. 글 저장
export const createPost = async (title, content) => {
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
};

// 2. 글 목록 불러오기
export const getAllPosts = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// 3. 글 1개 상세 불러오기
export const getPostById = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

// ⭐️ 4. 글 수정
export const updatePost = async (id, title, content) => {
    try {
        const postRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(postRef, {
            title: title,
            content: content,
            updatedAt: new Date().toISOString(), // 수정 시간 기록
        });
        return true;
    } catch (error) {
        console.error("Error updating post:", error);
        return false;
    }
};

// ⭐️ 5. 글 삭제
export const deletePost = async (id) => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
        return true;
    } catch (error) {
        console.error("Error deleting post:", error);
        return false;
    }
};