const express = require("express");
const router = express.Router();

const { submitVotes } = require("../controllers/voteController");
const { authenticate } = require("../middleware/authMiddleware");

router.post(
  "/submit",
  authenticate,
  submitVotes
);

const { getReceipt } = require("../controllers/voteController");

router.get("/receipt", authenticate, getReceipt);

module.exports = router;