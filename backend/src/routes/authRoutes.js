const express = require("express");

const router = express.Router();

const { login, verifyOtp, me } = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.get("/me", authenticate, me);

module.exports = router;