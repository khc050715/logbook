// src/app/post/page.js
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getPostById, deletePost } from '@/lib/api';
import MarkdownRenderer from '@/components/MarkdownRenderer';

function PostContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // 데이터 불러오기
  useEffect(() => {
    if (id) {
      getPostById(id).then((data) => {
        setPost(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id]);

  // 삭제 기능
  const handleDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const success = await deletePost(post.id);
      if (success) {
        alert('삭제되었습니다.');
        router.push('/');
      } else {
        alert('삭제 실패');
      }
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>로딩중...</p>;
  if (!post) return <p style={{ textAlign: 'center', marginTop: '50px' }}>글을 찾을 수 없습니다.</p>;

  return (
    <article>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>{post.title}</h1>
      
      {/* 수정/삭제 버튼 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => router.push(`/edit?id=${post.id}`)} 
          style={{ padding: '8px 15px', border: '1px solid #ccc', background: '#f9f9f9', cursor: 'pointer', borderRadius: '5px' }}
        >
          수정하기
        </button>
        <button 
          onClick={handleDelete} 
          style={{ padding: '8px 15px', border: '1px solid #ff4d4f', background: '#fff', color: '#ff4d4f', cursor: 'pointer', borderRadius: '5px' }}
        >
          삭제하기
        </button>
      </div>

      <p style={{ color: '#888', marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      
      <MarkdownRenderer content={post.content} />
    </article>
  );
}

export default function PostPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostContent />
    </Suspense>
  );
}