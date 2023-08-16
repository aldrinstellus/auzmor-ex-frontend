import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import Modal from 'components/Modal';
import Header from 'components/ModalHeader';
import Button, { Variant as ButtonVariant, Type } from 'components/Button';
import Layout, { FieldType } from 'components/Form';
import { Size as InputSize, Variant as InputVariant } from 'components/Input';
import { useForm } from 'react-hook-form';
import Popover from 'components/Popover';
import Divider from 'components/Divider';
import { CategoryType, useInfiniteCategories } from 'queries/apps';
import { isFiltersEmpty, twConfig } from 'utils/misc';
import { useDebounce } from 'hooks/useDebounce';
import find from 'lodash/find';
import { useInView } from 'react-intersection-observer';
import PageLoader from 'components/PageLoader';
import { useInfiniteTeams } from 'queries/users';
import Icon from 'components/Icon';
import FilterListSkeleton from './Skeletons/FilterListSkeleton';

export interface ITeamFilterModalProps {
  open: boolean;
  closeModal: () => void;
  setFilters: (param: any) => void;
}

const AppFilterModal: React.FC<ITeamFilterModalProps> = ({
  open,
  closeModal,
  setFilters,
}) => {
  const { handleSubmit } = useForm({
    mode: 'onChange',
  });
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [selectedTeams, setSelectedTeams] = useState<any>([]);

  const onSubmit = (value: any) => {
    closeModal();
    setFilters({
      categories: selectedCategories.map((category: any) => category.id),
      teams: selectedTeams.map((team: any) => team.id),
    });
  };

  const CategoryComponent = () => {
    const { control, watch } = useForm({
      mode: 'onChange',
    });
    const searchValue = watch('search');
    const debouncedSearchValue = useDebounce(searchValue || '', 500);
    const { ref, inView } = useInView();

    const {
      data,
      isLoading,
      isError,
      isFetchingNextPage,
      fetchNextPage,
      hasNextPage,
    } = useInfiniteCategories(
      isFiltersEmpty({
        q: debouncedSearchValue.toLowerCase().trim(),
        type: CategoryType.APP,
        limit: 10,
      }),
    );

    const categoriesData = data?.pages.flatMap((page) => {
      return page?.data?.result?.data.map((category: any) => {
        try {
          return category;
        } catch (e) {
          console.log('Error', { category });
        }
      });
    });
    const onCategorySelect = (category: any) => {
      if (find(selectedCategories, category)) {
        setSelectedCategories((prevCategories: any) =>
          prevCategories.filter(
            (_category: any) => _category.id !== category.id,
          ),
        );
      } else {
        setSelectedCategories((prevCategories: any) => [
          ...prevCategories,
          category,
        ]);
      }
    };

    useEffect(() => {
      if (inView) {
        fetchNextPage();
      }
    }, [inView]);

    return (
      <>
        <Layout
          fields={[
            {
              type: FieldType.Input,
              variant: InputVariant.Text,
              size: InputSize.Small,
              leftIcon: 'search',
              control,
              name: 'search',
              placeholder: 'Search Category',
              dataTestId: 'teams-category-search',
              isClearable: true,
            },
          ]}
        />
        <div className="mt-3 max-h-[300px] min-h-[300px] overflow-y-auto">
          {(() => {
            if (isLoading) {
              return (
                <>
                  {[...Array(10)].map((element) => (
                    <div
                      key={element}
                      className="px-6 py-3 border-b-1 border-b-bg-neutral-200 flex items-center"
                    >
                      <FilterListSkeleton />
                    </div>
                  ))}
                </>
              );
            }
            if (categoriesData && categoriesData.length > 0) {
              return (
                <ul>
                  {categoriesData.map((category) => (
                    <li
                      key={category.id}
                      className="px-6 py-3 border-b-1 border-b-bg-neutral-200 flex items-center"
                      onClick={() => onCategorySelect(category)}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded-xl flex-shrink-0 cursor-pointer accent-primary-600"
                        checked={find(selectedCategories, category)}
                      ></input>
                      <span className="ml-3 text-xs font-medium">
                        {category?.name}
                      </span>
                    </li>
                  ))}
                  <div className="h-12 w-12">
                    {hasNextPage && !isFetchingNextPage && <div ref={ref} />}
                  </div>
                  {isFetchingNextPage && <PageLoader />}
                </ul>
              );
            }
            return (
              <>
                {(debouncedSearchValue === undefined ||
                  debouncedSearchValue === '') &&
                categoriesData?.length === 0 ? (
                  <div
                    className="flex items-center w-full text-lg font-bold"
                    data-testid="no-category-found"
                  >
                    No Category found
                  </div>
                ) : (
                  <div
                    className="py-16 w-full text-lg font-bold text-center"
                    data-testid="apps-noresult-found"
                  >
                    No result found for &apos;{searchValue}&apos;
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </>
    );
  };

  const TeamComponent = () => {
    const { control, watch } = useForm({
      mode: 'onChange',
    });
    const searchValue = watch('search');
    const debouncedSearchValue = useDebounce(searchValue || '', 500);
    const { ref, inView } = useInView();

    const {
      data,
      isLoading,
      isError,
      isFetchingNextPage,
      fetchNextPage,
      hasNextPage,
    } = useInfiniteTeams(
      isFiltersEmpty({
        q: debouncedSearchValue.toLowerCase().trim(),
        limit: 10,
      }),
    );

    const teamsData = data?.pages.flatMap((page) => {
      return page?.data?.result?.data.map((team: any) => {
        try {
          return team;
        } catch (e) {
          console.log('Error', { team });
        }
      });
    });
    const onTeamSelect = (team: any) => {
      if (find(selectedTeams, team)) {
        setSelectedTeams((prevTeams: any) =>
          prevTeams.filter((_team: any) => _team.id !== team.id),
        );
      } else {
        setSelectedTeams((prevTeams: any) => [...prevTeams, team]);
      }
    };

    useEffect(() => {
      if (inView) {
        fetchNextPage();
      }
    }, [inView]);

    return (
      <>
        <Layout
          fields={[
            {
              type: FieldType.Input,
              variant: InputVariant.Text,
              size: InputSize.Small,
              leftIcon: 'search',
              control,
              name: 'search',
              placeholder: 'Search Team',
              dataTestId: 'teams-search',
              isClearable: true,
            },
          ]}
        />
        <div className="mt-3 max-h-[300px] min-h-[300px] overflow-y-auto">
          {(() => {
            if (isLoading) {
              return (
                <>
                  {[...Array(10)].map((element) => (
                    <div
                      key={element}
                      className="px-6 py-3 border-b-1 border-b-bg-neutral-200 flex items-center"
                    >
                      <FilterListSkeleton />
                    </div>
                  ))}
                </>
              );
            }
            if (teamsData && teamsData.length > 0) {
              return (
                <ul>
                  {teamsData.map((team) => (
                    <li
                      key={team.id}
                      className="px-6 py-3 border-b-1 border-b-bg-neutral-200 flex items-center"
                      onClick={() => onTeamSelect(team)}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded-xl flex-shrink-0 cursor-pointer accent-primary-600 border-2 border-b-bg-neutral-200"
                        checked={find(selectedTeams, team)}
                      ></input>
                      <div className="ml-3 w-full text-xs flex justify-between items-center">
                        <div>
                          <span className="font-bold text-sm">
                            {team?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-500">
                          <div>{team.category?.name}</div>
                          <div className="bg-neutral-500 rounded-full w-1 h-1" />
                          <div className="flex items-center justify-center space-x-1">
                            <Icon name="profileUserOutline" size={16} />
                            <div
                              className="text-xs font-normal"
                              data-testid={`team-no-of-members-${team.totalMembers}`}
                            >
                              {team.totalMembers} members
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                  <div className="h-12 w-12">
                    {hasNextPage && !isFetchingNextPage && <div ref={ref} />}
                  </div>
                  {isFetchingNextPage && <PageLoader />}
                </ul>
              );
            }
            return (
              <>
                {(debouncedSearchValue === undefined ||
                  debouncedSearchValue === '') &&
                teamsData?.length === 0 ? (
                  <div
                    className="flex items-center w-full text-lg font-bold"
                    data-testid="no-category-found"
                  >
                    No Team found
                  </div>
                ) : (
                  <div
                    className="py-16 w-full text-lg font-bold text-center"
                    data-testid="apps-noresult-found"
                  >
                    No result found for &apos;{searchValue}&apos;
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </>
    );
  };

  const filterNavigation = [
    {
      label: 'Categories',
      icon: '',
      key: 'category-filters',
      component: <CategoryComponent />,
      disabled: false,
      hidden: false,
      search: true,
      dataTestId: 'app-filterby-category',
    },
    {
      label: 'Team',
      icon: '',
      key: 'team-filters',
      component: <TeamComponent />,
      disabled: false,
      hidden: false,
      search: true,
      dataTestId: 'app-filterby-team',
    },
  ];

  const [activeFilter, setActiveFilter] = useState(filterNavigation[0]);

  return (
    <div>
      <Modal open={open} closeModal={close} className="max-w-[665px]">
        <Header
          title="Filter By"
          onClose={() => closeModal()}
          closeBtnDataTestId="close-filters"
        />
        <div className="flex w-full">
          <div className="flex flex-col w-1/3 pb-64 border-r-2 border-r-neutral-200">
            {filterNavigation.map((item, index) => (
              <div
                key={item.key}
                onClick={() => setActiveFilter(item)}
                data-testid={item?.dataTestId}
                className="cursor-pointer border-b-1 border-b-bg-neutral-200"
              >
                <div
                  className={`${
                    activeFilter.key === item.key &&
                    'text-primary-500 bg-primary-50'
                  } text-sm font-medium p-4`}
                >
                  {item.label}
                </div>
                {index !== filterNavigation.length - 1 && <Divider />}
              </div>
            ))}
          </div>
          <div className="w-2/3 py-4 px-2">{activeFilter.component}</div>
        </div>
        <div className="flex justify-end items-center h-16 p-6 bg-blue-50 rounded-b-9xl">
          <Button
            label="Clear Filters"
            variant={ButtonVariant.Secondary}
            onClick={() => {
              setSelectedCategories([]);
              setSelectedTeams([]);
              setFilters({ categories: [], teams: [] });
              closeModal();
            }}
            className="mr-4"
            dataTestId="clear-filters"
          />
          <Button
            label="Apply"
            variant={ButtonVariant.Primary}
            type={Type.Submit}
            onClick={handleSubmit(onSubmit)}
            className="mr-4"
            dataTestId="apply-filter"
          />
        </div>
      </Modal>
    </div>
  );
};

export default AppFilterModal;
