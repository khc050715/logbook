// src/app/page.js
"use client"; // 👈 클라이언트 컴포넌트로 변경

import Link from 'next/link';
import { useEffect, useState } from 'react'; // React Hook 추가
import { PostService } from '@/services/postService';
import styles from './page.module.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 컴포넌트가 마운트될 때 데이터 불러오기
  useEffect(() => {
    PostService.getAll().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <main className={styles.main} style={{ padding: '20px' }}>
        <p>로딩 중...</p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      {posts.length === 0 ? (
        <p style={{ padding: '20px', color: '#666' }}>작성된 글이 없습니다.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ marginBottom: '40px', borderBottom: '1px solid #c7c7c7', paddingBottom: '20px' }}>
            <Link href={`/post?id=${post.id}`} className={styles.item}>
              <h2 className={styles.title}>{post.title}</h2>
              <p className={styles.date}>
                {post.createdAt ? post.createdAt.split('T')[0] + ' ' + post.createdAt.split('T')[1].slice(0, 5) : '날짜 없음'}
              </p>
            </Link>
          </div>
        ))
      )}
    </main>
  );
}