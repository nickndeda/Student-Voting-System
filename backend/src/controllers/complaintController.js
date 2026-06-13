const db = require("../config/db");

const createComplaint = (req, res) => {
  const studentId = req.user?.studentId;

  if (!studentId) {
    return res.status(401).json({
      success: false,
      message: "Authentication required to submit a complaint",
    });
  }

  const {
    complaintType,
    subject,
    description,
  } = req.body;

  if (!complaintType || !subject || !description) {
    return res.status(400).json({
      success: false,
      message: "complaintType, subject, and description are required",
    });
  }

  const sql = `
    INSERT INTO complaints
    (
      student_id,
      complaint_type,
      subject,
      description
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      studentId,
      complaintType,
      subject,
      description,
    ],
    (err) => {
      if (err) {
        console.error("createComplaint error", err, {
          studentId,
          body: req.body,
        });

        return res.status(500).json({
          success: false,
          message: "Unable to submit complaint. Please try again.",
        });
      }

      res.json({
        success: true,
        message: "Complaint submitted successfully",
      });
    }
  );
};

module.exports = {
  createComplaint,
};