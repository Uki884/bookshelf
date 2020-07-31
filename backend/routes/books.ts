import express from 'express';

const router = express.Router();
// const paymentController = require("../controllers/paymentController");

// router.get("/list", paymentController.index);
// router.get("/", paymentController.get);
// router.post("/", paymentController.create);
router.get('/', (req: any, res: any) => {
  res.json('おはよう');
});

export default router;
