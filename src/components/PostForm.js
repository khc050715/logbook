"use client";
import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import MarkdownRenderer from './MarkdownRenderer';

export default function PostForm({ initialTitle = '', initialContent = '', onSubmit, buttonText }) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);

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
    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 상단 바: 제목 입력 및 미리보기 토글 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
        <input 
          type="text" 
          value={title} 
          onChange={ (e) => {setTitle(e.target.value);}}
          onKeyDown={handleKeyDown} // 로직 연결
          placeholder="제목을 입력하세요..."
          style={{ flex: 1, padding: '12px', fontSize: '1.5rem', fontWeight: 'bold', border: 'none', borderBottom: '2px solid #eee', outline: 'none' }}
        />
        <button 
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          style={{ padding: '8px 15px', borderRadius: '20px', border: '1px solid #000', background: isPreview ? '#000' : '#fff', color: isPreview ? '#fff' : '#000', cursor: 'pointer', transition: '0.2s' }}
        >
          {isPreview ? '편집하기' : '미리보기'}
        </button>
      </div>

      {/* 메인 영역: 에디터와 미리보기 화면 전환 */}
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', minHeight: '500px' }}>
        {isPreview ? (
          <div style={{ padding: '30px', background: '#fff', minHeight: '500px' }}>
            <h1 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '10px' }}>{title}</h1>
            <MarkdownRenderer content={content} />
          </div>
        ) : (
          <CodeMirror
            value={content}
            height="500px"
            extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
            onChange={(val) => setContent(val)}
            theme="light"
            style={{ fontSize: '16px' }}
          />
        )}
      </div>

      {/* 하단 저장 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          type="submit" 
          style={{ padding: '12px 40px', background: 'black', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}

