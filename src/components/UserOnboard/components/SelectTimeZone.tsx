import React from 'react';
import timezones from 'utils/timezones.json';
import Layout, { FieldType } from 'components/Form';
import { getDefaultTimezoneOption } from '../utils/';

export type SelectTimeZoneProps = {
  control: any;
  className?: string;
};

const SelectTimeZone: React.FC<SelectTimeZoneProps> = ({
  control,
  className,
}) => {
  const defaultTimezone = getDefaultTimezoneOption();

  const fields = [
    {
      type: FieldType.SingleSelect,
      name: 'timeZone',
      control: control,
      options: timezones.map((timeZone) => ({
        label: timeZone.timezoneName,
        value: timeZone.iana,
      })),
      defaultValue: defaultTimezone,
      menuPlacement: 'top',
    },
  ];

  return (
    <form>
      <Layout className={className} fields={fields} />
    </form>
  );
};

export default SelectTimeZone;
