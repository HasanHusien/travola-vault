import axios from 'axios';

// cash handler
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  },
});

export async function getCurrentUser() {
  try {
    // GET /api/users/me
    const res = await api.get('/users/me');
    return res.data.data.user;
  } catch (err) {
    // for not make many req and won't save null in cash
    if (err.response?.status === 401) return null;
    throw err;
  }
}

export async function updateUserData(formData) {
  const res = await api.patch('/users/updateMe', formData);
  return res.data;
}

export async function updateUserPassword({
  passwordCurrent,
  password,
  passwordConfirm,
}) {
  await api.patch('/users/updatePassword', {
    passwordCurrent,
    password,
    passwordConfirm,
  });
}
