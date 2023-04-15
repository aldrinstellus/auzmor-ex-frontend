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

  return (
    <div className="grid grid-cols-12 gap-52">
      <div className="col-span-3 text-center bg-red-400 rounded">Column 1</div>
      <div className="col-span-6">
        <RichTextEditor
          placeholder="What’s on your mind?"
          className="bg-white shadow rounded"
          value={''}
          theme="bubble"
          onChange={onEditorContentChanged}
        />
      </div>
      <div className="col-span-3 text-center bg-blue-400 rounded">Column 2</div>
    </div>
  );
};

export default Feed;
