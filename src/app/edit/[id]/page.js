// src/app/edit/[id]/page.js

import { collection, getDocs } from 'firebase/firestore';

// 👇 여기를 '../../../lib/firebase' 대신 '@/lib/db'로 수정!
import { db } from '@/lib/db'; 

import EditPageClient from './EditPageClient';

// generateStaticParams 함수는 그대로 둡니다.
export async function generateStaticParams() {
  let postIds = [];
  try {
    const postsCollection = collection(db, "posts");
    const snapshot = await getDocs(postsCollection);
    postIds = snapshot.docs.map(doc => ({ id: doc.id }));
  } catch (error) {
    console.error("Error fetching static params:", error);
  }
  return postIds; 
}

export default function EditPageServer() {
  return <EditPageClient />;
}