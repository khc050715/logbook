"use client";
import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

export default function PostForm({ initialTitle = '', initialContent = '', onSubmit, buttonText }) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  // 초기값이 비동기로 들어올 경우를 대비해 state 업데이트
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return alert('내용을 채워주세요');
    onSubmit(title, content);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        style={{ padding: '10px', fontSize: '1.2rem', border: '1px solid #ddd', borderRadius: '5px' }}
      />
      
      <div style={{ border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
        <CodeMirror
          value={content}
          height="500px"
          extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
          onChange={(val) => setContent(val)}
          theme="light"
        />
      </div>

      <button 
        onClick={handleSubmit} 
        style={{ padding: '15px', background: 'black', color: 'white', border:'none', borderRadius:'5px', cursor: 'pointer' }}
      >
        {buttonText}
      </button>
    </div>
  );
}