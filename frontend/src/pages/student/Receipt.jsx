import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { getReceipt } from "../../services/voteService";

function Receipt() {
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getReceipt();
        if (res?.success) {
          const votedAt = res.voted_at ? new Date(res.voted_at) : new Date();
          setReceipt({
            receiptNumber: res.receiptNumber,
            date: votedAt.toLocaleDateString(),
            time: votedAt.toLocaleTimeString(),
            votes: res.votes || [],
          });
          localStorage.setItem("voted_at", res.voted_at || new Date().toISOString());
        } else {
          // fallback to local storage / generated
          const now = new Date();
          const receiptNumber =
            "KNP-" + now.getFullYear() + "-" + Math.floor(100000 + Math.random() * 900000);
          const votedAtIso = localStorage.getItem("voted_at");
          const votedDate = votedAtIso ? new Date(votedAtIso) : now;
          setReceipt({
            receiptNumber,
            date: votedDate.toLocaleDateString(),
            time: votedDate.toLocaleTimeString(),
            votes: [],
          });
        }
      } catch (error) {
        console.error(error);
        const now = new Date();
        const receiptNumber =
          "KNP-" + now.getFullYear() + "-" + Math.floor(100000 + Math.random() * 900000);
        const votedAtIso = localStorage.getItem("voted_at");
        const votedDate = votedAtIso ? new Date(votedAtIso) : now;
        setReceipt({
          receiptNumber,
          date: votedDate.toLocaleDateString(),
          time: votedDate.toLocaleTimeString(),
          votes: [],
        });
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const downloadReceipt = () => {
    if (!receipt) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("KITALE NATIONAL POLYTECHNIC", 20, 20);

    doc.setFontSize(16);
    doc.text("Voting Receipt", 20, 35);

    doc.setFontSize(12);
    doc.text(`Receipt Number: ${receipt.receiptNumber}`, 20, 55);
    doc.text(`Date Voted: ${receipt.date}`, 20, 70);
    doc.text(`Time Voted: ${receipt.time}`, 20, 85);

    let y = 100;
    if (receipt.votes && receipt.votes.length) {
      doc.setFontSize(12);
      doc.text("Your Selections:", 20, y);
      y += 8;
      receipt.votes.forEach((v) => {
        const line = `- ${v.position_name}: ${v.candidate_name || "(N/A)"}`;
        doc.text(line, 20, y);
        y += 8;
      });
    }

    doc.text("Vote Status: Successfully Submitted", 20, y + 10);
    doc.text("Thank you for participating in the election.", 20, y + 30);

    doc.save(`${receipt.receiptNumber}.pdf`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-xl shadow-md text-center max-w-lg w-full">
        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-3xl font-bold text-green-600">Vote Submitted</h1>

        <p className="mt-4 text-slate-600">Your vote has been recorded successfully.</p>

        <div className="mt-8 text-left bg-slate-50 p-5 rounded-xl">
          {loading ? (
            <div>Loading receipt...</div>
          ) : (
            <>
              <div className="mb-3">
                <strong>Receipt Number:</strong>
                <br />
                {receipt?.receiptNumber}
              </div>

              <div className="mb-3">
                <strong>Date:</strong>
                <br />
                {receipt?.date}
              </div>

              <div>
                <strong>Time:</strong>
                <br />
                {receipt?.time}
              </div>

              {receipt?.votes && receipt.votes.length > 0 && (
                <div className="mt-4">
                  <strong>Selections:</strong>
                  <ul className="list-disc pl-6 mt-2 text-slate-700">
                    {receipt.votes.map((v) => (
                      <li key={v.position_id}>
                        {v.position_name}: {v.candidate_name || "(N/A)"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        <button
          onClick={downloadReceipt}
          className="mt-6 bg-[#800020] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#650019]"
        >
          Download Receipt
        </button>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-4 w-full flex justify-end"
        >
          <span className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-800 rounded-xl font-semibold hover:bg-slate-300 transition-colors">
            ← Back
          </span>
        </button>
      </div>
    </div>
  );
}

export default Receipt;