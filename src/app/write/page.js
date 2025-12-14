// src/app/write/page.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/api';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
      <h1>글 쓰기</h1>
      <input 
        type="text" placeholder="제목" 
        value={title} onChange={(e)=>setTitle(e.target.value)}
        style={{ padding: '10px', fontSize: '1.2rem', border: '1px solid #ddd', borderRadius: '5px' }}
      />
      
      <div style={{ border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
        <CodeMirror
          value={content}
          height="500px"
          extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
          onChange={(value) => setContent(value)} // ⭐️ 여기가 중요합니다 (value를 바로 받음)
          theme="light"
        />
      </div>

      <button onClick={handleSubmit} style={{ padding: '15px', background: 'black', color: 'white', border:'none', borderRadius:'5px', cursor: 'pointer' }}>
        발행하기
      </button>
    </div>
  );
}