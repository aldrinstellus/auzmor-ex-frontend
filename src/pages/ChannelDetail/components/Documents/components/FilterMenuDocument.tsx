import FilterModal, { FilterModalVariant } from 'components/FilterModal';
import IconButton, {
  Variant as IconVariant,
  Size as IconSize,
} from 'components/IconButton';
import useModal from 'hooks/useModal';
import { FC, useEffect } from 'react';
import useURLParams from 'hooks/useURLParams';
import Sort from 'components/Sort';
import PopupMenu from 'components/PopupMenu';
import Layout, { FieldType } from 'components/Form';
import { useAppliedFiltersStore } from 'stores/appliedFiltersStore';
import { Control, UseFormWatch } from 'react-hook-form';
import Icon from 'components/Icon';
import { getIconFromMime } from './Doc';
import { IForm } from '..';

export enum FilterKey {
  departments = 'departments',
  locations = 'locations',
  status = 'status',
}

interface IFilterMenu {
  control: Control<IForm, any>;
  watch: UseFormWatch<IForm>;
  dataTestIdSort?: string;
  dataTestIdFilter?: string;
  view: 'LIST' | 'GRID';
  changeView: (view: 'LIST' | 'GRID') => void;
}

const FilterMenuDocument: FC<IFilterMenu> = ({
  control,
  watch,
  dataTestIdSort,
  dataTestIdFilter,
  view,
  changeView,
}) => {
  const [showFilterModal, openFilterModal, closeFilterModal] = useModal();
  const { filters, setFilters, updateFilter, clearFilters } =
    useAppliedFiltersStore();
  const { searchParams, updateParam, serializeFilter, deleteParam } =
    useURLParams();
  const docType = watch('docType');

  useEffect(() => {
    if (filters) {
      Object.keys(filters).forEach((key: string) => {
        if (!!filters[key] && filters[key].length === 0) {
          deleteParam(key);
        } else {
          if (typeof filters[key] === 'object') {
            const serializedFilters = serializeFilter(filters[key]);
            updateParam(key, serializedFilters);
          } else {
            if (filters[key] === undefined) {
              deleteParam(key);
            } else {
              updateParam(key, filters[key]);
            }
          }
        }
      });
    }
  }, [filters]);

  useEffect(() => {
    // Read valid sort options from url on mount
    const sort = searchParams.get('sort');
    const validSortValues = [
      'file_type:asc',
      'name:asc',
      'name:desc',
      'modifiedAt:asc',
      'size:desc',
    ];
    if (sort && validSortValues.includes(sort)) {
      setFilters({ ...(filters || {}), sort });
    } else {
      deleteParam('sort');
    }

    // Read valid filter options from url on mount

    return clearFilters;
  }, []);

  const menuItems = [
    {
      icon: 'list',
      label: 'List',
      onClick: () => changeView('LIST'),
    },
    {
      icon: 'grid',
      label: 'Grid',
      onClick: () => changeView('GRID'),
    },
  ];

  const sortOptions = [
    {
      icon: 'briefcase',
      label: 'File type',
      key: 'file_type:asc',
      dataTestId: 'sortBy-filetype',
    },
    {
      icon: 'sortByAcs',
      label: 'A to Z',
      key: 'name:asc',
      dataTestId: 'sortBy-asc',
    },
    {
      icon: 'sortByDesc',
      label: 'Z to A',
      key: 'name:desc',
      dataTestId: 'sortBy-desc',
    },
    {
      icon: 'calendar',
      label: 'Date modified',
      key: 'modifiedAt:asc',
      dataTestId: 'sortby-dateadded',
    },
    {
      icon: 'vuesax',
      label: 'Size',
      key: 'size:asc',
      dataTestId: 'sortBy-size',
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center h-9">
          <div>
            <Layout
              fields={[
                {
                  type: FieldType.SingleSelect,
                  name: 'docType',
                  control,
                  options: [
                    {
                      value: 'file',
                      render: () => (
                        <div className="flex gap-2 font-medium text-xs">
                          <Icon name={getIconFromMime()} size={16} /> File
                        </div>
                      ),
                    },
                    {
                      value: 'folder',
                      render: () => (
                        <div className="flex gap-2 font-medium text-xs op">
                          <Icon name="dir" size={16} /> Folder
                        </div>
                      ),
                    },
                  ],
                  suffixIcon: !!docType && <></>,
                  isClearable: !!docType,
                  clearIcon: <Icon name="close" size={16} />,
                  placeholder: 'Select',
                  showSearch: false,
                  selectClassName:
                    '[&>span.ant-select-clear]:!opacity-100 [&>span.ant-select-clear]:!w-4 [&>span.ant-select-clear]:!h-4 [&>span.ant-select-clear]:!-mt-2 [&>div.ant-select-selector]:!h-9 [&>div.ant-select-selection-placeholder]:!h-9 [&_input]:!h-9 [&_input]:!p-0 [&_span.ant-select-selection-placeholder]:!pl-0',
                },
              ]}
            />
          </div>
          <div className="flex space-x-2 justify-center items-center relative">
            <div className="flex relative">
              <PopupMenu
                triggerNode={
                  <IconButton
                    icon={view === 'GRID' ? 'grid' : 'list'}
                    variant={IconVariant.Secondary}
                    size={IconSize.Medium}
                    borderAround
                    className="bg-white !p-[10px]"
                  />
                }
                menuItems={menuItems}
                className="mt-1 top-full right-0 border-1 border-neutral-200 focus-visible:outline-none"
              />
            </div>
            <div className="relative flex">
              <IconButton
                onClick={openFilterModal}
                icon="filterLinear"
                variant={IconVariant.Secondary}
                size={IconSize.Medium}
                borderAround
                className="bg-white !p-[10px]"
                dataTestId={dataTestIdFilter}
              />
              {/* {isFilterApplied && (
                <div className="absolute w-2 h-2 rounded-full bg-red-500 top-0.5 right-0" />
              )} */}
            </div>
            <Sort
              controlled
              setFilter={(sortValue) => {
                setFilters({ sort: sortValue });
              }}
              selectedValue={filters ? filters.sort : ''}
              entity={'channel-document'}
              dataTestId={dataTestIdSort}
              sortOptions={sortOptions}
            />
          </div>
        </div>
        {filters?.sort && (
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              {filters?.sort && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500">Sort by</span>
                  <div
                    onClick={() => updateFilter('sort', undefined)}
                    className="flex items-center px-3 py-1 border border-neutral-200 rounded-7xl gap-1 cursor-pointer hover:border-primary-600 group h-8"
                  >
                    <span className="text-primary-500 font-bold group-hover:text-primary-600">
                      {
                        sortOptions.find(
                          (option) => option.key === filters?.sort,
                        )?.label
                      }
                    </span>
                    <Icon name="close" size={16} />
                  </div>
                </div>
              )}
            </div>
            <div
              className="text-neutral-500 border px-3 py-[3px] whitespace-nowrap rounded-7xl hover:text-primary-600 hover:border-primary-600 cursor-pointer"
              onClick={clearFilters}
              data-testid={`people-clear-filters`}
            >
              {'Clear all'}
            </div>
          </div>
        )}
      </div>
      {showFilterModal && (
        <FilterModal
          open={showFilterModal}
          closeModal={closeFilterModal}
          appliedFilters={{}}
          onApply={(appliedFilters) => {
            setFilters(appliedFilters);
            closeFilterModal();
          }}
          onClear={() => {
            setFilters({
              docPeopleCheckbox: [],
              docTypeCheckbox: [],
              docModifiedRadio: [],
            });
            closeFilterModal();
          }}
          variant={FilterModalVariant.Document}
        />
      )}
    </>
  );
};

export default FilterMenuDocument;
