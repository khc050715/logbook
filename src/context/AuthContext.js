// src/context/AuthContext.js
"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // 초기 로딩 상태 추가

  // 🔑 마스터 코드 설정 (환경변수로 빼는 것을 추천하지만, 편의상 여기에 적습니다)
  const MASTER_CODE = process.env.NEXT_PUBLIC_MASTER_CODE || "1234"; 

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지 확인
    const savedCode = localStorage.getItem('masterCode');
    if (savedCode === MASTER_CODE) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = (code) => {
    if (code === MASTER_CODE) {
      localStorage.setItem('masterCode', code);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('masterCode');
    setIsLoggedIn(false);
    alert('시스템이 잠겼습니다.');
    window.location.href = '/'; // 확실한 초기화를 위해 이동
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}