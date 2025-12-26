// src/components/posts/PostActions.js
"use client";
import { useRouter } from 'next/navigation';
import { PostService } from '@/services/postService'; // 변경됨

export default function PostActions({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    // api 대신 Service 사용
    const success = await PostService.delete(id); 
    if (success) {
      alert('삭제되었습니다.');
      router.push('/');
      router.refresh();
    } else {
      alert('삭제 실패');
    }
  };

  const handleEdit = () => {
    router.push(`/edit?id=${id}`);
  };

  return (
    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
      <button onClick={handleEdit}>수정</button>
      <button onClick={handleDelete} style={{ color: 'red' }}>삭제</button>
    </div>
  );
}