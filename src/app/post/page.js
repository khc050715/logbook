"use client";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // ⭐️ useRouter 추가
import { getPostById, deletePost } from '@/lib/api'; // ⭐️ deletePost 함수 import
import MarkdownRenderer from '@/components/MarkdownRenderer';

function PostContent() {
  const searchParams = useSearchParams();
  const router = useRouter(); // ⭐️ useRouter 훅 사용
  // ⭐️ post의 ID는 ?id=... 형태로 오지만, 수정 기능은 ID를 URL 경로로 사용하므로
  // 실제 글 ID는 post.id에서 가져와야 안전합니다.
  const id = searchParams.get('id'); 
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
  
  // ⭐️ 삭제 핸들러 추가
  const handleDelete = async () => {
    if (!post || !post.id) return;
    if (confirm(`정말로 "${post.title}" 글을 삭제하시겠습니까?`)) {
      try {
        const success = await deletePost(post.id);
        if (success) {
          alert('글이 성공적으로 삭제되었습니다.');
          router.push('/'); // 삭제 후 홈 페이지로 이동
        } else {
          alert('삭제 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error("문서 삭제 중 오류 발생:", error);
        alert('삭제 중 치명적인 오류가 발생했습니다.');
      }
    }
  };


  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>로딩중...</p>;
  if (!post) return <p style={{ textAlign: 'center', marginTop: '50px' }}>글을 찾을 수 없습니다.</p>;

  return (
    <article>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>{post.title}</h1>
      
      {/* ⭐️ 수정/삭제 버튼 섹션 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
              // 클릭 시 /edit/postID 경로로 이동
              onClick={() => router.push(`/edit/${post.id}`)} 
              style={{ padding: '8px 15px', border: '1px solid #ccc', background: '#f9f9f9', cursor: 'pointer' }}
          >
              수정하기
          </button>
          <button 
              onClick={handleDelete}
              style={{ padding: '8px 15px', border: 'none', background: 'red', color: 'white', cursor: 'pointer' }}
          >
              삭제하기
          </button>
      </div>
      {/* ⭐️ 수정/삭제 버튼 섹션 끝 */}
      
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