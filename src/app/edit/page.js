// src/app/edit/page.js
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPostById, updatePost } from '@/lib/api';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

function EditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getPostById(id).then((data) => {
      if (data) {
        setTitle(data.title);
        setContent(data.content);
      }
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await updatePost(id, title, content)) {
      alert('수정 완료!');
      router.push(`/post?id=${id}`);
    } else {
      alert('수정 실패');
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (!id) return <p>잘못된 접근입니다.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>글 수정하기</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ padding: '10px', fontSize: '1.2rem', border: '1px solid #ddd', borderRadius: '5px' }}
        />
        
        <div style={{ border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
          <CodeMirror 
            value={content} 
            height="500px"
            extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
            onChange={(value) => setContent(value)}
            theme="dark"
          />
        </div>

        <button type="submit" style={{ padding: '15px', background: 'black', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          수정 완료
        </button>
      </form>
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