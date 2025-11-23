// /src/app/edit/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { db } from '@/firebase'; // Firebase 설정 경로가 올바른지 확인
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function EditPage() {
  const router = useRouter();
  const pathname = usePathname();
  // URL에서 ID 추출: /edit/postID 형태에서 postID를 가져옴
  const id = pathname.split('/').pop(); 
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // ⭐️ [ID]에 해당하는 기존 포스트 데이터 불러오기
  useEffect(() => {
    if (!id) return;
    
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

  // ⭐️ 수정 데이터 저장 로직
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const postRef = doc(db, "posts", id);
      
      // Firestore updateDoc 사용: 기존 문서를 덮어쓰지 않고 필드만 업데이트
      await updateDoc(postRef, {
        title: title,
        content: content,
        updatedAt: new Date().toISOString(), // 수정 시간 기록
      });
      
      alert('글이 성공적으로 수정되었습니다.');
      router.push(`/detail/${id}`); // 수정 후 상세 페이지로 이동
    } catch (error) {
      console.error("문서 수정 중 오류 발생:", error);
      alert('수정 중 오류가 발생했습니다.');
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
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}

// 상세 페이지 컴포넌트 내의 JSX 부분 수정

// ... 포스트 데이터 로드가 완료된 후 ...

// 포스트 ID를 저장하는 변수가 postData.id 라고 가정합니다.

return (
  <div>
    <h1>{postData.title}</h1>
    <p>{postData.content}</p>
    
    {/* ⭐️ 수정 버튼 추가: 클릭 시 /edit/[postID] 경로로 이동 */}
    <button 
      onClick={() => router.push(`/edit/${postData.id}`)}
      style={{ marginRight: '10px' }}
    >
      수정하기
    </button>
    
    {/* 기존 삭제 버튼이 있다면 옆에 추가됩니다. */}
    {/* <button onClick={handleDelete}>삭제하기</button> */}
  </div>
);