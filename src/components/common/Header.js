// src/components/common/Header.js
"use client";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { isLoggedIn, login } = useAuth();

  const handleAuthClick = async () => {
    if (!isLoggedIn) {
      const code = prompt("Access Code:"); 
      if (code) {
        const success = await login(code); 
        if (!success) alert("코드가 일치하지 않습니다.");
      }
    }
  };

  return (
    <header style={{ padding: '20px 0', marginBottom: '40px', borderBottom: '1px solid #c7c7c7' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: '700', textDecoration: 'none', color: 'black' }}>
          logbook
        </Link>
        {isLoggedIn ? (
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link href="/write" style={{ textDecoration: 'none', color: '#666', fontWeight: 'bold' }}>
              Write
            </Link>
          </div>
        ) : (
          <button 
            onClick={handleAuthClick} 
            style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '1rem' }}
          >
            Id Code
          </button>
        )}
      </nav>
    </header>
  );
}