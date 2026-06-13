import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCandidates } from "../../services/candidateService";
import { submitVotes } from "../../services/voteService";
import { getStudentStatus } from "../../services/authService";

function ReviewVotes() {

  const navigate = useNavigate();

  const [positions, setPositions] = useState([]);
  const votes = JSON.parse(sessionStorage.getItem("voteSelections")) || {};

  useEffect(() => {
    const checkVotingStatus = async () => {
      try {
        const status = await getStudentStatus();
        if (status.has_voted === 1) {
          navigate("/student/receipt");
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };

    void checkVotingStatus();
  }, [navigate]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getCandidates();
        setPositions(data.positions);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchCandidates();
  }, []);

  const getSelectedCandidate = (
    positionId
  ) => {

    const position = positions.find(
      (p) => p.position_id === positionId
    );

    if (!position) return null;

    return position.candidates.find(
      (c) =>
        c.candidate_id ===
        votes[positionId]
    );

  };

  const handleSubmit = async () => {

  try {

    const payload = [];

    positions.forEach((position) => {

      payload.push({
        position_id: position.position_id,
        candidate_id:
          votes[position.position_id],
      });

    });

    const result = await submitVotes(payload);

    localStorage.setItem("has_voted", "1");
    if (result?.votedAt) {
      localStorage.setItem("voted_at", result.votedAt);
    }

    sessionStorage.removeItem("voteSelections");

    navigate("/student/receipt");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Vote submission failed"
    );

  }

};

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-xl shadow-sm p-8">

          <h1 className="text-3xl font-bold mb-2">
            Review Your Votes
          </h1>

          <p className="text-slate-500 mb-8">
            Please confirm all selections before submission.
            Votes cannot be changed after submission.
          </p>

          <div className="space-y-4">

            {positions.map((position) => {

              const candidate =
                getSelectedCandidate(
                  position.position_id
                );

              return (
                <div
                  key={position.position_id}
                  className="border rounded-xl p-5"
                >

                  <h3 className="font-semibold text-lg">
                    {position.position_name}
                  </h3>

                  <p className="text-[#800020] mt-2">
                    {candidate
                      ? candidate.name
                      : "No Selection"}
                  </p>

                </div>
              );
            })}

          </div>

          <div className="flex justify-between mt-8">

            <button
              onClick={() =>
                navigate("/student/vote")
              }
              className="px-6 py-3 border rounded-xl"
            >
              Back
            </button>

            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-[#800020] text-white rounded-xl font-semibold"
            >
              Submit Votes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ReviewVotes;