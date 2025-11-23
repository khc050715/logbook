"use client";

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
// ⭐️ api.js에서 deletePost 함수를 가져옵니다.
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { deletePost } from '../../../lib/api'; 
// 참고: 위에서 'deletePost'를 가져왔으므로, 'doc'과 'deleteDoc'은 api.js에서 처리하는 것이 좋습니다.
// 하지만 현재 코드 구조를 유지하기 위해, 아래에서는 deletePost를 사용하겠습니다.

// 빌드 시점에 실행되어 Next.js에게 정적 페이지 목록을 알려줍니다. (기존 코드 그대로 유지)
export async function generateStaticParams() {
  let postIds = [];
  
  try {
    const postsCollection = collection(db, "posts");
    const snapshot = await getDocs(postsCollection);
    
    postIds = snapshot.docs.map(doc => ({
      id: doc.id,
    }));
    
  } catch (error) {
    console.error("Error fetching static params:", error);
  }

  return postIds; 
}

export default function EditPage() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split('/').pop(); 
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // [ID]에 해당하는 기존 포스트 데이터 불러오기 (기존 코드 그대로 유지)
  useEffect(() => {
    if (!id) return;
    // ... (기존 fetchPost 함수 로직) ...
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setContent(data.content);
        } else {
          alert("포스트를 찾을 수 없습니다.");
          router.push('/');
        }
      } catch (error) {
        console.error("데이터 로드 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, router]);

  // 수정 데이터 저장 로직 (기존 코드 그대로 유지)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... (기존 handleSubmit 로직) ...
    if (!title.trim() || !content.trim()) return;

    try {
      const postRef = doc(db, "posts", id);
      
      await updateDoc(postRef, {
        title: title,
        content: content,
        updatedAt: new Date().toISOString(),
      });
      
      alert('글이 성공적으로 수정되었습니다.');
      // 상세 페이지로 이동하는 경로를 프로젝트에 맞게 확인하세요.
      // '/detail/${id}' 경로가 없다면, 홈으로 이동하는 것이 안전합니다.
      router.push(`/`); 
    } catch (error) {
      console.error("문서 수정 중 오류 발생:", error);
      alert('수정 중 오류가 발생했습니다.');
    }
  };
  
  // ⭐️ 삭제 기능 추가 로직
  const handleDelete = async () => {
    if (confirm('정말로 이 글을 삭제하시겠습니까?')) {
      try {
        // api.js의 deletePost 함수 사용
        const success = await deletePost(id); 
        
        if (success) {
          alert('글이 성공적으로 삭제되었습니다.');
          router.push('/'); // 삭제 후 홈 페이지로 이동
        } else {
          alert('삭제 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error("문서 삭제 중 오류 발생:", error);
        alert('삭제 중 치명적인 오류가 발생했습니다.');
      }
    }
  };


  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="container">
      <h2>글 수정하기</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="제목" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea 
          placeholder="내용" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit">수정 완료</button>
          {/* ⭐️ 삭제 버튼 추가 */}
          <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red' }}>
            삭제하기
          </button>
        </div>
      </form>
    </div>
  );
}