"use client"; // 최상단에 유지

export const dynamic = 'force-dynamic';

// Firebase/React Hooks import 유지
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
// ⭐️ api.js에서 글 상세 정보 및 삭제 함수를 가져옵니다.
import { getPostById, updatePost, deletePost } from '../../../lib/api';

export default function EditPage() {
  const router = useRouter();
  const pathname = usePathname();
  // URL에서 ID 추출: /edit/postID 형태에서 postID를 가져옴
  const id = pathname.split('/').pop(); 
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // ⭐️ [ID]에 해당하는 기존 포스트 데이터 불러오기 (API 함수 사용)
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

  // ⭐️ 수정 데이터 저장 로직 (API 함수 사용)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      // api.js의 updatePost 함수 사용을 가정
      const success = await updatePost(id, title, content);
      
      if (success) {
        alert('글이 성공적으로 수정되었습니다.');
        router.push(`/detail/${id}`); 
      } else {
        alert('수정 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error("문서 수정 중 오류 발생:", error);
      alert('수정 중 오류가 발생했습니다.');
    }
  };
  
  // ⭐️ 삭제 기능 로직 (API 함수 사용)
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
          <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red' }}>
            삭제하기
          </button>
        </div>
      </form>
    </div>
  );
}