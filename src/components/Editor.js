"use client";
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

const extensions = [
  markdown({ base: markdownLanguage, codeLanguages: languages }),
  EditorView.lineWrapping,
];

export default function Editor({ initialValue, onChange }) {
  return (
    <div className="editor-container">
      <CodeMirror
        defaultValue={initialValue || ''}
        extensions={extensions}
        onChange={onChange}
        height="500px"
        theme="light"
      />
    </div>
  );
}