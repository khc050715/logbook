import { db } from './firebase';
import { collection, addDoc, getDocs, getDoc, doc, query, orderBy } from 'firebase/firestore';

const COLLECTION_NAME = 'posts';

// 글 저장
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

// 글 목록 불러오기
export const getAllPosts = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// 글 1개 상세 불러오기
export const getPostById = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

// 글 삭제
// import { doc, deleteDoc } from 'firebase/firestore'; // deleteDoc import 추가

// ... 기존 createPost, getAllPosts, getPostById 함수 ...

// 글 삭제
export const deletePost = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
};