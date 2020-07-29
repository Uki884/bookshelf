const express = require("express");
const router = express.Router();

const books = require("./books.js");
router.use("/books", books);
module.exports = router;
