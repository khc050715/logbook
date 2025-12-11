"use client";
import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

// --- 1. 커스텀 컴포넌트 정의 ---

// (1) 버튼 컴포넌트
const MyButton = ({ children, ...props }) => (
    <button style={{ padding: '5px 10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} {...props}>
        {children}
    </button>
);

// (2) 타자기 효과 컴포넌트 (안전 장치 추가됨)
const Typewriter = ({ text, children, speed = 100, color = "#00ff41", bg = "#000" }) => {
  // text 속성이 없으면 children(태그 사이 내용)을 사용, 둘 다 없으면 빈 문자열
  const finalText = text || (typeof children === "string" ? children : "") || "";
  
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // 텍스트가 없으면 아무것도 하지 않음
    if (!finalText) return;

    let i = 0;
    setDisplayedText(""); // 초기화

    const typingInterval = setInterval(() => {
      if (i < finalText.length) {
        setDisplayedText((prev) => prev + finalText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, Number(speed)); // speed가 문자열로 들어올 경우를 대비해 Number 변환

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [finalText, speed]);

  if (!finalText) return null; // 내용이 없으면 렌더링하지 않음

  return (
    <span style={{
      fontFamily: "'Courier New', Courier, monospace",
      backgroundColor: bg,
      color: color,
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "0.95em",
      fontWeight: "bold",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      display: "inline-block",
      lineHeight: "1.2"
    }}>
      {">"} {displayedText}
      <span style={{ opacity: showCursor ? 1 : 0, marginLeft: "2px" }}>_</span>
    </span>
  );
};

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