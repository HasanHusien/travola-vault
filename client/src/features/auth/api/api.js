import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export async function signup({ name, email, password, passwordConfirm }) {
  await api.post('/users/signup', {
    name,
    email,
    password,
    passwordConfirm,
  });
}

export async function login({ email, password }) {
  const res = await api.post('/users/login', {
    email,
    password,
  });
  return res.data.data.user;
}

export async function logout() {
  await api.get('/users/logout');
}
