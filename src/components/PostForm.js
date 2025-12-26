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
    // e가 존재할 경우에만 preventDefault 실행
    if (e && e.preventDefault) e.preventDefault();
    
    if (!title || !content) return alert('내용을 채워주세요');
    onSubmit(title, content);
  };

  // [여기가 핵심입니다] 한글 중복 입력 방지 핸들러
  const handleKeyDown = (e) => {
    // 1. 브라우저가 한글을 조합 중(isComposing: true)이라면 이벤트를 무시 (return)
    if (e.nativeEvent.isComposing) return;

    // 2. 조합이 끝난 상태에서 엔터(Enter) 키가 눌렸을 때만 실행
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 동작 방지
      // 엔터로 바로 제출하고 싶다면 아래 주석을 해제하세요.
      // handleSubmit(); 
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown} // 👈 이 부분이 반드시 연결되어야 합니다!
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