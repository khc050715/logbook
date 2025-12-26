// src/app/page.js
import Link from 'next/link';
import { PostService } from '@/services/postService';
import styles from './page.module.css'; // 기존 스타일 유지

export const revalidate = 0; // 항상 최신글 보여주기

export default async function Home() {
  const posts = await PostService.getAll();

  return (
    <main className={styles.main}>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: '40px' }}>
          <Link href={`/post?id=${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>{post.title}</h2>
            <p style={{ color: '#666' }}>{post.createdAt?.split('T')[0]}</p>
          </Link>
        </div>
      ))}
    </main>
  );
}