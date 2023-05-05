import React, { useState } from 'react';
import IconButton, {
  Variant as IconVariant,
  Size as SizeVariant,
} from 'components/IconButton';
import RichTextEditor from 'components/RichTextEditor';
import { useMutation } from '@tanstack/react-query';
import { createComments } from 'queries/reaction';
import queryClient from 'utils/queryClient';

interface CommentFormProps {
  className?: string;
  entityId?: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  className = '',
  entityId,
}) => {
  const [editorValue, setEditorValue] = useState<{
    html: string;
    text: string;
    json: Record<string, any>;
  }>({ html: '', json: {}, text: '' });

  const createCommentMutation = useMutation({
    mutationKey: ['create-comment-mutation'],
    mutationFn: createComments,
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: (data: any, variables, context) => {
      setEditorValue({ html: '', json: {}, text: '' });
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const onSubmit = () => {
    const data = {
      entityId: entityId || '',
      entityType: 'post',
      content: {
        text: editorValue.text,
        html: editorValue.html,
        editor: editorValue.json,
      },
      hashtags: [],
      mentions: [],
    };

    createCommentMutation.mutate(data);
  };
  return (
    <div className={`flex flex-row ${className} `}>
      <div className="flex flex-row items-center py-3 gap-2 border border-neutral-200 rounded-19xl border-solid w-full">
        <RichTextEditor
          placeholder="Leave a Comment..."
          className="max-h-6 overflow-y-auto w-full min-h-[24px] "
          onChangeEditor={(content) => setEditorValue({ ...content })}
        />
      </div>

      <div className="flex flex-row items-center z-10 -ml-40">
        <IconButton
          icon={'emojiHappy'}
          className="mx-2 !p-0 cursor-pointer !bg-inherit hover:bg-inherit"
          size={SizeVariant.Large}
          variant={IconVariant.Primary}
        />
        <IconButton
          icon={'iconLinear'}
          className="mx-2 !p-0 cursor-pointer !bg-inherit hover:bg-inherit"
          size={SizeVariant.Large}
          variant={IconVariant.Primary}
        />
        <IconButton
          icon={'send'}
          className="mx-2 !p-0 cursor-pointer !bg-inherit hover:bg-inherit disabled:bg-inherit "
          size={SizeVariant.Large}
          variant={IconVariant.Primary}
          onClick={() => {
            onSubmit();
          }}
        />
      </div>
    </div>
  );
};
