import React, { useEffect, useRef } from 'react';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { openSearchPanel } from '@codemirror/search';
import { EditorView } from '@codemirror/view';
import { Theme } from '../types';

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  theme: Theme;
  searchTrigger: number;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, theme, searchTrigger }) => {
  const editorRef = useRef<ReactCodeMirrorRef>(null);

  // Listen for search trigger from parent to open CodeMirror's internal search panel
  useEffect(() => {
    if (searchTrigger > 0 && editorRef.current?.view) {
      openSearchPanel(editorRef.current.view);
      // Focus the editor to ensure keyboard shortcuts work immediately after
      editorRef.current.view.focus();
    }
  }, [searchTrigger]);

  const extensions = [
    html(), 
    EditorView.lineWrapping, // Essential for mobile to avoid horizontal scrolling
  ];

  return (
    <div className="h-full w-full text-base">
      <CodeMirror
        ref={editorRef}
        value={code}
        height="100%"
        theme={theme === 'dark' ? githubDark : githubLight}
        extensions={extensions}
        onChange={(val) => onChange(val)}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true, // Enables Ctrl+F / Cmd+F natively
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
        className="h-full"
      />
      <style>{`
        /* Overrides to ensure the editor fits perfectly */
        .cm-editor {
          height: 100%;
        }
        .cm-scroller {
          overflow: auto;
          font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
        }
        /* Mobile adjustment for touch targets */
        .cm-content {
          padding-bottom: 50vh; /* Allow scrolling past end */
        }
        /* Customize search panel for dark mode specifically if needed */
        .dark .cm-search {
            background-color: #252526;
            color: #e0e0e0;
            border: 1px solid #454545;
        }
        .dark .cm-textfield {
            background-color: #3c3c3c;
            color: white;
            border: 1px solid #555;
        }
        .dark .cm-button {
            background: linear-gradient(#3c3c3c, #333);
            color: #e0e0e0;
        }
      `}</style>
    </div>
  );
};