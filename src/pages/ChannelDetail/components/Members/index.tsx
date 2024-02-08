import Avatar from 'components/Avatar';
import Button from 'components/Button';
import Card from 'components/Card';
import EntitySearchModal, {
  EntitySearchModalType,
} from 'components/EntitySearchModal';
import FilterMenu from 'components/FilterMenu';
import Layout, { FieldType } from 'components/Form';
import Icon from 'components/Icon';
import InfiniteSearch from 'components/InfiniteSearch';
import useModal from 'hooks/useModal';
// import useURLParams from 'hooks/useURLParams';
import { userData } from 'mocks/Channels';
import PeopleCard from 'pages/Users/components/People/PeopleCard';
import UsersSkeleton from 'pages/Users/components/Skeletons/UsersSkeleton';
import { useForm } from 'react-hook-form';
// import useURLParams from 'hooks/useURLParams';
import { useTranslation } from 'react-i18next';
// import { useAppliedFiltersStore } from 'stores/appliedFiltersStore';
import { getFullName, getProfileImage } from 'utils/misc';
import { Size as InputSize } from 'components/Input';
import { useRef } from 'react';
import { UserRole } from 'queries/users';

const Members = () => {
  const { t } = useTranslation('channels');
  // const { setFilters } = useAppliedFiltersStore();
  // const { searchParams } = useURLParams();
  const filterForm = useForm<{
    search: string;
  }>({
    mode: 'onChange',
    defaultValues: { search: '' },
  });
  const { control } = useForm<{
    search: string;
  }>({
    mode: 'onChange',
    defaultValues: { search: '' },
  }); // need fix
  const [showAddMemberModal, openAddMemberModal, closeAddMemberModal] =
    useModal(false);

  const quickFilters = [
    {
      title: 'All members',
      options: [
        { label: 'All members', value: 'all', id: 0 },
        { label: 'All requests', value: 'all-requests', id: 1 },
      ],
      searchName: 'search',
      optionsName: 'departments',
      control: filterForm.control,
      onApply: () => {},
      onreset: () => {},
    },
    {
      title: 'Department',
      options: [{ label: 'All members', value: 'all', id: 0 }],
      searchName: 'search',
      optionsName: 'departments',
      control: filterForm.control,
      onApply: () => {},
      onreset: () => {},
    },
    {
      title: 'Location',
      options: [{ label: 'All members', value: 'all', id: 0 }],
      searchName: 'search',
      optionsName: 'departments',
      control: filterForm.control,
      onApply: () => {},
      onreset: () => {},
    },
  ];
  const roleSelectRef = useRef();
  const memberRoleFields = [
    {
      type: FieldType.SingleSelect,
      control,
      height: 36,
      name: 'role',
      placeholder: 'Role',
      size: InputSize.Small,
      dataTestId: 'filterby-role',
      selectClassName: 'single-select-bold',
      ref: roleSelectRef,
      showSearch: false,
      options: [
        {
          value: UserRole.Admin,
          label: 'Admin',
          dataTestId: 'filterby-role-admin',
        },
        {
          value: UserRole.Member,
          label: 'Member',
          dataTestId: 'filterby-role-member',
        },
      ],
    },
  ];
  return (
    <>
      <Card className="p-8 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-neutral-900">
            {t('members.title')}
          </p>
          <Button
            label={t('members.addMemberCTA')}
            leftIcon="add"
            leftIconClassName="text-white pointer-events-none group-hover:text-white"
            onClick={() => openAddMemberModal()}
          />
          {/* // its entitymodal for channel members */}
        </div>
        <FilterMenu filterForm={filterForm}>
          <div className="flex items-center gap-2">
            <div className="text-neutral-500">
              Showing 10 results
              {/*  {!isLoading && data?.pages[0]?.data?.result?.totalCount}{' '} */}
            </div>
            {quickFilters?.map((quickFilters) => {
              return (
                <InfiniteSearch
                  key={quickFilters.title}
                  title={quickFilters.title}
                  options={quickFilters?.options?.map(
                    (option) =>
                      ({
                        label: option.label,
                        value: option.value,
                        id: option.id,
                      } as any),
                  )}
                  searchName={quickFilters.searchName}
                  optionsName={quickFilters.optionsName}
                  control={quickFilters.control}
                />
              );
            })}
          </div>
        </FilterMenu>
        <div className="grid grid-cols-3 gap-6 justify-items-center lg:grid-cols-3 1.5lg:grid-cols-4 1.5xl:grid-cols-5 2xl:grid-cols-5">
          {!true
            ? [...Array(10)].map((element) => (
                <div key={element}>
                  <UsersSkeleton />
                </div>
              ))
            : null}
          {userData.map((user) => (
            <PeopleCard key={user.id} userData={user} />
          ))}
        </div>
      </Card>
      {showAddMemberModal && (
        <EntitySearchModal
          open={showAddMemberModal}
          openModal={openAddMemberModal}
          closeModal={closeAddMemberModal}
          entityType={EntitySearchModalType.Channel}
          dataTestId="add-members"
          // usersQueryParams={{ entityType: 'Member', entityId: id }}
          entityRenderer={(data: any) => {
            return (
              <div className="flex space-x-4 w-full">
                <Avatar
                  name={getFullName(data) || 'U'}
                  size={32}
                  image={getProfileImage(data)}
                  dataTestId="member-profile-pic"
                />
                <div className="flex space-x-6 w-full">
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center">
                      <div
                        className="text-sm font-bold text-neutral-900 whitespace-nowrap line-clamp-1"
                        data-testid="member-name"
                      >
                        {getFullName(data)}
                      </div>
                      <Layout fields={memberRoleFields} />
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="text-xs font-normal text-neutral-500"
                        data-testid="member-email"
                      >
                        {data?.primaryEmail}
                      </div>
                      {data?.department && data?.workLocation?.name && (
                        <div className="w-1 h-1 bg-neutral-500 rounded-full" />
                      )}
                      {data?.department?.name && (
                        <div className="flex space-x-1 items-start">
                          <Icon name="briefcase" size={16} />
                          <div
                            className="text-xs  font-normal text-neutral-500"
                            data-testid="member-department"
                          >
                            {data?.department.name?.substring(0, 22)}
                          </div>
                        </div>
                      )}

                      {data?.isPresent && (
                        <div className="text-xs font-semibold text-neutral-500">
                          Already a member
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
          onSubmit={() => {}}
          disableKey="isPresent"
          title="Add  members @DummyChannel"
          submitButtonText="Enroll members"
          onCancel={closeAddMemberModal}
          cancelButtonText="Cancel"
        />
      )}
    </>
  );
};

export default Members;
