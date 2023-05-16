import Card from 'components/Card';
import Divider from 'components/Divider';
import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import useHover from 'hooks/useHover';
import Icon from 'components/Icon';
import moment from 'moment';
import IconWrapper, { Type } from 'components/Icon/components/IconWrapper';
import Header from './Header';
import Layout, { FieldType } from 'components/Form';
import { useForm } from 'react-hook-form';

export interface IPersonalDetailsProps {
  personalDetails: any;
  skills: string[];
  canEdit?: boolean;
}

const PersonalDetails: React.FC<IPersonalDetailsProps> = ({
  personalDetails,
  skills,
  canEdit,
}) => {
  const [isHovered, eventHandlers] = useHover();
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const { control } = useForm({
    mode: 'onChange',
  });

  const onHoverStyles = useMemo(
    () => clsx({ 'mb-8': true }, { 'shadow-xl': isHovered && canEdit }),
    [isHovered],
  );

  const fields = [
    {
      type: FieldType.DatePicker,
      name: 'date',
      control,
      dataTestId: '',
      defaultValue: '08/08/2001',
    },
    {
      type: FieldType.SingleSelect,
      name: 'gender',
      placeholder: 'Select Gender',
      label: 'Gender',
      defaultValue: '',
      dataTestId: '',
      options: [
        { id: '1', label: 'Male' },
        { id: '2', label: 'Female' },
      ],
      control,
    },
    {
      type: FieldType.Input,
      name: 'address',
      placeholder: 'Ex - Flat no, line Address',
      label: 'Permanent Address',
      defaultValue: '',
      dataTestId: '',
      control,
    },
    {
      type: FieldType.SingleSelect,
      name: 'marital status',
      placeholder: '',
      label: 'Marital Status',
      defaultValue: '',
      dataTestId: '',
      options: [
        { id: '1', label: 'Married' },
        { id: '2', label: 'Unmarried' },
        { id: '2', label: 'Single' },
      ],
      control,
    },
    {
      type: FieldType.Input,
      name: 'skills',
      placeholder: 'Search for Skills',
      label: 'Skills',
      defaultValue: '',
      dataTestId: '',
      control,
    },
  ];

  return (
    <div {...eventHandlers}>
      <Card className={onHoverStyles}>
        <Header
          title="Personal Details"
          isHovered={isHovered}
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          canEdit={canEdit}
        />
        <Divider />
        <div className="p-6">
          <div className="pb-4 space-y-3">
            {!isEditable ? (
              <>
                <div className="flex space-x-3">
                  <IconWrapper type={Type.Square} className="cursor-pointer">
                    <Icon name="cake" size={16} />
                  </IconWrapper>
                  <div className="text-neutral-900 text-base font-medium">
                    Born on{' '}
                    {moment(personalDetails?.createdAt).format('Do MMMM')}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <IconWrapper type={Type.Square} className="cursor-pointer">
                    <Icon name="femaleIcon" size={16} />
                  </IconWrapper>
                  <div className="text-neutral-900 text-base font-medium">
                    {personalDetails?.personal?.gender || 'N/A'}
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="text-neutral-500 text-sm font-bold">
                    Permanent Address
                  </div>
                  <div className="flex space-x-3">
                    <IconWrapper type={Type.Square} className="cursor-pointer">
                      <Icon name="location" size={16} />
                    </IconWrapper>
                    <div className="text-neutral-900 text-base font-medium">
                      {personalDetails?.personal?.permanentAddress || 'N/A'}
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="text-neutral-500 text-sm font-bold">
                    Marital Status
                  </div>
                  <div className="flex space-x-3">
                    <IconWrapper type={Type.Square} className="cursor-pointer">
                      <Icon name="marriedIcon" size={16} />
                    </IconWrapper>
                    <div className="text-neutral-900 text-base font-medium">
                      {personalDetails?.personal?.maritalStatus || 'N/A'}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-neutral-500 text-sm font-bold">
                    Skills
                  </div>
                  <div className="text-neutral-900 text-base font-medium">
                    {skills.map((skill, index) => (
                      <ul key={index}>
                        <li>{skill}</li>
                      </ul>
                    )) || 'N/A'}
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="text-neutral-900 text-sm font-bold">
                  Date of Birth
                </div>
                <Layout fields={fields} />
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PersonalDetails;
