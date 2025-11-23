import { db } from './firebase';
import { 
    collection, 
    addDoc, 
    getDocs, 
    getDoc, 
    doc, 
    query, 
    orderBy,
    updateDoc, // ⭐️ updateDoc 추가
    deleteDoc  // ⭐️ deleteDoc 추가
} from 'firebase/firestore'; // 모든 Firestore 관련 함수를 여기서 한 번에 import

const COLLECTION_NAME = 'posts';

// 글 저장
export const createPost = async (title, content) => {
// ... (기존 createPost 코드) ...
};

// 글 목록 불러오기
export const getAllPosts = async () => {
// ... (기존 getAllPosts 코드) ...
};

// 글 1개 상세 불러오기
export const getPostById = async (id) => {
// ... (기존 getPostById 코드) ...
};

// ⭐️ 글 수정
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

// ⭐️ 글 삭제
export const deletePost = async (id) => {
    try {
        // doc과 deleteDoc을 이미 상단에서 import 했으므로 바로 사용
        await deleteDoc(doc(db, COLLECTION_NAME, id));
        return true;
    } catch (error) {
        console.error("Error deleting post:", error);
        return false;
    }
};