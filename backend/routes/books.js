const express = require("express");
const router = express.Router();
// const paymentController = require("../controllers/paymentController");

// router.get("/list", paymentController.index);
// router.get("/", paymentController.get);
// router.post("/", paymentController.create);
router.get("/", (req,res) => {
  res.json('おはよう')
});

module.exports = router;
