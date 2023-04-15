import React from 'react';
import { Quill } from 'react-quill';

// format object for setting the quill editor
export const formats = ['bold', 'italic', 'underline', 'strike', 'mention'];

const Toolbar = () => {
  return (
    <div id="toolbar" className="h-56 bg-white border-t-2 border-grey-500">
      <div className="flex justify-between ml-7 mr-6 my-5">
        <span className="gap-5">
          <button className="ql-bold">
            <span className="text-bold">B</span>
          </button>
          <button className="ql-italic">
            <span className="text-bold">I</span>
          </button>
          <button className="ql-underline">
            <span className="text-bold">U</span>
          </button>
          <button className="ql-emoji">
            <span>😃</span>
          </button>
        </span>
        <div>
          <button>Add Hashtags</button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
