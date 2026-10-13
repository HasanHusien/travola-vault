import axios from 'axios';

export async function getCurrentUser() {
  try {
    const data = await axios.get('api/users/me');
    // console.log('Response', data.data.data.user);

    return data?.data?.data?.user;
  } catch (err) {
    console.log(err.response?.data || err.message);
    console.log('Request URL:', err.config?.url);
    console.log('Status', err.response?.status);
  }
}

export async function updateUserData(formData) {
  const res = await axios.patch('api/users/updateMe', formData);
  return res?.data;
}

export async function updateUserPassword({
  passwordCurrent,
  password,
  passwordConfirm,
}) {
  await axios.patch('api/users/updatePassword', {
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
