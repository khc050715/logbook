// src/app/edit/page.js
"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPostById, updatePost } from '@/lib/api';
import { useAuth } from '@/context/AuthContext'; 
import Editor from '@/components/Editor';
import '../globals.css';

function EditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // 2. 인증 상태와 인증 로딩 상태 가져오기
  const { isLoggedIn, loading: authLoading } = useAuth(); 

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true); // 글 데이터 로딩 상태

  
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      alert('접근 권한이 없습니다.'); // 선택사항: 알림창 띄우기
      router.replace('/'); 
    }
  }, [authLoading, isLoggedIn, router]);

  // 기존 데이터 불러오기 로직
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await updatePost(id, title, content)) {
      alert('수정 완료!');
      router.push(`/post?id=${id}`);
    } else {
      alert('수정 실패');
    }
  };

  // 화면 차단 (Render Blocking)
  // 인증 체크 중이거나(authLoading), 비로그인 상태(!isLoggedIn)면 화면을 아예 그리지 않음
  if (authLoading || !isLoggedIn) return null;

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
          style={{ padding: '10px', fontSize: '1.2rem', border: '1px solid #ddd', borderRadius: '5px' }}
        />
        
        <div style={{ border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
          <Editor 
            key={id}
            initialValue={content}
            onChange={(val) => setContent(val)} 
          />
        </div>
        <button type="submit" style={{ padding: '15px', background: 'black', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          수정 완료
        </button>
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