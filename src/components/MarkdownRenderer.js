// src/components/MarkdownRenderer.js
"use client";
import Markdown from 'markdown-to-jsx';

// 1. MDX 문서 안에서 사용할 컴포넌트들을 정의합니다.
// (예: 글 내용 중에 <Button>눌러봐</Button> 라고 쓰면 이 버튼이 나옵니다)
const MyButton = ({ children, ...props }) => (
    <button style={{ padding: '5px 10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} {...props}>
        {children}
    </button>
);

const options = {
    overrides: {
        // 마크다운 태그를 커스텀 컴포넌트와 연결
        Button: { component: MyButton },
    },
};

export default function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-body">
      <Markdown options={options}>
        {content || ""}
      </Markdown>
    </div>
  );
}