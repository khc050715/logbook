// src/components/Header.js
"use client"; // 👈 Hook 사용을 위해 필수
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { isLoggedIn, login } = useAuth();

  const handleAuthClick = () => {
    if (!isLoggedIn) {
      const code = prompt("🔒 Access Code:"); // 브라우저 기본 입력창 사용
      if (code) {
        const success = login(code);
        if (!success) alert("코드가 일치하지 않습니다.");
      }
    }
  };

  return (
    <header style={{ padding: '20px 0', marginBottom: '40px', borderBottom: '1px solid #5D736B' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: '700', textDecoration: 'none', color: 'black' }}>
          logbook
        </Link>
        
        {/* ▼ 인증 상태에 따라 버튼 변경 ▼ */}
        {isLoggedIn ? (
          <Link href="/write" style={{ textDecoration: 'none', color: '#666', fontWeight: 'bold' }}>
            Write
          </Link>
        ) : (
          <button 
            onClick={handleAuthClick} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#666', 
              cursor: 'pointer', 
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          >
            Id Code
          </button>
        )}
      </nav>
    </header>
  );
}