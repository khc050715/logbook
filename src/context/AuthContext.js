// src/context/AuthContext.js
"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/lib/db'; // 파이어베이스 인증 가져오기
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 이메일은 고정해두고, 비밀번호만 '마스터 코드'처럼 입력받습니다.
  const ADMIN_EMAIL = "admin@logbook.com"; 

  useEffect(() => {
    // 새로고침해도 로그인 상태 유지 (파이어베이스가 알아서 관리함)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  //  로그인 (서버에 물어봄)
  const login = async (code) => {
    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, code);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

const logout = async () => {
  await signOut(auth);
  alert('시스템이 잠겼습니다.');
  window.location.href = '/logbook/'; 
};

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}