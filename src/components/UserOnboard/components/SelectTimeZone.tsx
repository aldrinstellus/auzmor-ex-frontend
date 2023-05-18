import React from 'react';
import timezones from 'utils/timezones.json';
import Layout, { FieldType } from 'components/Form';
import { getDefaultTimezoneOption } from '../utils/';
import { useForm } from 'react-hook-form';
import { OptionType } from './SelectTimezoneScreen';

export type SelectTimeZoneProps = {
  control: any;
  className?: string;
  defaultTimezone: OptionType;
};

const SelectTimeZone: React.FC<SelectTimeZoneProps> = ({
  control,
  className,
  defaultTimezone,
}) => {
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
