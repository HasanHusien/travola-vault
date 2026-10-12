import axios from 'axios';
axios.defaults.withCredentials = true;

export async function getTour(slug) {
  try {
    // const res = await fetch(`api/tour/${slug}`);
    // const data = await res.json();

    const data = await axios.get(`api/tour/${slug}`);
    return data;
  } catch (err) {
    console.log('Request URL:', err.config?.url);
    console.log('Status:', err.response?.status);
    console.log('Error:', err.response?.data || err.message);
  }
}

// from deploy api with
export async function getTours() {
  try {
    const res = await fetch('api/tours');
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err?.response?.data);
  }
}

export async function bookTour(tourId) {
  try {
    // 1) Get checkout session from API
    const session = await axios.get(`api/booking/checkout-session/${tourId}`);
    // console.log(session);
    // 2) Create checkout form + chanre credit card
    window.location.href = session.data.session.url;

    // await stripe.redirectToCheckout({
    //   sessionId: session.data.session.id,
    // });
  } catch (err) {
    console.log(err?.response?.data);
  }
}
