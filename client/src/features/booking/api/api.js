import axios from 'axios';

export async function getBookedTours() {
  try {
    return await axios.get(
      'api/my-tours',
    );
  } catch (err) {
    console.log(err?.response?.data);
  }
}
