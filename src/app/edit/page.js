"use client";
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPostById, updatePost } from '@/lib/api';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import PostForm from '@/components/PostForm';

function EditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // 1. 보안 가드
  const { isLoading: authLoading } = useAuthGuard();

  const [post, setPost] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  // 데이터 불러오기
  useEffect(() => {
    if (!id) return;
    getPostById(id).then((data) => {
      setPost(data);
      setDataLoading(false);
    });
  }, [id]);

  const handleUpdate = async (title, content) => {
    if (await updatePost(id, title, content)) {
      alert('수정 완료!');
      router.push(`/post?id=${id}`);
    } else {
      alert('수정 실패');
    }
  };

  if (authLoading || dataLoading) return <p>로딩 중...</p>;
  if (!id || !post) return <p>잘못된 접근입니다.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>글 수정하기</h1>
      <PostForm 
        initialTitle={post.title} 
        initialContent={post.content} 
        onSubmit={handleUpdate} 
        buttonText="수정 완료" 
      />
    </div>
  );
}

export default function EditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditForm />
    </Suspense>
  );
}