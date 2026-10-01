import axios from 'axios';
export async function getTour(slug) {
  try {
    const res = await fetch(`/api/tour/${slug}`);
    const data = await res.json();

    // console.log(data);
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function getTours() {
  try {
    const res = await fetch('/api/tours');
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function bookTour(tourId) {
  try {
    // 1) Get checkout session from API
    const session = await axios.get(`/api/booking/checkout-session/${tourId}`);
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

