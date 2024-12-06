import Layout, { FieldType } from 'components/Form';
import { FC } from 'react';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { IFilterForm } from '.';
import ItemSkeleton from './ItemSkeleton';
interface IVisibilityProps {
  control: Control<IFilterForm, any>;
  watch: UseFormWatch<IFilterForm>;
  setValue: UseFormSetValue<IFilterForm>;
}

const DocumentPeople: FC<IVisibilityProps> = ({ control }) => {
  const searchField = [
    {
      type: FieldType.Input,
      control,
      name: 'docOwnerSearch',
      placeholder: 'Search',
      isClearable: true,
      leftIcon: 'search',
      dataTestId: `doc-owner-search`,
    },
  ];

  return (
    <div className="px-2 py-4">
      <Layout fields={searchField} />
      {true ? (
        <>
          {[...Array(6)].map((_value, i) => (
            <div
              key={`${i}-document-item-skeleton`}
              className={`px-6 py-3 border-b-1 border-b-bg-neutral-200 flex items-center`}
            >
              <ItemSkeleton />
            </div>
          ))}
        </>
      ) : (
        <div className="max-h-[330px] min-h-[330px] overflow-y-auto"></div>
      )}
    </div>
  );
};

export default DocumentPeople;
