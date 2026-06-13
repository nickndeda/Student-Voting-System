const db = require("../config/db");

const getCandidates = (req, res) => {
  const sql = `
    SELECT
      p.position_id,
      p.position_name,

      c.candidate_id,
      c.manifesto,

      s.first_name,
      s.last_name

    FROM positions p

    LEFT JOIN candidates c
      ON p.position_id = c.position_id

    LEFT JOIN students s
      ON c.student_id = s.student_id

    WHERE c.is_approved = 1

    ORDER BY p.position_id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }

    const grouped = {};

    results.forEach((row) => {
      if (!grouped[row.position_id]) {
        grouped[row.position_id] = {
          position_id: row.position_id,
          position_name: row.position_name,
          candidates: [],
        };
      }

      grouped[row.position_id].candidates.push({
        candidate_id: row.candidate_id,
        name: `${row.first_name} ${row.last_name}`,
        manifesto: row.manifesto,
      });
    });

    res.json({
      success: true,
      positions: Object.values(grouped),
    });
  });
};

module.exports = { getCandidates };