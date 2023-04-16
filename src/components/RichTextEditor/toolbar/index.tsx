import React from 'react';
import { mention } from '../config';

import Emoticon from 'images/EmotIcon.svg';

// format object for setting the quill editor
export const formats = ['bold', 'italic', 'underline', 'strike', 'mention'];

export const modules = {
  toolbar: {
    container: '#toolbar',
  },
  mention: mention,
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
            {/* <button className="ql-strike">
              <span>S</span>
            </button> */}
            <button className="ql-emoji">
              <span>
                <img src={Emoticon} alt="emoji" />
              </span>
            </button>
            {/* <button className="ql-link">
              <span>L</span>
            </button> */}
            {/* <button className="ql-image" /> */}
            {/* <button className="ql-video" /> */}
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
