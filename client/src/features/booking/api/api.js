import axios from 'axios';

export async function getBookedTours() {
  try {
    await axios.get('/api/my-tours');

    return;
  } catch (err) {
    console.log(err?.response?.data);
  }
}
