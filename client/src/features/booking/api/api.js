import axios from 'axios';

export async function bookTour(tourId) {
  try {
    // 1) Get checkout session from API
    const session = await axios.get(`/api/booking/checkout-session/${tourId}`);

    console.log(tourId);
    console.log(session);
    // 2) Create checkout form + chanre credit card
    // window.location.href = session.data.session.url;

    // await stripe.redirectToCheckout({
    //   sessionId: session.data.session.id,
    // });
  } catch (err) {
    console.error(err);
  }
}
