import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCandidates } from "../../services/candidateService";

function Candidates() {
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const data = await getCandidates();

        setPositions(data.positions || []);
      } catch (error) {
        console.error("Failed to load candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    void loadCandidates();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100">
        <p className="text-lg font-medium text-slate-600">
          Loading candidates...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Election Candidates
          </h1>

          <p className="text-slate-500 mt-2">
            View all candidates participating in the election.
          </p>
        </div>

        {/* Positions */}
        {positions.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <p className="text-slate-500">
              No candidates found.
            </p>
          </div>
        ) : (
          positions.map((position) => (
            <div
              key={position.position_id}
              className="bg-white rounded-xl shadow-sm p-6 mb-6"
            >

              <h2 className="text-xl font-bold text-[#800020] mb-5">
                {position.position_name}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                {position.candidates?.map((candidate) => (

                  <div
                    key={candidate.candidate_id}
                    className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all"
                  >

                    <div className="flex items-center gap-4 mb-4">

                      <div className="w-16 h-16 rounded-full bg-[#800020] text-white flex items-center justify-center text-lg font-bold">
                        {candidate.name
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .substring(0, 2)}
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-800">
                          {candidate.name}
                        </h3>

                        <p className="text-sm text-slate-500">
                          Candidate
                        </p>
                      </div>

                    </div>

                    <div className="border-t pt-4">

                      <h4 className="font-semibold text-slate-700 mb-2">
                        Manifesto
                      </h4>

                      <p className="text-sm text-slate-600">
                        {candidate.manifesto ||
                          "No manifesto available."}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>
          ))
        )}

      </div>

      {/* Back Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-3 bg-[#800020] text-white rounded-xl font-semibold hover:bg-[#650019] transition-colors shadow-sm"
        >
          ← Back
        </button>
      </div>

    </div>
  );
}

export default Candidates;