"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/api';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert('내용을 채워주세요');
    
    const res = await createPost(title, content);
    if (res) {
      alert('저장 완료!');
      router.push('/');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <h1>글 쓰기</h1>
      <input 
        type="text" placeholder="제목" 
        value={title} onChange={(e)=>setTitle(e.target.value)}
        style={{ padding: '10px', fontSize: '1.2rem', border: '1px solid #ddd' }}
      />
      <textarea 
        placeholder="마크다운 내용 입력 (# 안녕)" 
        value={content} onChange={(e)=>setContent(e.target.value)}
        rows={15}
        style={{ padding: '10px', fontFamily: 'GMarketSans', border: '1px solid #ddd' }}
      />
      <button onClick={handleSubmit} style={{ padding: '15px', background: 'black', color: 'white', cursor: 'pointer' }}>
        발행하기
      </button>
    </div>
  );
}