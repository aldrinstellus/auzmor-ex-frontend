import { UserStatus } from 'queries/users';
import {
  CHANNEL_MEMBER_STATUS,
  IChannelLink,
  IChannelRequest,
} from 'stores/channelStore';
import { Role } from 'utils/enum';

export const ChannelUserRequests: IChannelRequest[] = [
  {
    id: '64de11da64ff441b033c3b0d',
    user: {
      userId: '6516afa8dc958600e4619cdf',
      email: 'Sim_Kris@hotmail.com',
      fullName: 'Abby Wolff',
      status: UserStatus.Created,
      designation: 'Quality Assurance',
      department: 'Grocery',
      profileImage: {
        id: '653f87281ef0a90b7d1e7b54',
        original:
          'https://office-qa-cdn.auzmor.com/646311ed765368daacc601f7/public/users/646311ed765368daacc601f9/profile/1698662184834-original.jpg',
        blurHash: '',
      },
    },
    createdBy: {
      id: '6465d142c62ae5de85d33b83',
      name: 'Dhruvin Modi',
      email: 'dhruvinmodi2015@gmail.com',
      role: Role.SuperAdmin,
      organization: {
        domain: 'incendia',
        id: '6465d142c62ae5de85d33b81',
      },
    },
    status: CHANNEL_MEMBER_STATUS.PENDING,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '64de11da64ff441b033c3b0d',
    user: {
      userId: '6516afa8dc958600e4619cdf',
      email: 'Sim_Kris@hotmail.com',
      fullName: 'Abby Wolff',
      status: UserStatus.Created,
      designation: 'Quality Assurance',
      department: 'Grocery',
      profileImage: {
        id: '653f87281ef0a90b7d1e7b54',
        original:
          'https://office-qa-cdn.auzmor.com/646311ed765368daacc601f7/public/users/646311ed765368daacc601f9/profile/1698662184834-original.jpg',
        blurHash: '',
      },
    },
    createdBy: {
      id: '6465d142c62ae5de85d33b83',
      name: 'Dhruvin Modi',
      email: 'dhruvinmodi2015@gmail.com',
      role: Role.SuperAdmin,
      organization: {
        domain: 'incendia',
        id: '6465d142c62ae5de85d33b81',
      },
    },
    status: CHANNEL_MEMBER_STATUS.PENDING,
    createdAt: '',
    updatedAt: '',
  },

  {
    id: '64de11da64ff441b033c3b0d',
    user: {
      userId: '6516afa8dc958600e4619cdf',
      email: 'Sim_Kris@hotmail.com',
      fullName: 'Abby Wolff',
      status: UserStatus.Created,
      designation: 'Quality Assurance',
      department: 'Grocery',
      profileImage: {
        id: '653f87281ef0a90b7d1e7b54',
        original:
          'https://office-qa-cdn.auzmor.com/646311ed765368daacc601f7/public/users/646311ed765368daacc601f9/profile/1698662184834-original.jpg',
        blurHash: '',
      },
    },
    createdBy: {
      id: '6465d142c62ae5de85d33b83',
      name: 'Dhruvin Modi',
      email: 'dhruvinmodi2015@gmail.com',
      role: Role.SuperAdmin,
      organization: {
        domain: 'incendia',
        id: '6465d142c62ae5de85d33b81',
      },
    },
    status: CHANNEL_MEMBER_STATUS.PENDING,
    createdAt: '',
    updatedAt: '',
  },
];
export const channelAdmins = [
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

export const channelLinks: IChannelLink[] = [
  {
    title: 'Contracts',
    url: 'www.twitter.com',
    favicon:
      'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg',
  },
  {
    title: 'Open Opportunities',
    url: 'www.office.auzmor.com',
    favicon: 'https://office.auzmor.com/favicon.ico',
  },
  { title: 'Lost Opportunities', url: 'www.auzmor.com/office' },
  { title: 'Case study - Healthcare', url: 'www.google.com' },
];
