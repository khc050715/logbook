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

  return (
    <main>
      <div className={styles.list}>
        {posts.map((post) => (
        <Link href={`/post?id=${post.id}`} key={post.id} className={styles.item}>
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.date}>{new Date(post.createdAt).toLocaleDateString()}</p>
        </Link>
        ))}
        {posts.length === 0 && <p>글이 없습니다. Write를 눌러 작성해보세요!</p>}
      </div>
    </main>
  );
}