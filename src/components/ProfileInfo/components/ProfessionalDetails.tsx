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

  const onHoverStyles = useMemo(
    () => clsx({ 'mb-8': true }, { 'shadow-xl': isHovered && canEdit }),
    [isHovered],
  );

  const schema = yup.object({
    timeZone: yup.object(),
  });

  const { control, handleSubmit, getValues } = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const timestamp = professionalDetails?.createdAt;

  const formattedTime = moment
    .utc(timestamp)
    .tz('America/New_York')
    .format('(UTC-05:00) z');

  const formattedDate = moment(timestamp).format('Do MMMM YYYY');

  return (
    <div {...eventHandlers}>
      <Card className={onHoverStyles}>
        <Header
          title="Professinal Details"
          isHovered={isHovered}
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          canEdit={canEdit}
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
                <div className="text-neutral-900 text-base font-medium ">
                  Joined on {formattedDate}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-neutral-500 text-sm font-bold">Timezone</div>
              {isEditable ? (
                <SelectTimeZone control={control} />
              ) : (
                <div className="flex space-x-3">
                  <IconWrapper type={Type.Square}>
                    <Icon name="clock" size={16} />
                  </IconWrapper>
                  <div className="text-neutral-900 text-base font-medium ">
                    {formattedTime}
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfessionalDetails;
