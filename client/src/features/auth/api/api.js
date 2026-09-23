import axios from 'axios';

axios.defaults.withCredentials = true;

export async function login({ email, password }) {
  // using axios library
  const data = await axios.post('/api/users/login', {
    email,
    password,
  });

  if (!data) console.error('Error fail to fetching');
  return data;

  // const res = await fetch("/ap/users/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
}

export async function logout() {
  const res = await axios.get('/api/users/logout');

  console.log(res);
  return res;
}
