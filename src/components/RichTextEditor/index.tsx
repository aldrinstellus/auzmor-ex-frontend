import React, { memo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import './mentions/quill.mention';
import './mentions/quill.mention.css';

import { createMentionsList } from './mentions/utils';
import { MentionBlot } from './mentions/blots/mentions';

export interface EditorContentChanged {
  html: string;
  markdown: string;
  json: string;
}

export interface IQuillEditorProps {
  value: string;
  onChange: (content: EditorContentChanged) => void;
}

// fetch the data
const mentionEntityFetch = (mentionChar: string, searchTerm: string) => {
  let list;
  if (mentionChar === '@') {
    list = [
      {
        id: 1,
        value: 'Darshak Parmar',
        name: 'Darshak Parmar',
        avatar:
          'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
        title: 'Software Engineer',
      },
    ];
  } else {
    list = [
      {
        id: 1,
        value: 'Office',
        src: '',
      },
    ];
  }
  return createMentionsList(list);
};

const mention = {
  allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
  mentionDenotationChars: ['@', '#'],
  source: (
    searchTerm: string,
    renderItem: (
      arg0: { id: number; value: string; src: string }[] | undefined,
      arg1: any,
    ) => void,
    mentionChar: string,
  ) => {
    let values = [];
    const mentionList = mentionEntityFetch(mentionChar, searchTerm);
    values = mentionList;
    if (searchTerm.length === 0) {
      renderItem(values, searchTerm);
    } else {
      const matches = [];
      for (let i = 0; i < values.length; i++)
        if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
          matches.push(values[i]);
      renderItem(matches, searchTerm);
    }
  },
  dataAttributes: ['id'],
  renderItem: (item: any, searchItem: any) => {
    return `<div style="display: flex; align-items: center; padding-bottom: 8px; padding-top: 8px;" class="mention-list-item">
            <img style="width: 64px; height: 64px; border:1px solid grey; border-radius:50%; margin-right: 8px;" src="${item.src}" />
            <div>
                <div>${item.value}</div>
                <div>SDE1</div>
            </div>
          </div>`;
  },
};

const RichTextEditor: React.FC<IQuillEditorProps> = ({ value, onChange }) => {
  const [contentValue, setContentValue] = useState<string>(value || '');
  const reactQuillRef = useRef<ReactQuill>(null);

  Quill.register(
    {
      'formats/mention': MentionBlot,
    },
    true,
  );

  const formats = ['bold', 'italic', 'underline', 'strike', 'mention'];

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
    <ReactQuill
      id="quill"
      style={{ fontSize: '20px' }}
      value={contentValue}
      modules={{ ...modules }}
      placeholder="What's in your mind?"
      theme="bubble"
      ref={reactQuillRef}
      formats={formats}
      onChange={onChangeContent}
    />
  );
};
export default memo(RichTextEditor);
