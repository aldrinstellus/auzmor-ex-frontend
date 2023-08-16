import React, { useEffect, ReactNode } from 'react';
import { useDebounce } from 'hooks/useDebounce';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { isFiltersEmpty } from 'utils/misc';
import find from 'lodash/find';
import Layout, { FieldType } from 'components/Form';
import { Size as InputSize, Variant as InputVariant } from 'components/Input';
import ItemSkeleton from './components/Skeletons/ItemSkeleton';
import PageLoader from 'components/PageLoader';

type ApiCallFunction = (queryParams: any) => any;

interface IInfiniteFilterListProps {
  setSelectedItems: (param: any) => void;
  selectedItems: Array<any>;
  renderItem: (param: any) => ReactNode;
  itemStyles?: string;
  listStyles?: string;
  apiCall: ApiCallFunction; // Add API call function prop
  apiCallParams: any; // Parameters for the API call
  searchProps?: any; // Props for the input field
  noResultsMessage?: string; // Custom no results message
}

const InfiniteFilterList: React.FC<IInfiniteFilterListProps> = ({
  setSelectedItems,
  selectedItems,
  renderItem,
  itemStyles,
  listStyles,
  apiCall,
  apiCallParams,
  searchProps,
  noResultsMessage = 'No Category found', // Default no results message
}) => {
  const { control, watch } = useForm({
    mode: 'onChange',
  });
  const searchValue = watch('search');
  const debouncedSearchValue = useDebounce(searchValue || '', 500);
  const { ref, inView } = useInView();

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    apiCall(
      isFiltersEmpty({
        q: debouncedSearchValue.toLowerCase().trim(),
        ...apiCallParams,
      }),
    );

  const flattenData = data?.pages.flatMap((page: any) => {
    return page?.data?.result?.data.map((item: any) => {
      try {
        return item;
      } catch (e) {
        console.log('Error', { item });
      }
    });
  });
  const onSelectItem = (item: any) => {
    if (find(selectedItems, item)) {
      setSelectedItems((prevItems: any) =>
        prevItems.filter((_item: any) => _item.id !== item.id),
      );
    } else {
      setSelectedItems((prevItems: any) => [...prevItems, item]);
    }
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  console.log(listStyles);

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
            ...searchProps,
          },
        ]}
      />
      <div
        className={`mt-3 max-h-[300px] min-h-[300px] overflow-y-auto ${listStyles}`}
      >
        {(() => {
          if (isLoading) {
            return (
              <>
                {[...Array(10)].map((element) => (
                  <div
                    key={element}
                    className={`px-6 py-3 border-b-1 border-b-bg-neutral-200 flex items-center ${itemStyles}`}
                  >
                    <ItemSkeleton />
                  </div>
                ))}
              </>
            );
          }
          if (flattenData && flattenData.length > 0) {
            return (
              <ul>
                {flattenData.map((item: any) => (
                  <li
                    key={item.id}
                    className={`px-6 py-3 border-b-1 border-b-bg-neutral-200 flex items-center ${itemStyles}`}
                    onClick={() => onSelectItem(item)}
                  >
                    {renderItem(item)}
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
              flattenData?.length === 0 ? (
                <div className="flex items-center w-full text-lg font-bold">
                  {noResultsMessage}
                </div>
              ) : (
                <div className="py-16 w-full text-lg font-bold text-center">
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

export default InfiniteFilterList;
