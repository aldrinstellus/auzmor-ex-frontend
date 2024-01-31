import Card from 'components/Card';
import { FC } from 'react';
import { IChannel } from 'stores/channelStore';
import PrivateChannelImage from 'images/png/PrivateChannelBanner.png';
import Button, { Variant } from 'components/Button';
import AvatarChips from 'components/AvatarChips';

interface IChannelCardardProps {
  channelAdmin?: IChannel; //
  isChannelRequest?: boolean;
}

const PrivateChannelBanner: FC<IChannelCardardProps> = ({
  isChannelRequest = true,
}) => {
  // api call to get the admin of  particular channel .
  //  pass a channel id as a props
  const adminDummyData = [
    {
      userId: '6516afa8dc958600e4619cdf',
      email: 'Sim_Kris@hotmail.com',
      fullName: 'Abby Wolff',
      status: 'ACTIVE',
      designation: 'Quality Assurance',
      department: 'Grocery',
      profileImage: {
        id: '653f87281ef0a90b7d1e7b54',
        original:
          'https://office-qa-cdn.auzmor.com/646311ed765368daacc601f7/public/users/646311ed765368daacc601f9/profile/1698662184834-original.jpg',
        blurHash: '',
      },
    },
    {
      userId: '6516afa8dc958600e4619cdf',
      email: 'Sim_Kris@hotmail.com',
      fullName: 'Abby Wolff',
      status: 'ACTIVE',
      designation: 'Quality Assurance',
      department: 'Grocery',
      profileImage: {
        id: '653f87281ef0a90b7d1e7b54',
        original:
          'https://office-qa-cdn.auzmor.com/646311ed765368daacc601f7/public/users/646311ed765368daacc601f9/profile/1698662184834-original.jpg',
        blurHash: '',
      },
    },
    {
      userId: '6516afa8dc958600e4619cdf',
      email: 'Sim_Kris@hotmail.com',
      fullName: 'Abby Wolff',
      status: 'ACTIVE',
      designation: 'Quality Assurance',
      department: 'Grocery',
      profileImage: {
        id: '653f87281ef0a90b7d1e7b54',
        original:
          'https://office-qa-cdn.auzmor.com/646311ed765368daacc601f7/public/users/646311ed765368daacc601f9/profile/1698662184834-original.jpg',
        blurHash: '',
      },
    },
    {
      userId: '6516afa8dc958600e4619cdf',
      email: 'Sim_Kris@hotmail.com',
      fullName: 'Abby Wolff',
      status: 'ACTIVE',
      designation: 'Quality Assurance',
      department: 'Grocery',
      profileImage: {
        id: '653f87281ef0a90b7d1e7b54',
        original:
          'https://office-qa-cdn.auzmor.com/646311ed765368daacc601f7/public/users/646311ed765368daacc601f9/profile/1698662184834-original.jpg',
        blurHash: '',
      },
    },
  ];
  return (
    <Card>
      <div className="flex flex-col items-center justify-center p-8 ">
        <img src={PrivateChannelImage} alt="private channel banner" />
        <div className="text-2xl font-bold mt-8 mb-4">
          This is a private channel. You must be a member to view the channel
          content
        </div>
        <Button
          label={isChannelRequest ? 'Request to Join' : 'Withdraw request'}
          variant={isChannelRequest ? Variant.Primary : Variant.Danger}
          onClick={() => {}} // channel send or withdraw  function to call
        />
        <div className="text-neutral-500 mt-[80px] underline  mb-4 text-sm font-semibold">
          Space Admins
        </div>
        <AvatarChips
          users={adminDummyData} // admins users.
          showCount={7}
          dataTestId="feed-post-shoutoutto-"
        />
      </div>
    </Card>
  );
};

export default PrivateChannelBanner;
