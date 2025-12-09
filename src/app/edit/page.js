// src/app/edit/page.js
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPostById, updatePost, deletePost } from '@/lib/api';

function EditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // ⭐️ URL에서 ?id=... 값을 가져옵니다.

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // 데이터 불러오기
  useEffect(() => {
    if (!id) return;
    getPostById(id).then((data) => {
      if (data) {
        setTitle(data.title);
        setContent(data.content);
      }
      setLoading(false);
    });
  }, [id]);

  // 수정 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await updatePost(id, title, content)) {
      alert('수정 완료!');
      router.push(`/post?id=${id}`); // 수정 후 상세 페이지로 이동
    } else {
      alert('수정 실패');
    }
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      if (await deletePost(id)) {
        alert('삭제되었습니다.');
        router.push('/');
      } else {
        alert('삭제 실패');
      }
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (!id) return <p>잘못된 접근입니다.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>글 수정하기</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ padding: '10px', fontSize: '1.2rem' }}
        />
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          rows={15}
          style={{ padding: '10px' }}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ padding: '10px 20px', background: 'black', color: 'white', border: 'none', cursor: 'pointer' }}>
            수정 완료
          </button>
          <button type="button" onClick={handleDelete} style={{ padding: '10px 20px', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
            삭제하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default function EditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditForm />
    </Suspense>
  );
}