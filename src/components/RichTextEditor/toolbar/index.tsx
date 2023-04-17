import React from 'react';
import { mention } from '../config';

import Emoticon from 'images/EmotIcon.svg';

export const formats = ['bold', 'italic', 'underline', 'mention', 'link'];

export const modules = {
  toolbar: {
    container: '#toolbar',
  },
  mention: mention,
  autoLinks: true,
};

const Toolbar = () => {
  return (
    <div id="toolbar">
      {/* Controls - pending work on style */}
      <div className="flex justify-between items-center h-56">
        <div className="">
          <span className="ql-formats">
            <button className="ql-bold"></button>
            <button className="ql-italic">
              <span></span>
            </button>
            <button className="ql-underline">
              <span></span>
            </button>

            <button className="ql-emoji">
              <span>
                <img src={Emoticon} alt="emoji" />
              </span>
            </button>
          </span>
        </div>
        {/* Add hashtags button */}
        <div className="font-bold text-sm font-['manrope']">
          <div>Add Hashtags</div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
