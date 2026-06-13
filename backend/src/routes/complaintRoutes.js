const express = require("express");
const router = express.Router();

const { createComplaint } = require("../controllers/complaintController");
const { authenticate } = require("../middleware/authMiddleware");

router.post(
  "/create",
  authenticate,
  createComplaint
);

module.exports = router;