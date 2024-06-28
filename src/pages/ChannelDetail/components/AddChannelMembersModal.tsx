import Modal from 'components/Modal';
import Header from 'components/ModalHeader';
import { FC, useEffect } from 'react';
import EntitySearchModalBody from 'components/EntitySearchModal/components/EntitySearchModalBody';
import { useForm } from 'react-hook-form';
import { useEntitySearchFormStore } from 'stores/entitySearchFormStore';
import { EntitySearchModalType } from 'components/EntitySearchModal';
import Button, { Variant as ButtonVariant } from 'components/Button';
import { IChannel } from 'stores/channelStore';

interface IAddChannelMembersModalProps {
  open: boolean;
  closeModal: () => void;
  channelData: IChannel;
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
  closeModal,
  channelData,
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

  function handleSubmit(data: { users: any; teams: any }): void {
    console.log(data);
  }

  const dataTestId = 'add-members';

  return form ? (
    <Modal open={open} className="max-w-[638px]">
      <form onSubmit={(e) => e.preventDefault()}>
        <Header
          title={
            <span>
              Add members{' '}
              <span className="text-primary-500">@${channelData?.name}</span>
            </span>
          }
          onBackIconClick={() => {}}
          closeBtnDataTestId={`${dataTestId}-close`}
          onClose={closeModal}
        />
        <EntitySearchModalBody
          entityType={EntitySearchModalType.ChannelMembers}
          selectedMemberIds={[]}
          dataTestId={dataTestId}
        />
        <div className="flex justify-end items-center h-16 p-6 bg-blue-50 rounded-b-19xl">
          <div className="flex">
            <Button
              variant={ButtonVariant.Secondary}
              label="Cancel"
              className="mr-3"
              onClick={closeModal}
              dataTestId={`${dataTestId}-cancel}`}
            />
            <Button
              label="Enroll Members"
              dataTestId={`${dataTestId}-cta`}
              onClick={form.handleSubmit((formData) => {
                handleSubmit(formData);
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
