import React, { ReactElement } from 'react';
import timezones from 'utils/timezones.json';
import OnboardTimezone from 'images/onboard-timezone.png';

const SelectTimezoneScreen: React.FC = (): ReactElement => {
  // Note: The timezone selector dropdown has to be a form component here.
  // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
  return (
    <div className="flex items-center flex-col justify-between gap-y-4 px-10">
      <img src={OnboardTimezone} />
      <p className="font-bold text-neutral-900 text-2xl">
        Select your timezone
      </p>
      <p className="font-normal text-sm text-neutral-500">
        Please select your timezone from the options given below
      </p>
      <select
        name="Select your timezone"
        className="p-2 rounded-full bg-white border border-neutral-200"
        onChange={(e) => console.log(e.target.value)}
      >
        {timezones.map((timezone) => (
          <option key={timezone.text} value={timezone.abbr}>
            {timezone.text}
          </option>
        ))}
      </select>
      {/* <Dropdown/> */}
    </div>
  );
};

export default SelectTimezoneScreen;
