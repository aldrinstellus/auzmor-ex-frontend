import React, { memo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './mentions/quill.mention';
import './mentions/quill.mention.css';

import { MentionBlot } from './mentions/blots/mentions';
import Toolbar, { formats, modules } from './toolbar/index';
import { LinkBlot } from './blots/link';
import AutoLinks from './autoLinks';

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
      'formats/link': LinkBlot,
      'modules/autoLinks': AutoLinks,
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
