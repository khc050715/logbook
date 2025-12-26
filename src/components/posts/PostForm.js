// src/components/posts/PostForm.js
"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// SSR 방지: 에디터는 클라이언트에서만 로드
const Editor = dynamic(() => import('@/components/editor/Editor'), { 
  ssr: false,
  loading: () => <div style={{ height: '500px', border: '1px solid #ddd', padding: '20px' }}>에디터를 불러오는 중...</div>
});

export default function PostForm({ initialTitle = '', initialContent = '', onSubmit, buttonText }) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    if (!title.trim() || !content.trim()) return alert('제목과 내용을 모두 입력해주세요.');
    onSubmit(title, content);
  };

  return (
    <form 
      onSubmit={handleFormSubmit} 
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        style={{ 
          padding: '15px', 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          border: '1px solid #ddd', 
          borderRadius: '8px' 
        }}
      />
      
      {/* 새로운 MDX 에디터 */}
      <Editor 
        markdown={content} 
        onChange={(newMarkdown) => setContent(newMarkdown)} 
      />

      <button 
        type="submit" 
        style={{ 
          padding: '15px', 
          background: '#333', 
          color: 'white', 
          border:'none', 
          borderRadius:'8px', 
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >
        {buttonText}
      </button>
    </form>
  );
}