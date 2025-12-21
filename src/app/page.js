"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/api';
import styles from './page.module.css';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  // 날짜 포맷 함수 (예: 2024. 12. 21. 14:30)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // 24시간제 (오후/오전 표시 원하면 true로 변경)
    });
  };

  return (
    <main>
      <div className={styles.list}>
        {posts.map((post) => (
        <Link href={`/post?id=${post.id}`} key={post.id} className={styles.item}>
          <h2 className={styles.title}>{post.title}</h2>
          {/* 👇 포맷팅 적용 */}
          <p className={styles.date}>{formatDate(post.createdAt)}</p>
        </Link>
        ))}
        {posts.length === 0 && <p>글이 없습니다. Write를 눌러 작성해보세요!</p>}
      </div>
    </main>
  );
}