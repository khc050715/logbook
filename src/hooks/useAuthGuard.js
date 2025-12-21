import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function useAuthGuard() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 로딩이 끝났는데 로그인이 안 되어 있다면 홈으로 보냄
    if (!loading && !isLoggedIn) {
      alert('접근 권한이 없습니다.');
      router.replace('/');
    }
  }, [loading, isLoggedIn, router]);

  return { isLoading: loading };
}