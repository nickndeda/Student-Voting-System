const login = async (req, res) => {
  try {
    const { registrationNumber, password } = req.body;

    const student = await findStudentByRegNo(registrationNumber);
    const bcrypt = require("bcrypt");
    const { findStudentByRegNo } = require("../models/Student");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const match = await bcrypt.compare(
      password,
      student.password_hash
    );

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password verified. Proceed to OTP.",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};