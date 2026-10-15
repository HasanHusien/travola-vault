import axios from 'axios';

// for basUrl && send cookie with req and don't save data in cashe
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  },
});

export async function getTours() {
  const res = await api.get('/tours');
  return res.data;
}

export async function getTour(slug) {
  const res = await api.get(`/tour/${slug}`);
  return res.data.tour;
}

export async function bookTour(tourId) {
  const session = await api.get(`/booking/checkout-session/${tourId}`);
  window.location.href = session.data.session.url;
}
