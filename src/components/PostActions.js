"use client"; // 클라이언트 컴포넌트
import { useRouter } from 'next/navigation';
import { deletePost } from '@/lib/api';

export default function PostActions({ id, title }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm(`정말로 "${title}" 글을 삭제하시겠습니까?`)) {
      await deletePost(id);
      alert('삭제되었습니다.');
      router.push('/');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <button 
        onClick={() => router.push(`/edit?id=${id}`)} 
        style={{ padding: '8px 15px', border: '1px solid #ccc', background: '#f9f9f9', cursor: 'pointer' }}
      >
        수정하기
      </button>
      <button 
        onClick={handleDelete} 
        style={{ padding: '8px 15px', border: '1px solid #ff4d4f', background: '#fff', color: '#ff4d4f', cursor: 'pointer' }}
      >
        삭제하기
      </button>
    </div>
  );
}