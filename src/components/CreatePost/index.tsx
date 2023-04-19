import React from 'react';
import RichTextEditor from 'components/RichTextEditor';
import { Card } from '@auzmorui/component-library.components.card';
import Actor from 'components/Actor';
import { CREATE_POST } from 'components/Actor/constant';

const CreatePost = () => {
  return (
    <>
      <Actor
        avatar="https://png.pngtree.com/png-clipart/20210619/ourlarge/pngtree-instagram-lady-social-media-flat-style-avatar-png-image_3483977.jpg"
        actorName="Sam Fields"
        visibility="Everyone"
        contentMode={CREATE_POST}
      />
      <RichTextEditor
        placeholder="What’s on your mind?"
        className="h-28 ml-4"
        theme="snow"
      />
    </>
  );
};

export default CreatePost;
