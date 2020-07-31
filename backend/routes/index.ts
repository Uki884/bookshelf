import express from 'express';

import books from './books';

const router = express.Router();

// 本
router.use('/books', books);

export default router;
