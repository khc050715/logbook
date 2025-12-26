// src/components/editor/Editor.js
'use client';

import { 
  MDXEditor, 
  headingsPlugin, 
  listsPlugin, 
  quotePlugin, 
  thematicBreakPlugin,
  markdownShortcutPlugin 
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

// 에디터 플러그인 설정
const plugins = [
  headingsPlugin(),
  listsPlugin(),
  quotePlugin(),
  thematicBreakPlugin(),
  markdownShortcutPlugin()
];

export default function Editor({ markdown, onChange }) {
  return (
    // 스타일 충돌 방지를 위해 배경색과 패딩을 명시합니다.
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', background: 'white', minHeight: '500px' }}>
      <MDXEditor
        markdown={markdown}
        plugins={plugins}
        onChange={onChange}
        contentEditableClassName="prose-content" // 필요시 CSS 클래스 타겟팅용
      />
    </div>
  );
}