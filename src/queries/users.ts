import { useQuery } from '@tanstack/react-query';
import apiService from 'utils/apiService';

export interface IPostUser {
  fullName: string;
  workEmail: string;
  role: string;
}

export interface IPostUsers {
  users: IPostUser[];
}

export enum UserStatus {
  Created = 'CREATED',
  Invited = 'INVITED',
  Attempted = 'ATTEMPTED',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Deleted = 'DELETED',
  Failed = 'FAILED',
}

export enum UserRole {
  Member = 'MEMBER',
  Admin = 'ADMIN',
  Superadmin = 'SUPERADMIN',
}

export interface IPostUsersResponse {
  id?: string;
  createdAt: string | null;
  fullName: string;
  message: string;
  organization: string;
  reason: string;
  role: UserRole;
  status: UserStatus;
  workEmail: string;
}

const getAllUsers = async (q: Record<string, any>) => {
  const { data } = await apiService.get('/users', q);
  return data;
};

export const useUsers = (q: Record<string, any>) => {
  return useQuery({
    queryKey: ['users', q],
    queryFn: () => getAllUsers(q),
    staleTime: 15 * 60 * 1000,
  });
};

export const inviteUsers = async (payload: IPostUsers) => {
  const data = await apiService.post('/users', payload);
  return new Promise((res) => {
    res(data);
  });
};

export const deleteUser = async (id: string) => {
  const data = await apiService.delete(`/users/${id}`, {});
  return new Promise((res) => {
    res(data);
  });
};
