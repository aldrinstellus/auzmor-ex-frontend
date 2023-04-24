import apiService from 'utils/apiService';

export const me = async () => {
  return await apiService.get('/users/me');
};
