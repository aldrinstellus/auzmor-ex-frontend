import { FC } from 'react';
import Card from 'components/Card';
import clsx from 'clsx';
import 'moment-timezone';
import NameRow from './NameRow';
import DescriptionRow from './DescriptionRow';
import Header from 'components/ProfileInfo/components/Header';
import CategoryRow from './CategoryRow';

export interface IBasicSettingProps {
  channelData?: any;
  canEdit?: boolean;
  editSection?: string;
  setSearchParams?: any;
  searchParams?: any;
}

const BasicSetting: FC<IBasicSettingProps> = ({ channelData, canEdit }) => {
  const onHoverStyles = clsx({ 'mb-8': true });

  return (
    <div>
      <Header title="Basic Settings" dataTestId="channel-setting-details" />
      <Card className={onHoverStyles} shadowOnHover={canEdit}>
        <div className="px-4">
          <NameRow data={channelData} />
          <DescriptionRow channelData={channelData} />
          <CategoryRow channelData={channelData} />
        </div>
      </Card>
    </div>
  );
};

export default BasicSetting;
