"use client";
import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

// --- 커스텀 컴포넌트 정의 ---

// (1) 버튼 컴포넌트
const MyButton = ({ children, ...props }) => (
    <button style={{ padding: '5px 10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} {...props}>
        {children}
    </button>
);

// --- 2. 매핑 설정 ---
const options = {
    overrides: {
        Button: { component: MyButton },
        Typewriter: { component: Typewriter },
    },
};

// --- 3. 메인 렌더러 ---
export default function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-body">
      <Markdown options={options}>
        {content || ""}
      </Markdown>
    </div>
  );
}