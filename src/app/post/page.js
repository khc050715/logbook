"use client";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getPostById } from '@/lib/api';
import MarkdownRenderer from '@/components/MarkdownRenderer';

function PostContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // 주소창에서 ?id=... 값을 가져옴
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPostById(id).then((data) => {
        setPost(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>로딩중...</p>;
  if (!post) return <p style={{ textAlign: 'center', marginTop: '50px' }}>글을 찾을 수 없습니다.</p>;

  return (
    <article>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>{post.title}</h1>
      <p style={{ color: '#888', marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <MarkdownRenderer content={post.content} />
    </article>
  );
}

// Suspense는 Next.js에서 useSearchParams를 쓸 때 필수입니다.
export default function PostPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostContent />
    </Suspense>
  );
}