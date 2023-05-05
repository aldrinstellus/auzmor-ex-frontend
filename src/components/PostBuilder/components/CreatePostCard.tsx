import Avatar from 'components/Avatar';
import Card from 'components/Card';
import Divider, { Variant } from 'components/Divider';
import Icon from 'components/Icon';
import { IPostTypeIcon } from 'pages/Feed';
import React from 'react';
import { twConfig } from 'utils/misc';

export interface ICreatePostCardProps {
  setShowModal: (flag: boolean) => void;
}

export const postTypeMapIcons: IPostTypeIcon[] = [
  {
    id: 1,
    label: 'Media',
    icon: <Icon name="imageFilled" fill="#000000" size={14} />,
    menuItems: [
      {
        renderNode: (
          <div className="flex px-6 py-3 items-center hover:bg-primary-50">
            <Icon
              name="image"
              size={16}
              className="p-2 rounded-7xl border mr-2.5 bg-white"
              fill={twConfig.theme.colors.primary['500']}
            />
            <div className="text-sm text-neutral-900 font-medium">
              Upload a photo
            </div>
          </div>
        ),
      },
      {
        renderNode: (
          <div className="flex px-6 py-3 items-center hover:bg-primary-50">
            <Icon
              name="video"
              size={16}
              className="p-2 rounded-7xl border mr-2.5 bg-white"
              fill={twConfig.theme.colors.primary['500']}
            />
            <div className="text-sm text-neutral-900 font-medium">
              Upload a video
            </div>
          </div>
        ),
      },
      {
        renderNode: (
          <div className="flex px-6 py-3 items-center hover:bg-primary-50">
            <Icon
              name="document"
              size={16}
              className="p-2 rounded-7xl border mr-2.5 bg-white"
              fill={twConfig.theme.colors.primary['500']}
            />
            <div className="text-sm text-neutral-900 font-medium">
              Share a document
            </div>
          </div>
        ),
      },
    ],
    divider: <Divider variant={Variant.Vertical} />,
  },
  {
    id: 2,
    label: 'Shoutout',
    icon: <Icon name="magicStarFilled" fill="#000000" size={14} />,
    menuItems: [],
    divider: <Divider variant={Variant.Vertical} />,
  },
  {
    id: 3,
    label: 'Events',
    icon: <Icon name="calendarFilledTwo" fill="#000000" size={14} />,
    menuItems: [],
    divider: <Divider variant={Variant.Vertical} />,
  },
  {
    id: 4,
    label: 'Polls',
    icon: <Icon name="chartFilled" fill="#000000" size={14} />,
    menuItems: [],
  },
];

const CreatePostCard: React.FC<ICreatePostCardProps> = ({ setShowModal }) => {
  return (
    <Card className="bg-white">
      <div className="flex items-center px-6 pt-6 pb-3">
        <Avatar
          size={32}
          image="https://png.pngtree.com/png-clipart/20210619/ourlarge/pngtree-instagram-lady-social-media-flat-style-avatar-png-image_3483977.jpg"
          name={'Anish Sarkar'}
          active={false}
        />
        {/* replace with component library */}
        <input
          type="input"
          className="w-135.25 h-11 border border-neutral-200 rounded-19xl ml-3 px-5 py-3 text-sm font-medium outline-none text-neutral-500"
          readOnly
          onClick={() => setShowModal(true)}
          placeholder="What's on your mind?"
        />
      </div>
      <Divider className="flex justify-center items-center " />
      <div className="flex justify-between mx-8.5">
        {postTypeMapIcons.map((type) => (
          <div key={type.id} className="flex justify-center items-center">
            <div className="mt-3 mb-3 flex justify-center items-center py-3 rounded-7xl border-1 border-neutral-200 bg-neutral-200 w-8 h-8">
              {type.icon}
            </div>
            <div className="mr-10 ml-3">{type.label}</div>
            {type.divider}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CreatePostCard;
