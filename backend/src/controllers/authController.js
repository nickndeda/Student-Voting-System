const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findStudentByRegNo } = require("../models/Student");
const { saveOtp, findValidOtp, markOtpUsed } = require("../models/OTP");
const sendOtpEmail = require("../utils/sendEmail");

const login = async (req, res) => {
  try {
    console.log("Login request body:", req.body);

    const { registrationNumber, password } = req.body || {};

    if (!registrationNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing registrationNumber or password",
        received: req.body,
      });
    }

    const student = await findStudentByRegNo(registrationNumber);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, student.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await saveOtp(student.student_id, otp, expiresAt);
    await sendOtpEmail(student.institutional_email, otp);

    // For now we return the OTP in the response for testing. In production,
    // remove it from the response once email delivery is confirmed.
    return res.status(200).json({
      success: true,
      message: "Password verified. OTP generated and sent to email.",
      otp,
    });
  } catch (error) {
    console.error("login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    console.log("Verify OTP request body:", req.body);

    const { registrationNumber, otp } = req.body || {};

    if (!registrationNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: "Registration number and OTP are required",
      });
    }

    const student = await findStudentByRegNo(registrationNumber);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const validOtp = await findValidOtp(student.student_id, otp);

    if (!validOtp) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    await markOtpUsed(validOtp.otp_id);

    const token = jwt.sign(
      {
        studentId: student.student_id,
        registrationNumber: student.registration_number,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      user: {
        studentId: student.student_id,
        registrationNumber: student.registration_number,
      },
    });
  } catch (error) {
    console.error("verifyOtp error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const me = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

module.exports = {
  login,
  verifyOtp,
  me,
};