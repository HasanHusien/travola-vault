import axios from 'axios';

// some initial axios setting (perfect)
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  },
});

export async function getBookedTours() {
  const res = await api.get('/my-tours');
  return res.data;
}
