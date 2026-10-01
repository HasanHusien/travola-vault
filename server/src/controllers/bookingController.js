const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// How payment be in BACKEND with STRIPE
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1. Get currently booking tour
  const tour = await Tour.findById(req.params.tourId);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get('host')}/
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      req.params.tourId
    }&user=${req.user.id}&price=${tour.price}`,

    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,

    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,

          product_data: {
            name: tour.name,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`]
          }
        },
        quantity: 1
      }
    ]
  });

  // 3. Create session as response
  res.status(200).json({
    status: 'success',
    session
  });
});

// NOT USED until now
exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // This is only TEMPORARY, cause its UNSECURE.
  const { tour, price, user } = req.query;

  if (!tour && !user && !price) return next();
  await Booking.create({ tour, price, user });

  res.redirect(req.originalUrl.split('?')[0]);
});

exports.getBooking = factory.getOne(Booking);
exports.getAllBooking = factory.getAll(Booking);
exports.createBooking = factory.createOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
