import React, { useState } from 'react';
import { Card } from '@auzmorui/component-library.components.card';
import { Avatar } from '@auzmorui/component-library.components.avatar';

import { Button } from '@auzmorui/component-library.components.button';

import Media from 'images/media.svg';
import Shoutout from 'images/shoutout.svg';
import Events from 'images/events.svg';
import Polls from 'images/polls.svg';
import Modal from 'components/Modal';
import CreatePost from 'components/CreatePost';

const postTypeMapIcons = [
  {
    id: 1,
    label: 'Media',
    icon: <img src={Media} width={32} height={32} />,
  },
  {
    id: 2,
    label: 'Shoutout',
    icon: <img src={Shoutout} width={32} height={32} />,
  },
  {
    id: 3,
    label: 'Events',
    icon: <img src={Events} width={32} height={32} />,
  },
  {
    id: 4,
    label: 'Polls',
    icon: <img src={Polls} width={32} height={32} />,
  },
];

const ArtDeco = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Card className="bg-white rounded-lg">
        <div className="flex items-center px-6 pt-6 pb-3">
          <Avatar
            size={32}
            image="https://png.pngtree.com/png-clipart/20210619/ourlarge/pngtree-instagram-lady-social-media-flat-style-avatar-png-image_3483977.jpg"
            name={''}
          />
          <input
            type="input"
            className="w-135.25 h-11 border border-neutral-200 rounded-8 ml-3 px-5 py-3 text-sm font-medium outline-none"
            readOnly
            onClick={() => {
              setOpen(true);
            }}
            placeholder="What's on your mind?"
          />
        </div>
        <div className="flex justify-between mx-8.5">
          {postTypeMapIcons.map((type) => (
            <div key={type.id}>
              <div className="flex items-center py-3">
                {type.icon}
                <span className="text-neutral-500 text-xs font-normal ml-3">
                  {type.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        open={open}
        setOpen={setOpen}
        title="Create a post"
        body={<CreatePost />}
        footer={
          <div className="flex justify-between items-center h-16 p-6">
            <div className="flex">
              {postTypeMapIcons.map((type) => (
                <div className="mr-4" key={type.id}>
                  <button>{type.icon}</button>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <div></div>
              <Button
                label={'Post'}
                className="bg-primary-500 rounded-3xl text-white w-20"
                onClick={() => console.log('post')}
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ArtDeco;
