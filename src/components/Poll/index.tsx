import IconButton, { Size, Variant } from 'components/IconButton';
import React, { useEffect, useState } from 'react';
import './styles.css';

type PollOption = {
  id: string;
  text: string;
  votes: number;
};

type PollProps = {
  question: string;
  closedAt: string;
  total: number;
  myVote: string;
  options: PollOption[];
};

// question = 'Sample question lorem ipsum dolor simet?',
//   closedAt = '2023-08-08',
//   total = 10,
//   myVote = 'abc',
// options = [
//   { id: 'abc', text: 'abcdef', votes: 2 },
//   { id: 'def', text: 'defghi', votes: 3 },
//   { id: 'ghi', text: 'ghijkl', votes: 4 },
//   { id: 'jkl', text: 'jklmno', votes: 1 },
// ],

const Poll: React.FC = () => {
  const options = [
    { id: 'abc', text: 'abcdef', votes: 8 },
    { id: 'def', text: 'defghi', votes: 3 },
    { id: 'ghi', text: 'ghijkl', votes: 4 },
    { id: 'jkl', text: 'jklmno', votes: 1 },
  ];

  const [userVoted, setUserVoted] = useState<boolean>(false);

  useEffect(() => {
    if (userVoted) {
      setTimeout(() => {
        options.forEach((option) => {
          const element = document.getElementById(option.id);
          const widthPercent = (option.votes / 10) * 100;
          element?.animate(
            {
              width: ['0%', `${widthPercent}%`],
              easing: ['ease-out', 'ease-out'],
            },
            500,
          );
          element?.setAttribute('style', `width: ${widthPercent}%`);
        });
      }, 3000);
    }
  }, [options, userVoted]);

  return (
    <div className="bg-neutral-100 py-4 px-8 rounded-9xl w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-neutral-900 font-bold">
          Sample question lorem ipsum dolor simet?
        </p>
        <div className="flex gap-x-2">
          <IconButton
            icon="edit"
            variant={Variant.Secondary}
            size={Size.Medium}
            borderAround
            stroke="#000"
            className="bg-white rounded-7xl"
            borderAroundClassName="rounded-7xl"
          />
          <IconButton
            icon="close"
            variant={Variant.Secondary}
            size={Size.Medium}
            borderAround
            stroke="#000"
            className="bg-white rounded-7xl"
            borderAroundClassName="rounded-7xl"
          />
        </div>
      </div>
      {/* Options */}
      <div className="py-4">
        {options.map((option) => (
          <div
            className="grid py-2 cursor-pointer"
            key={option.id}
            onClick={() => setUserVoted(true)}
          >
            {/* The white background that contains the option */}
            <div className="grid-area w-full cursor-pointer bg-white rounded-19xl" />
            {/* The progress bar that fills up the background */}
            <div
              className={`grid-area w-0 ${
                option.id === 'ghi' ? 'bg-emerald-600' : 'bg-green-100'
              } rounded-19xl`}
              id={option.id}
            />
            {/* The option itself */}
            <div className="grid-area flex items-center justify-center w-full px-5 py-3 text-neutral-900 font-medium">
              {option.text}
            </div>
          </div>
        ))}
      </div>
      {/* Time left */}
      <div>
        <p className="text-orange-500 font-bold">2 weeks left</p>
      </div>
    </div>
  );
};

export default Poll;
