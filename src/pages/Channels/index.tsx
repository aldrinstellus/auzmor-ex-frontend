import Button, { Variant as ButtonVariant } from 'components/Button';
import Card from 'components/Card';
import { FC, useEffect, useMemo } from 'react';
import ChannelCard from './components/ChannelCard';
import FilterMenu from 'components/FilterMenu';
import { useAppliedFiltersStore } from 'stores/appliedFiltersStore';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useInfiniteChannels } from 'queries/channel';
import { isFiltersEmpty } from 'utils/misc';
import { ChannelVisibilityEnum } from 'stores/channelStore';
import useModal from 'hooks/useModal';
import ChannelModal from './components/ChannelModal';
import {
  ChannelTypeEnum,
  IChannelType,
  channelTypeOptions,
} from 'components/FilterModal/ChannelType';

interface IChannelsProps {}

interface IFilterButton {
  label: string;
  isActive: boolean;
  onClick: () => void;
  labelClassName: string;
  className: string;
  dataTestId: string;
}

export const Channels: FC<IChannelsProps> = () => {
  const { t } = useTranslation('channels');
  const { t: tc } = useTranslation('common');
  const { filters, clearFilters, updateFilter } = useAppliedFiltersStore();
  const [isModalOpen, openModal, closeModal] = useModal();

  const filterForm = useForm<{
    search: string;
  }>({
    mode: 'onChange',
    defaultValues: { search: '' },
  });
  useEffect(() => () => clearFilters(), []);

  const { data, channels } = useInfiniteChannels(
    isFiltersEmpty({
      categoryIds: [],
      visibility: ChannelVisibilityEnum.Private,
      isStarred: !!(filters?.channelType === ChannelTypeEnum.Starred),
      isManaged: !!(filters?.channelType === ChannelTypeEnum.Managed),
      isRequested: !!(filters?.channelType === ChannelTypeEnum.Requested),
      discover: !!(
        filters?.channelType === ChannelTypeEnum.DiscoverNewChannels
      ),
    }),
    !!(filters && !!(filters.channelType === ChannelTypeEnum.MyChannels)),
  );

  const channelIds = (
    (data?.pages.flatMap((page) =>
      page.data?.result?.data.map((channel: { id: string }) => channel),
    ) as { id: string }[]) || []
  )
    ?.filter(({ id }) => !!channels[id])
    .sort(
      (a, b) =>
        new Date(channels[b.id].createdAt).getTime() -
        new Date(channels[a.id].createdAt).getTime(),
    );

  const onFilterButtonClick = (index: number) => {
    return () => {
      const option = channelTypeOptions[index];
      if (
        filters?.channelType?.find(
          (type: IChannelType) => type.id === option.data.id,
        )
      ) {
        updateFilter('channelType', [
          ...filters?.channelType.filter(
            (type: IChannelType) => type.id !== option.data.id,
          ),
        ]);
      } else {
        updateFilter('channelType', [...filters?.channelType, option.data]);
      }
    };
  };

  const filterButtons: IFilterButton[] = useMemo(
    () => [
      {
        label: t('filterCTA.myChannels'),
        isActive: filters?.channelType.find(
          (type: IChannelType) => type.id === ChannelTypeEnum.MyChannels,
        ),
        onClick: onFilterButtonClick(0),
        labelClassName: `text-sm ${
          filters?.channelType.find(
            (type: IChannelType) => type.id === ChannelTypeEnum.MyChannels,
          )
            ? 'font-bold text-primary-500'
            : 'font-normal text-neutral-500'
        }`,
        className: filters?.channelType.find(
          (type: IChannelType) => type.id === ChannelTypeEnum.MyChannels,
        )
          ? 'border-0'
          : '',
        dataTestId: 'my-channels-filter',
      },
      {
        label: t('filterCTA.managed'),
        isActive: filters?.channelType.find(
          (type: IChannelType) => type.id === ChannelTypeEnum.Managed,
        ),
        onClick: onFilterButtonClick(1),
        labelClassName: `text-sm ${
          filters?.channelType.find(
            (type: IChannelType) => type.id === ChannelTypeEnum.Managed,
          )
            ? 'font-bold text-primary-500'
            : 'font-normal text-neutral-500'
        }`,
        className: filters?.channelType.find(
          (type: IChannelType) => type.id === ChannelTypeEnum.Managed,
        )
          ? 'border-0'
          : '',
        dataTestId: 'managed',
      },
      {
        label: t('filterCTA.discoverNewChannels'),
        isActive: filters?.channelType.find(
          (type: IChannelType) =>
            type.id === ChannelTypeEnum.DiscoverNewChannels,
        ),
        onClick: onFilterButtonClick(2),
        labelClassName: `text-sm ${
          filters?.channelType.find(
            (type: IChannelType) =>
              type.id === ChannelTypeEnum.DiscoverNewChannels,
          )
            ? 'font-bold text-primary-500'
            : 'font-normal text-neutral-500'
        }`,
        className: filters?.channelType.find(
          (type: IChannelType) =>
            type.id === ChannelTypeEnum.DiscoverNewChannels,
        )
          ? 'border-0'
          : '',
        dataTestId: 'discover-new-channels-filter',
      },
      {
        label: t('filterCTA.starred'),
        isActive: filters?.channelType.find(
          (type: IChannelType) => type.id === ChannelTypeEnum.Starred,
        ),
        onClick: onFilterButtonClick(3),
        labelClassName: `text-sm ${
          filters?.channelType.find(
            (type: IChannelType) => type.id === ChannelTypeEnum.Starred,
          )
            ? 'font-bold text-primary-500'
            : 'font-normal text-neutral-500'
        }`,
        className: filters?.channelType.find(
          (type: IChannelType) => type.id === ChannelTypeEnum.Starred,
        )
          ? 'border-0'
          : '',
        dataTestId: 'starred-filter',
      },
      {
        label: t('filterCTA.requested'),
        isActive: filters?.channelType.find(
          (type: IChannelType) => type.id === ChannelTypeEnum.Requested,
        ),
        onClick: onFilterButtonClick(4),
        labelClassName: `text-sm ${
          filters?.channelType.find(
            (type: IChannelType) => type.id === ChannelTypeEnum.Requested,
          )
            ? 'font-bold text-primary-500'
            : 'font-normal text-neutral-500'
        }`,
        className: filters?.channelType.find(
          (type: IChannelType) => type.id === ChannelTypeEnum.Requested,
        )
          ? 'border-0'
          : '',
        dataTestId: 'requested-filter',
      },
    ],
    [filters],
  );

  return (
    <>
      <Card className="p-8 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-neutral-900">{t('channels')}</p>
          <Button
            label={t('createChannelCTA')}
            leftIcon="add"
            leftIconClassName="text-white pointer-events-none group-hover:text-white"
            onClick={openModal}
            dataTestId="createchannel-cta"
          />
        </div>
        <FilterMenu
          filterForm={filterForm}
          searchPlaceholder={t('searchChannels')}
          dataTestIdFilter="channel-filter-icon"
          dataTestIdSort="channel-sort-icon"
          dataTestIdSearch="channel-search"
        >
          <div className="flex gap-2 items-center">
            <p className="text-neutral-500 text-base">
              {tc('showing')} {channelIds.length} {tc('result')}
            </p>
            {filterButtons.map((filterButton) => (
              <Button
                key={filterButton.label}
                label={filterButton.label}
                variant={ButtonVariant.Secondary}
                active={filterButton.isActive}
                onClick={filterButton.onClick}
                labelClassName={filterButton.labelClassName}
                className={filterButton.className}
                dataTestId={filterButton.dataTestId}
              />
            ))}
          </div>
        </FilterMenu>
        <div className="grid grid-cols-3 gap-6 justify-items-center lg:grid-cols-3 1.5lg:grid-cols-4 1.5xl:grid-cols-5 2xl:grid-cols-5">
          {channelIds.map(({ id }) => (
            <ChannelCard
              key={id}
              channel={channels[id]}
              showJoinChannelBtn={
                filters?.type === ChannelTypeEnum.DiscoverNewChannels &&
                channels[id].channelSettings?.visibility ===
                  ChannelVisibilityEnum.Public
              }
              showRequestBtn={
                filters?.type === ChannelTypeEnum.DiscoverNewChannels &&
                channels[id].channelSettings?.visibility ===
                  ChannelVisibilityEnum.Private &&
                !!!channels[id].isRequested
              }
              showWithdrawBtn={
                filters?.type === ChannelTypeEnum.DiscoverNewChannels &&
                channels[id].channelSettings?.visibility ===
                  ChannelVisibilityEnum.Private &&
                !!channels[id].isRequested
              }
            />
          ))}
        </div>
      </Card>
      {isModalOpen && (
        <ChannelModal isOpen={isModalOpen} closeModal={closeModal} />
      )}
    </>
  );
};
