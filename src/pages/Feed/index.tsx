import React, { useState } from 'react';
import RichTextEditor from 'components/RichTextEditor';
interface IFeedProps {}

interface EditorContentChanged {
  html: string;
  markdown: string;
  json: string;
}

const Feed: React.FC<IFeedProps> = () => {
  const [editorHtmlValue, setEditorHtmlValue] = useState<string>('');
  const [editorMarkdownValue, setEditorMarkdownValue] = useState<string>('');
  const [editorJsonValue, setEditorJsonValue] = useState<string>('');

  const onEditorContentChanged = (content: EditorContentChanged) => {
    setEditorHtmlValue(content.html);
    setEditorMarkdownValue(content.markdown);
    setEditorJsonValue(content.json);
  };

  return <RichTextEditor value={''} onChange={onEditorContentChanged} />;
};

export default Feed;
