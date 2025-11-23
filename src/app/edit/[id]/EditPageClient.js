// src/app/edit/[id]/EditPageClient.js 파일 내용

"use client"; // 필수: React Hooks 사용

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
// ⭐️ api.js의 경로를 '../../../lib/api'로 수정합니다.
import { getPostById, updatePost, deletePost } from '../../../lib/api'; 


export default function EditPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  // URL에서 ID 추출
  const id = pathname.split('/').pop(); 
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // [ID]에 해당하는 기존 포스트 데이터 불러오기
  useEffect(() => {
    if (!id) return;
    
    const fetchPost = async () => {
      try {
        // api.js의 getPostById 함수 사용
        const data = await getPostById(id);

        if (data) {
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

  // ⭐️ 수정 데이터 저장 로직 (updatePost 사용)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const success = await updatePost(id, title, content);
      
      if (success) {
        alert('글이 성공적으로 수정되었습니다.');
        // 수정 후 상세 페이지 또는 홈으로 이동
        router.push(`/`); 
      } else {
        alert('수정 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error("문서 수정 중 오류 발생:", error);
      alert('수정 중 오류가 발생했습니다.');
    }
  };
  
  // ⭐️ 삭제 기능 로직 (deletePost 사용)
  const handleDelete = async () => {
    if (confirm('정말로 이 글을 삭제하시겠습니까?')) {
      try {
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
          {/* 삭제 버튼 추가 */}
          <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red' }}>
            삭제하기
          </button>
        </div>
      </form>
    </div>
  );
}