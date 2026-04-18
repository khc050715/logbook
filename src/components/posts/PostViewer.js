'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github.css'; // 코드 테마 (원하는 걸로 교체 가능)

export default function PostViewer({ content }) {
  return (
    <div className="markdown-body" style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
        components={{
          // 코드블록 스타일 보강
          pre({ children }) {
            return (
              <pre style={{
                background: '#f6f8fa',
                borderRadius: '8px',
                padding: '16px',
                overflowX: 'auto',
                fontSize: '0.9em',
              }}>
                {children}
              </pre>
            );
          },
          // 인라인 코드
          code({ inline, children }) {
            if (inline) {
              return (
                <code style={{
                  background: '#f0f0f0',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.88em',
                  fontFamily: 'monospace',
                }}>
                  {children}
                </code>
              );
            }
            return <code>{children}</code>;
          },
          // 테이블 스타일
          table({ children }) {
            return (
              <div style={{ overflowX: 'auto', marginBottom: '1em' }}>
                <table style={{
                  borderCollapse: 'collapse',
                  width: '100%',
                  fontSize: '0.95em',
                }}>
                  {children}
                </table>
              </div>
            );
          },
          th({ children }) {
            return (
              <th style={{
                border: '1px solid #ddd',
                padding: '8px 12px',
                background: '#f6f8fa',
                fontWeight: '600',
                textAlign: 'left',
              }}>
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td style={{
                border: '1px solid #ddd',
                padding: '8px 12px',
              }}>
                {children}
              </td>
            );
          },
          // 이미지 반응형
          img({ src, alt }) {
            return (
              <img
                src={src}
                alt={alt}
                style={{ maxWidth: '100%', borderRadius: '6px', margin: '8px 0' }}
              />
            );
          },
          // 링크 새 탭
          a({ href, children }) {
            return (
              <a href={href} target="_blank" rel="noopener noreferrer"
                style={{ color: '#0070f3' }}>
                {children}
              </a>
            );
          },
          // 인용구
          blockquote({ children }) {
            return (
              <blockquote style={{
                borderLeft: '4px solid #ccc',
                margin: '0',
                paddingLeft: '16px',
                color: '#666',
                fontStyle: 'italic',
              }}>
                {children}
              </blockquote>
            );
          },
        }}
      >
        {content || ''}
      </ReactMarkdown>
    </div>
  );
}