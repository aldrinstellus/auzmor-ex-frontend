import Card from 'components/Card';
import { FC } from 'react';
import { IChannel } from 'stores/channelStore';
import PrivateChannelImage from 'images/png/PrivateChannelBanner.png';
import Button, { Variant } from 'components/Button';
import AvatarChips from 'components/AvatarChips';
import { useTranslation } from 'react-i18next';
import { useChannelAdmins } from 'queries/channel';
import { useNavigate } from 'react-router-dom';

interface IChannelBannerProps {
  isChannelRequest?: boolean;
  channelId?: string;
  dataTestId?: string; // Add dataTestId prop for custom test ids
}

const PrivateChannelBanner: FC<IChannelBannerProps> = ({
  channelId = '',
  isChannelRequest = true,
  dataTestId = 'channels-widget', // Initialize dataTestId with empty string as default
}) => {
  const { t } = useTranslation('channel');
  const { data: admins, isLoading } = useChannelAdmins(channelId);
  const navigate = useNavigate();
  return (
    <Card data-testid={dataTestId}>
      <div
        onClick={() => {
          navigate(`channels/${channelId}`);
        }}
        className="flex flex-col items-center justify-center p-8 "
      >
        <img
          src={PrivateChannelImage}
          alt="private channel banner"
          data-testid={`${dataTestId}-image`}
        />
        <div
          className="text-2xl font-bold mt-8 mb-4"
          data-testid={`${dataTestId}-header`}
        >
          {t('privateChannel.bannerHeader')}
        </div>
        <Button
          label={
            isChannelRequest
              ? t('privateChannel.joinRequestCTA')
              : t('privateChannel.withdrawRequestCTA')
          }
          variant={isChannelRequest ? Variant.Primary : Variant.Danger}
          onClick={() => {}} // channel send or withdraw  function to call
          data-testid={`${dataTestId}-button`}
        />
        <div
          className="text-neutral-500 mt-[80px] underline  mb-4 text-sm font-semibold"
          data-testid={`${dataTestId}-footer`}
        >
          {t('privateChannel.bannerFotter')}
        </div>
        <AvatarChips
          users={admins}
          showCount={7}
          dataTestId={`${dataTestId}-avatar-chips`}
        />
      </div>
    </Card>
  );
};

export default PrivateChannelBanner;
