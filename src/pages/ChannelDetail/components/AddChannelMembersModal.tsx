import Modal from 'components/Modal';
import Header from 'components/ModalHeader';
import { FC, ReactNode, useEffect } from 'react';
import EntitySearchModalBody from 'components/EntitySearchModal/components/EntitySearchModalBody';
import { useForm } from 'react-hook-form';
import { useEntitySearchFormStore } from 'stores/entitySearchFormStore';
import { EntitySearchModalType } from 'components/EntitySearchModal';
import Avatar from 'components/Avatar';
import { getFullName, getProfileImage } from 'utils/misc';
import Icon from 'components/Icon';
import Button, { Variant as ButtonVariant } from 'components/Button';

interface IAddChannelMembersModalProps {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
  onBackPress?: () => void;
  title?: string | ReactNode;
  dataTestId: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  selectedMemberIds?: string[];
  onSubmit?: (data: IAudienceForm) => void;
  onCancel?: () => void;
}

export interface IAudienceForm {
  memberSearch: string;
  teamSearch: string;
  departmentSearch: string;
  departments: Record<string, boolean | undefined>;
  locationSearch: string;
  locations: Record<string, boolean | undefined>;
  designationSearch: string;
  designations: Record<string, boolean | undefined>;
  selectAll: boolean;
  showSelectedMembers: boolean;
  categorySearch: string;
  categories: Record<string, boolean | undefined>;
  teams: any;
  users: any;
}

const AddChannelMembersModal: FC<IAddChannelMembersModalProps> = ({
  open,
  title,
  closeModal,
  dataTestId,
  onSubmit = () => {},
  onCancel = () => {},
  selectedMemberIds = [],
}) => {
  const audienceForm = useForm<any>({
    defaultValues: {
      showSelectedMembers: false,
      selectAll: false,
    },
  });

  const { form, setForm } = useEntitySearchFormStore();

  useEffect(() => {
    setForm(audienceForm);
    return () => setForm(null);
  }, []);

  return form ? (
    <Modal open={open} className="max-w-[638px]">
      <form onSubmit={(e) => e.preventDefault()}>
        <Header
          title={title || 'Add Channel members'}
          onBackIconClick={() => {}}
          closeBtnDataTestId={`${dataTestId}-close`}
          onClose={closeModal}
        />
        <EntitySearchModalBody
          entityType={EntitySearchModalType.ChannelMembers}
          selectedMemberIds={selectedMemberIds}
          entityRenderer={(data: any) => {
            return (
              <div className="flex items-center space-x-4 w-full">
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
                  <></>
                </div>
              </div>
            );
          }}
          dataTestId={dataTestId}
        />
        <div className="flex justify-end items-center h-16 p-6 bg-blue-50 rounded-b-19xl">
          <div className="flex">
            <Button
              variant={ButtonVariant.Secondary}
              label="Cancel"
              className="mr-3"
              onClick={onCancel}
              dataTestId={`${dataTestId}-cancel}`}
            />
            <Button
              label="Enroll Members"
              dataTestId={`${dataTestId}-cta`}
              onClick={form.handleSubmit((formData) => {
                onSubmit(formData);
              })}
            />
          </div>
        </div>
      </form>
    </Modal>
  ) : (
    <></>
  );
};

export default AddChannelMembersModal;
