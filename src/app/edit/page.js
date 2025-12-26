// src/app/edit/page.js
"use client";
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PostService } from '@/services/postService'; // 👈 Service 사용
import { useAuthGuard } from '@/hooks/useAuthGuard';
import PostForm from '@/components/posts/PostForm'; // 👈 경로 변경됨

function EditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { isLoading: authLoading } = useAuthGuard();

  const [post, setPost] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    PostService.getById(id).then((data) => {
      setPost(data);
      setDataLoading(false);
    });
  }, [id]);

  const handleUpdate = async (title, content) => {
    const success = await PostService.update(id, title, content);
    if (success) {
      alert('수정 완료!');
      router.push(`/post?id=${id}`); // 👈 상세 페이지 경로 확인 필요 (app/post/page.js가 있다면)
    } else {
      alert('수정 실패');
    }
  };

  if (authLoading || dataLoading) return <p>로딩 중...</p>;
  if (!id || !post) return <p>잘못된 접근입니다.</p>;

  return (
    <div style={{ padding: '20px 0' }}>
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