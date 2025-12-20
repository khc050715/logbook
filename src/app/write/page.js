// src/app/write/page.js
"use client"; 
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/api';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { useAuth } from '@/context/AuthContext'; 
import '../globals.css';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const { isLoggedIn, logout, loading } = useAuth(); // 👈 Auth Hook

  // 🔒 보안 가드: 접근 차단
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace('/'); // 로그인 안 했으면 홈으로 쫓아냄
    }
  }, [isLoggedIn, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert('내용을 채워주세요');
    
    const res = await createPost(title, content);
    if (res) {
      alert('저장 완료!');
      router.push('/');
    }
  };

  // 로딩 중이거나 로그인 안 된 상태면 화면 렌더링 안 함
  if (loading || !isLoggedIn) return null;

    // 에디터 확장이 렌더링마다 재설정되지 않도록 기억(memo)함
  const extensions = useMemo(() => [
    markdown({ base: markdownLanguage, codeLanguages: languages }),
    EditorView.lineWrapping,
  ], [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
      
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>글 쓰기</h1>
        {/* ▼ 로그아웃 버튼 추가 ▼ */}
        <button 
          onClick={logout} 
          style={{ 
            padding:'8px 12px', 
            fontSize:'0.8rem', 
            background:'#eee', 
            border:'1px solid #ddd', 
            borderRadius:'5px', 
            cursor:'pointer'
          }}
        >
          Logout
        </button>
      </div>

      <input 
        type="text" placeholder="제목" 
        value={title} onChange={(e)=>setTitle(e.target.value)}
        style={{ padding: '10px', fontSize: '1.2rem', border: '1px solid #ddd', borderRadius: '5px', lineHeight: '1.2' }}
      />
      
      <div style={{ border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden', fontSize: '1.0rem', fontfamily: 'GMarketSans'}}>
        <CodeMirror
          value={content}
          height="500px"
          extensions={extensions}
          onChange={(value) => setContent(value)}
          theme="light"
        />
      </div>

      <button onClick={handleSubmit} style={{ padding: '15px', background: 'black', color: 'white', border:'none', borderRadius:'5px', cursor: 'pointer' }}>
        발행하기
      </button>
    </div>
  );
}