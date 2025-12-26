// src/app/post/page.js
"use client"; // 1. 클라이언트 컴포넌트 선언

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PostService } from '@/services/postService';
import PostViewer from '@/components/posts/PostViewer';
import PostActions from '@/components/posts/PostActions';

function PostView() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // 2. 클라이언트에서 ID 추출
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // 3. ID가 있을 때 데이터 불러오기
  useEffect(() => {
    if (!id) return;
    PostService.getById(id).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [id]);

  if (!id) return <div style={{ padding: '20px' }}>잘못된 접근입니다.</div>;
  if (loading) return <div style={{ padding: '20px' }}>로딩 중...</div>;
  if (!post) return <div style={{ padding: '20px' }}>글을 찾을 수 없습니다.</div>;

  return (
    <article style={{ padding: '20px 0' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>{post.title}</h1>
      <p style={{ color: '#888', marginBottom: '40px' }}>
        {post.createdAt?.split('T')[0]}
      </p>
      
      {/* 뷰어 컴포넌트 */}
      <PostViewer content={post.content} />
      
      {/* 수정/삭제 버튼 */}
      <PostActions id={id} />
    </article>
  );
}

export default function PostPage() {
  return (
    // 4. useSearchParams를 사용하는 컴포넌트는 반드시 Suspense로 감싸야 빌드 에러가 안 납니다.
    <Suspense fallback={<div>Loading...</div>}>
      <PostView />
    </Suspense>
  );
}