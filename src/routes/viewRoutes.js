const express = require("express");
const router = express.Router();

const {
  getOverview,
  getTour,
  getLoginForm
} = require('../controllers/viewsController');

router.get("/", getOverview);
router.get("/tour/:slug", getTour);

router.get('/login',getLoginForm)

// app.get("/", (req, res) => {
//   res.status(200).render("base", {
//     tour: "the forest hiker",
//     user: "hassan",
//   });
// });

module.exports = router;
