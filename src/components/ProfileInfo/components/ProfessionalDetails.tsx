import Card from 'components/Card';
import Divider from 'components/Divider';
import React, { useMemo, useState } from 'react';
import useHover from 'hooks/useHover';
import clsx from 'clsx';
import Icon from 'components/Icon';
import moment from 'moment';
import * as yup from 'yup';
import 'moment-timezone';
import IconWrapper, { Type } from 'components/Icon/components/IconWrapper';
import Header from './Header';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import SelectTimeZone from 'components/UserOnboard/components/SelectTimeZone';
import { OptionType } from 'components/UserOnboard/components/SelectTimezoneScreen';
import { useMutation } from '@tanstack/react-query';
import { updateCurrentUser } from 'queries/users';
import { getDefaultTimezoneOption } from 'components/UserOnboard/utils';
import queryClient from 'utils/queryClient';
import Layout, { FieldType } from 'components/Form';

interface IForm {
  timeZone: OptionType;
}
export interface IProfessionalDetailsProps {
  professionalDetails: any;
  canEdit?: boolean;
}

const ProfessionalDetails: React.FC<IProfessionalDetailsProps> = ({
  professionalDetails,
  canEdit,
}) => {
  const [isHovered, eventHandlers] = useHover();
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const defaultTimezone = getDefaultTimezoneOption();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const schema = yup.object({
    timeZone: yup.object(),
  });

  // professional handlesubmit only
  const { handleSubmit, control, getValues } = useForm<any>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const onHoverStyles = useMemo(
    () => clsx({ 'mb-8': true }, { 'shadow-xl': isHovered && canEdit }),
    [isHovered],
  );

  const updateUserTimezoneMutation = useMutation({
    mutationFn: updateCurrentUser,
    mutationKey: ['update-user-timeZone-mutation'],
    onError: (error: any) => {
      console.log('Error while updating timezone: ', error);
    },
    onSuccess: (response: any) => {
      console.log('Updated timezone successfully', response);
      setIsEditable(false);
    },
  });

  const onSelectOptionItemHandler = (item: any) => {
    setSelectedValues([...selectedValues, item]);
  };

  const skillField = [
    {
      name: 'skills',
      type: FieldType.Input,
      label: 'Skills',
      control,
      placeholder: 'Select skills',
      onEnter: (event: any) => {
        if (event?.key === 'Enter') {
          event.preventDefault();
          setSelectedValues([...selectedValues, event?.target?.value]);
        }
      },
    },
  ];

  const onSubmit = async () => {
    const selectedTimezone = getValues();
    let timezoneValue;
    if (selectedTimezone.timeZone === undefined) {
      timezoneValue = defaultTimezone.value[0];
    } else {
      timezoneValue = selectedTimezone.timeZone.value[0];
    }
    await updateUserTimezoneMutation.mutateAsync({
      timeZone: timezoneValue,
    });
    await queryClient.invalidateQueries(['current-user-me']);
    setIsEditable(false);
  };

  return (
    <div {...eventHandlers}>
      <Card className={onHoverStyles}>
        <Header
          title="Professinal Details"
          dataTestId="professional-details"
          isHovered={isHovered}
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          canEdit={canEdit}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          isLoading={updateUserTimezoneMutation.isLoading}
        />
        <Divider />
        <form>
          <div className="py-6 space-y-6 px-6">
            <div className="space-y-2">
              <div className="text-neutral-500 text-sm font-bold">
                Date of Joining
              </div>
              <div className="flex space-x-3">
                <IconWrapper type={Type.Square}>
                  <Icon name="clock" size={16} />
                </IconWrapper>
                <div
                  className="text-neutral-900 text-base font-medium"
                  data-testid="professional-details-joining-date"
                >
                  Joined on{' '}
                  {moment(professionalDetails?.createdAt).format(
                    'Do MMMM YYYY',
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-neutral-500 text-sm font-bold">Timezone</div>
              {isEditable ? (
                <SelectTimeZone
                  control={control}
                  defaultTimezone={{
                    value: professionalDetails?.timeZone,
                    label: professionalDetails?.timeZone,
                  }}
                  dataTestId="professional-details-timezone"
                />
              ) : (
                <div className="flex space-x-3">
                  <IconWrapper type={Type.Square}>
                    <Icon name="clock" size={16} />
                  </IconWrapper>
                  <div className="text-neutral-900 text-base font-medium ">
                    {professionalDetails?.timeZone}
                  </div>
                </div>
              )}
              <div>
                <Layout fields={skillField} />
                <ul className="mt-3 space-y-1">
                  {selectedValues.map((value) => (
                    <div
                      key={value}
                      className="bg-red-50 border border-solid border-neutral-200 rounded-17xl py-2 px-4"
                    >
                      <li className="flex items-center">
                        <span className="mr-2">{value}</span>
                        <button
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                          onClick={() => {
                            const updatedValues = selectedValues.filter(
                              (selectedValue) => selectedValue !== value,
                            );
                            setSelectedValues(updatedValues);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-8.414l2.707-2.707a1 1 0 10-1.414-1.414L10 8.586 7.707 6.293a1 1 0 10-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfessionalDetails;
