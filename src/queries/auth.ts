import apiService from 'utils/apiService';

interface ILogin {
  email: string;
  password: string;
}

export const login = async (payload: ILogin) => {
  return await apiService.post('/login', payload);
};
