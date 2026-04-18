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

const plugins = [
  toolbarPlugin({
    toolbarContents: () => (
      <DiffSourceToggleWrapper>
        <UndoRedo />
        <Separator />
        <BlockTypeSelect />
        <Separator />
        <BoldItalicUnderlineToggles />
        <Separator />
        <CodeToggle />
        <Separator />
        <CreateLink />
        <Separator />
        <InsertTable />
        <InsertThematicBreak />
        <Separator />
        <InsertCodeBlock />
      </DiffSourceToggleWrapper>
    ),
  }),
  headingsPlugin(),
  listsPlugin(),
  quotePlugin(),
  thematicBreakPlugin(),
  tablePlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
  codeMirrorPlugin({ codeBlockLanguages: ALL_LANGUAGES }),
  markdownShortcutPlugin(),
  diffSourcePlugin({ viewMode: 'rich-text' }),
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