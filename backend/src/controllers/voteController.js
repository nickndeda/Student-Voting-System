const db = require("../config/db");

const getReceipt = (req, res) => {
  const studentId = req.user.studentId;

  db.query(
    `SELECT voted_at FROM students WHERE student_id = ?`,
    [studentId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Server error" });
      }

      if (!results.length || !results[0].voted_at) {
        return res.status(404).json({ success: false, message: "No vote record found" });
      }

      const votedAtDb = results[0].voted_at;
      const votedAtIso = new Date(votedAtDb).toISOString();

      const sql = `
        SELECT v.position_id, p.position_name, v.candidate_id, c.manifesto, s.first_name, s.last_name
        FROM votes v
        JOIN positions p ON v.position_id = p.position_id
        JOIN candidates c ON v.candidate_id = c.candidate_id
        LEFT JOIN students s ON c.student_id = s.student_id
        WHERE v.voter_student_id = ?
        ORDER BY v.position_id
      `;

      db.query(sql, [studentId], (err, rows) => {
        if (err) {
          return res.status(500).json({ success: false, message: "Server error" });
        }

        const votes = rows.map((r) => ({
          position_id: r.position_id,
          position_name: r.position_name,
          candidate_id: r.candidate_id,
          candidate_name: r.first_name && r.last_name ? `${r.first_name} ${r.last_name}` : null,
          manifesto: r.manifesto,
        }));

        // if voted_at is null in students table, try to infer from votes.created_at
        const finalize = (finalVotedAtIso) => {
          const ts = Math.floor(new Date(finalVotedAtIso).getTime() / 1000);
          const receiptNumber = `KNP-${new Date(finalVotedAtIso).getFullYear()}-${studentId}-${ts}`;
          // Do not include vote selections in the API response for privacy
          res.json({ success: true, receiptNumber, voted_at: finalVotedAtIso });
        };

        if (!votedAtDb) {
          // find earliest vote created_at
          db.query(
            `SELECT MIN(created_at) as first_vote FROM votes WHERE voter_student_id = ?`,
            [studentId],
            (err2, minRows) => {
              if (err2) {
                return finalize(new Date().toISOString());
              }

              const firstVote = minRows[0]?.first_vote;
              if (!firstVote) {
                return finalize(new Date().toISOString());
              }

              const firstIso = new Date(firstVote).toISOString();

              // persist back to students.voted_at for future
              db.query(`UPDATE students SET voted_at = ? WHERE student_id = ?`, [
                firstVote,
                studentId,
              ]);

              return finalize(firstIso);
            }
          );
        } else {
          return finalize(votedAtIso);
        }
      });
    }
  );
};

const submitVotes = async (req, res) => {
  try {

    const studentId = req.user.studentId;

    const { votes } = req.body;

    if (!votes || !Array.isArray(votes)) {
      return res.status(400).json({
        success: false,
        message: "Votes are required",
      });
    }

    // Check if student already voted
    db.query(
      "SELECT has_voted FROM students WHERE student_id = ?",
      [studentId],
      (err, result) => {

        if (err) {
          return res.status(500).json({
            success: false,
            message: "Database error",
          });
        }

        if (result[0].has_voted === 1) {
          return res.status(400).json({
            success: false,
            message: "You have already voted",
          });
        }

        const voteValues = votes.map((vote) => [
          studentId,
          vote.candidate_id,
          vote.position_id,
        ]);

        db.query(
          `
          INSERT INTO votes
          (voter_student_id, candidate_id, position_id)
          VALUES ?
          `,
          [voteValues],
          (err) => {

            if (err) {
              return res.status(500).json({
                success: false,
                message: "Vote submission failed",
              });
            }

            db.query(
              `
              UPDATE students
              SET has_voted = 1, voted_at = ?
              WHERE student_id = ?
              `,
              [
                // MySQL DATETIME format: YYYY-MM-DD HH:MM:SS
                new Date()
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " "),
                studentId,
              ],
              (err) => {
                if (err) {
                  console.error("Failed to update student voted_at:", err);
                  return res.status(500).json({
                    success: false,
                    message: "Vote recorded but failed to update student status",
                  });
                }

                // record server timestamp for when the vote was accepted
                const votedAt = new Date().toISOString();

                // respond with the vote timestamp so the frontend can show exact vote time
                res.json({
                  success: true,
                  message: "Vote submitted successfully",
                  votedAt,
                });
              }
            );

          }
        );
      }
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }
};

module.exports = {
  submitVotes,
  getReceipt,
};