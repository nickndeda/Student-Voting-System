const { findStudentByRegNo } = require("../models/Student");

const login = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request headers:", req.headers);

    const { registrationNumber, password } = req.body || {};

    if (!registrationNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing registrationNumber or password",
        received: req.body,
      });
    }

    const student = await findStudentByRegNo(
      registrationNumber
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student found",
      student: {
        id: student.student_id,
        name: `${student.first_name} ${student.last_name}`,
      },
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  login,
};
const otp = Math.floor(
  100000 + Math.random() * 900000
).toString();

console.log("Generated OTP:", otp);