// src/app/write/page.js
"use client"; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/api';
import { useAuth } from '@/context/AuthContext'; 
import Editor from '@/components/Editor'; // 분리한 컴포넌트 사용
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
    try {
      await createPost(title, content); // res 확인 불필요
      alert('저장 완료!');
      router.push('/');
    } catch (error) {
      alert('저장에 실패했습니다. 잠시 후 다시 시도해주세요.'); // 사용자 친화적 에러 메시지
    }
  };

  // 로딩 중이거나 로그인 안 된 상태면 화면 렌더링 안 함
  if (loading || !isLoggedIn) return null;

  return (
    <div className="write-container">
      
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
        <Editor 
          initialValue={content} 
          onChange={(val) => setContent(val)} 
        />
      </div>

      <button onClick={handleSubmit} style={{ padding: '15px', background: 'black', color: 'white', border:'none', borderRadius:'5px', cursor: 'pointer' }}>
        발행하기
      </button>
    </div>
  );
}