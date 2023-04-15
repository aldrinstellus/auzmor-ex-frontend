import React, { memo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import './mentions/quill.mention';
import './mentions/quill.mention.css';

import { MentionBlot } from './mentions/blots/mentions';
import { mention } from './config';
import Toolbar, { formats } from './toolbar/index';

export interface EditorContentChanged {
  html: string;
  markdown: string;
  json: string;
}

export type QuillEditorProps = {
  className?: string;
  theme?: string;
  placeholder: string;
  value: string;
  onChange: (content: EditorContentChanged) => void;
};

const RichTextEditor: React.FC<QuillEditorProps> = ({
  className,
  placeholder,
  theme,
  value,
  onChange,
}) => {
  const [contentValue, setContentValue] = useState<string>(value || '');
  const reactQuillRef = useRef<ReactQuill>(null);

  Quill.register(
    {
      'formats/mention': MentionBlot,
    },
    true,
  );

  const onChangeContent = (content: string) => {
    setContentValue(content);
    const delta = reactQuillRef.current?.getEditor().getContents();
    const contentJson = JSON.stringify(delta);
    if (onChange) {
      onChange({
        html: content,
        markdown: content.replace(/<[^>]+>/g, ''),
        json: contentJson,
      });
    }
  };

  const modules = {
    toolbar: false,
    mention: mention,
  };

  return (
    <>
      <ReactQuill
        id="quill"
        className={className}
        value={contentValue}
        modules={{ ...modules }}
        placeholder={placeholder}
        theme={theme}
        ref={reactQuillRef}
        formats={formats}
        onChange={onChangeContent}
      />
      <Toolbar />
    </>
  );
};
export default memo(RichTextEditor);
