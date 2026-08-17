const express = require("express");
const router = express.Router();

const { getOverview, getTour } = require("../controllers/viewsController");

router.get("/", getOverview);
router.get("/tour", getTour);

// app.get("/", (req, res) => {
//   res.status(200).render("base", {
//     tour: "the forest hiker",
//     user: "hassan",
//   });
// });

module.exports = router;
