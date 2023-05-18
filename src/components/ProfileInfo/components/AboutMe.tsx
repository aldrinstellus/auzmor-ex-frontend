import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import Card from 'components/Card';
import Divider from 'components/Divider';
import TextArea from 'components/TextArea';
import useHover from 'hooks/useHover';
import Header from './Header';
import { useForm } from 'react-hook-form';

export interface IUpdateAboutMe {
  messageText: string;
}
export interface IAboutMeProps {
  aboutMe: any;
  canEdit?: boolean;
}

const AboutMe: React.FC<IAboutMeProps> = ({ aboutMe, canEdit }) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isHovered, eventHandlers] = useHover();
  const { control, handleSubmit } = useForm<IUpdateAboutMe>({
    mode: 'onSubmit',
  });
  const onHoverStyles = useMemo(
    () => clsx({ 'mb-8': true }, { 'shadow-xl': isHovered && canEdit }),
    [isHovered],
  );

  const onSubmit = (data: any) => {
    console.log('dafdasdf', data);
  };

  return (
    <div {...eventHandlers}>
      <Card className={onHoverStyles}>
        <Header
          title="About Me"
          isHovered={isHovered}
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          canEdit={canEdit}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
        <Divider />
        <div className="text-neutral-900 text-sm font-normal pt-4 pb-6 px-6">
          {!isEditable ? (
            aboutMe?.fullName
          ) : (
            <TextArea placeholder="write here" rows={3} />
          )}
        </div>
      </Card>
    </div>
  );
};

export default AboutMe;
