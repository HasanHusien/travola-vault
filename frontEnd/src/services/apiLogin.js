import axios from "axios";
export async function getLogin({ email, password }) {
  try {
    // using axios library
    const res = await axios.post("/api/users/login", {
      email,
      password,
    });

    console.log(res);
  } catch (err) {
    // from axios docs response.data 
    console.error(err.response.data);
  }

  // const res = await fetch("/ap/users/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
}
