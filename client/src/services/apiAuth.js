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

export async function getCurrentUser() {
  try {
    const data = await axios.get('/api/users/me');

    return data?.data?.data?.user;
  } catch (err) {
    if (err.response?.status === 401) {
      return null;
    }

    throw err;
  }
}

export async function updateUserData(formData) {
  const res = await axios.patch('/api/users/updateMe', formData);
  return res?.data;
}

export async function updateUserPassword({
  passwordCurrent,
  password,
  passwordConfirm,
}) {
  await axios.patch('/api/users/updatePassword', {
    passwordCurrent,
    password,
    passwordConfirm,
  });

  return;
}

// let dispatcher = null;

// // Rendered via React
// function MyComponent() {
//   const [state, setState] = useState(1);

//   useEffect(() => {
//     // set the global var to this components setState
//     dispatcher = setState;
//     return () => {
//       // on unmount, reset the global var to null
//       dispatcher = null;
//     };
//   }, [setState]);

//   return (
//     <div className="App">
//       <div>Count: {state}</div>
//     </div>
//   );
// }

// // Rendered outside of React
// const elem = document.getElementById("button");
// let clickCount = 1;
// elem.onclick = () => {
//   if (dispatcher) {
//     // call the global var which is the React component's setState()
//     dispatcher(++clickCount);
//   }
// };
