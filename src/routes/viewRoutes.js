const express = require("express");
const router = express.Router();

const {
  getOverview,
  getTour,
  getDetails,
} = require("../controllers/viewsController");

router.get("/", getOverview);
router.get("/tour/:slug", getTour);


// app.get("/", (req, res) => {
//   res.status(200).render("base", {
//     tour: "the forest hiker",
//     user: "hassan",
//   });
// });

module.exports = router;
