import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/v1';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNzamFtcjN0bDFAYXRjLmNvbSIsInVzZXJJZCI6IjY2Y2MzNDdjYmZhZDBhMGZmNmJmMzQ5ZCIsIm9yZ2FuaXphdGlvbklkIjoiNjZjYzM0N2NiZmFkMGEwZmY2YmYzNDliIiwiaWF0IjoxNzI0NjU4ODMwLCJleHAiOjE3NTYyMTY0MzB9.oEoHBOUPcwecMCtie7MVIJ-gtSKg2dbdI-8UPkBJt5k';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});

export const post = (url: string, data: any) => apiService.post(url, data);
export const put = (url: string, data: any) => apiService.put(url, data);

export default apiService;
