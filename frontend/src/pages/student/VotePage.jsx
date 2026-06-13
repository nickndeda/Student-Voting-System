import { useEffect, useState } from "react";
import { getCandidates } from "../../services/candidateService";
import { getStudentStatus } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function VotePage() {

  const [positions, setPositions] = useState([]);
  const [selectedVotes, setSelectedVotes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkVotingStatus = async () => {
      try {
        const status = await getStudentStatus();
        if (status.has_voted === 1) {
          navigate("/student/receipt");
          return;
        }

        const data = await getCandidates();
        setPositions(data.positions);
      } catch (error) {
        console.error(error);
      }
    };

    void checkVotingStatus();
  }, [navigate]);
  const handleReview = () => {
  sessionStorage.setItem(
    "voteSelections",
    JSON.stringify(selectedVotes)
  );

  navigate("/student/review");
};

  const handleSelect = (positionId, candidateId) => {

    setSelectedVotes((prev) => ({
      ...prev,
      [positionId]: candidateId,
    }));

  };

  const completed = Object.keys(selectedVotes).length;

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Cast Your Vote
        </h1>

        <p className="text-slate-500 mb-8">
          Select one candidate for each position.
        </p>

        {/* Progress */}

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">

          <div className="flex justify-between mb-3">

            <span className="font-medium">
              Voting Progress
            </span>

            <span>
              {completed} / {positions.length}
            </span>

          </div>

          <div className="w-full h-3 bg-slate-200 rounded-full">

            <div
              className="h-3 bg-[#800020] rounded-full"
              style={{
                width: `${
                  positions.length
                    ? (completed / positions.length) * 100
                    : 0
                }%`,
              }}
            />

          </div>

        </div>

        {/* Positions */}

        {positions.map((position) => (

          <div
            key={position.position_id}
            className="bg-white rounded-xl shadow-sm mb-6"
          >

            <div className="border-b p-5">

              <h2 className="text-xl font-semibold">
                {position.position_name}
              </h2>

              <p className="text-slate-500 text-sm">
                Select one candidate
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-5 p-5">

              {position.candidates.map((candidate) => (

                <button
                  key={candidate.candidate_id}
                  onClick={() =>
                    handleSelect(
                      position.position_id,
                      candidate.candidate_id
                    )
                  }
                  className={`border rounded-xl p-5 text-left transition-all ${
                    selectedVotes[position.position_id] ===
                    candidate.candidate_id
                      ? "border-[#800020] bg-red-50"
                      : "border-slate-200 hover:border-[#800020]"
                  }`}
                >

                  <h3 className="font-semibold text-lg">
                    {candidate.name}
                  </h3>

                  <p className="text-slate-600 mt-2">
                    {candidate.manifesto}
                  </p>

                </button>

              ))}

            </div>

          </div>

        ))}

        {/* Review Button */}

        <div className="flex justify-end mt-8">

          <button
        onClick={handleReview}
       disabled={completed !== positions.length}
      className={`px-8 py-4 rounded-xl font-semibold ${
       completed === positions.length
      ? "bg-[#800020] text-white"
      : "bg-slate-300 text-slate-500 cursor-not-allowed"
  }`}
>
  Review Votes
</button>

        </div>

      </div>

    </div>
  );
}

export default VotePage;