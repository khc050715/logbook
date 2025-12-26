// src/app/write/page.js
"use client"; 
import { useRouter } from 'next/navigation';
import { PostService } from '@/services/postService'; // 👈 Service 사용
import { useAuth } from '@/context/AuthContext';
import { useAuthGuard } from '@/hooks/useAuthGuard'; 
import PostForm from '@/components/posts/PostForm'; // 👈 경로 변경됨

export default function WritePage() {
  const router = useRouter();
  const { logout } = useAuth();
  const { isLoading } = useAuthGuard();

  const handleCreate = async (title, content) => {
    const success = await PostService.create(title, content); // 👈 Service 호출
    if (success) {
      alert('저장 완료!');
      router.push('/');
    }
  };

  const handleLogout = async () => {
    await logout();
    alert('시스템이 잠겼습니다.');
    router.push('/');
  };

  if (isLoading) return null;

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '20px'}}>
        <h1>글 쓰기</h1>
        <button 
          onClick={handleLogout} 
          style={{ padding:'8px 12px', fontSize:'0.8rem', background:'#eee', border:'1px solid #ddd', borderRadius:'5px', cursor:'pointer' }}
        >
          🔒 Lock System
        </button>
      </div>

      <PostForm 
        onSubmit={handleCreate} 
        buttonText="발행하기" 
      />
    </div>
  );
}