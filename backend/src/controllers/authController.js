const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { findStudentByRegNo, findStudentById } = require("../models/Student");
const { saveOtp, findValidOtp, markOtpUsed } = require("../models/OTP");
const sendOtpEmail = require("../utils/sendEmail");
const { comparePassword, isValidBcryptHash } = require("../utils/password");

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

    if (!isValidBcryptHash(student.password_hash)) {
      console.error(
        `Invalid password hash stored for registration number ${student.registration_number}`
      );

      return res.status(500).json({
        success: false,
        message: "Stored password is invalid. Please ask an administrator to reset it.",
      });
    }

    const passwordMatch = await comparePassword(password, student.password_hash);

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
        first_name: student.first_name,
        last_name: student.last_name,
        has_voted: student.has_voted,
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

  try {
    const student = await findStudentById(req.user.studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: student,
    });
  } catch (error) {
    console.error("me error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getStudentStatus = (req, res) => {
  const studentId = req.user.studentId;

  db.query(
    `
    SELECT has_voted, voted_at
    FROM students
    WHERE student_id = ?
    `,
    [studentId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Server error",
        });
      }

      if (!results.length) {
        return res.status(404).json({
          success: false,
          message: "Student not found",
        });
      }

      res.json({
        success: true,
        has_voted: results[0].has_voted,
        voted_at: results[0].voted_at || null,
      });
    }
  );
};

module.exports = {
  login,
  verifyOtp,
  me,
  getStudentStatus,
};
