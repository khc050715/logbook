// src/app/post/page.js
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getPostById, deletePost } from '@/lib/api';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { useAuth } from '@/context/AuthContext';

function PostContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const [post, setPost] = useState(null);
  const [dataLoading, setDataLoading] = useState(true); // 이름 명확화

  const { isLoggedIn, loading: authLoading } = useAuth(); // 인증 로딩 상태

  useEffect(() => {
    // 1. 아직 인증 확인 중이면 아무것도 하지 말고 기다림
    if (authLoading) return;

    // 2. 로그인을 안 했다? -> 굳이 서버에 데이터 요청할 필요 없음 (요청하면 에러남)
    if (!isLoggedIn) {
      setDataLoading(false); // 로딩 끝내고 잠금화면 보여주러 감
      return; 
    }

    // 3. 로그인 했다 -> 데이터 가져오기
    if (id) {
      getPostById(id)
        .then((data) => {
          setPost(data);
          setDataLoading(false);
        })
        .catch((err) => {
          console.error("글 불러오기 실패:", err);
          setDataLoading(false); // ⭐️ 에러가 나도 로딩은 끝내줘야 함!
        });
    } else {
      setDataLoading(false);
    }
  }, [id, authLoading, isLoggedIn]); // 의존성 배열 업데이트

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

  // ▼ 화면 그리는 순서 (이 순서가 중요합니다) ▼
  
  // 1. 인증 확인 중 (아주 잠깐 뜸)
  if (authLoading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>🔐 보안 확인 중...</p>;

  // 2. 로그인 안 함 -> 잠금 화면 출력 (데이터 로딩 상관없이 바로 차단)
  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', color: '#888' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '20px'}}>🔒</h2>
        <p>비공개 문서입니다.</p>
        <p style={{ fontSize: '0.9rem'}}>상단 'Id Code'를 입력하여 잠금을 해제하세요.</p>
      </div>
    );
  }

  // 3. 데이터 로딩 중 (로그인 된 사람에게만 보임)
  if (dataLoading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>글 불러오는 중...</p>;

  // 4. 데이터 없음
  if (!post) return <p style={{ textAlign: 'center', marginTop: '50px' }}>글을 찾을 수 없습니다.</p>;

  // 5. 진짜 내용 보여주기
  return (
    <article>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>{post.title}</h1>
      
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