// src/components/posts/PostViewer.js
"use client";
import React from 'react';
import Markdown from 'markdown-to-jsx';

// 커스텀 컴포넌트 예시
const MyButton = ({ children, ...props }) => (
    <button style={{ padding: '5px 10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} {...props}>
        {children}
    </button>
);

const options = {
    overrides: {
        Button: { component: MyButton },
    },
};

export default function PostViewer({ content }) {
  return (
    <div className="markdown-body" style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
      <Markdown options={options}>
        {content || ""}
      </Markdown>
    </div>
  );
}