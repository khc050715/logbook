'use client';

import {
  MDXEditor,
  // 툴바
  toolbarPlugin,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  Separator,
  UndoRedo,
  // 기능 플러그인
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  tablePlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

// 코드블록에서 지원할 언어들
const ALL_LANGUAGES = {
  js: 'JavaScript',
  ts: 'TypeScript',
  jsx: 'JSX',
  tsx: 'TSX',
  python: 'Python',
  css: 'CSS',
  html: 'HTML',
  json: 'JSON',
  bash: 'Bash',
  sql: 'SQL',
  markdown: 'Markdown',
};

// 이미지 업로드 핸들러 (Firebase Storage 연동 전 임시: URL 입력 방식)
async function imageUploadHandler(image) {
  // 추후 Firebase Storage 업로드 로직으로 교체 가능
  // 지금은 파일을 base64로 변환해서 바로 embed
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(image);
  });
}

const plugins = [
  // 툴바 (원하는 버튼만 조립)
  toolbarPlugin({
    toolbarContents: () => (
      <DiffSourceToggleWrapper>
        <UndoRedo />
        <Separator />
        <BlockTypeSelect />
        <Separator />
        <BoldItalicUnderlineToggles />
        <CodeToggle />
        <Separator />
        <ListsToggle />
        <Separator />
        <CreateLink />
        <InsertImage />
        <Separator />
        <InsertTable />
        <InsertThematicBreak />
        <Separator />
        <InsertCodeBlock />
      </DiffSourceToggleWrapper>
    ),
  }),
  // 블록 요소
  headingsPlugin(),
  listsPlugin(),
  quotePlugin(),
  thematicBreakPlugin(),
  tablePlugin(),
  // 링크 & 이미지
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({ imageUploadHandler }),
  // 코드블록 (CodeMirror 연동으로 신택스 하이라이팅)
  codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
  codeMirrorPlugin({ codeBlockLanguages: ALL_LANGUAGES }),
  // UX
  markdownShortcutPlugin(),
  diffSourcePlugin({ viewMode: 'rich-text' }), // 마크다운 원문 토글 가능
];

export default function Editor({ markdown, onChange }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      background: 'white',
      minHeight: '500px',
    }}>
      <MDXEditor
        markdown={markdown || ''}
        plugins={plugins}
        onChange={onChange}
        contentEditableClassName="prose-content"
      />
    </div>
  );
}