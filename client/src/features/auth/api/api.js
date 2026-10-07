// using axios library
import axios from 'axios';
axios.defaults.withCredentials = true;

export async function signup({ name, email, password, passwordConfirm }) {
  try {
    await axios.post('api/users/signup', {
      name,
      email,
      password,
      passwordConfirm,
    });

    return;
  } catch (err) {
    console.log(err?.response?.data);
  }
}

export async function login({ email, password }) {
  try {
    const data = await axios.post('api/users/login', {
      email,
      password,
    });
    return data;
  } catch (err) {
    console.log(err?.response?.data);
  }

  // const res = await fetch("/ap/users/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
}

export async function logout() {
  await axios.get('api/users/logout');

  return;
}
