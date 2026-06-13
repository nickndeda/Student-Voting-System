import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComplaint } from "../../services/complaintService";

function Complaint() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    complaintType: "",
    subject: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await createComplaint(formData);

      alert(response.message);

      setFormData({
        complaintType: "",
        subject: "",
        description: "",
      });

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to submit complaint"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-4xl mx-auto">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Report an Issue
          </h1>

          <p className="text-slate-500 mt-2">
            Submit a complaint regarding the election process,
            technical issues, or candidate misconduct.
          </p>
        </div>

        {/* Complaint Form */}

        <div className="bg-white rounded-xl shadow-sm p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Complaint Type */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Complaint Type
              </label>

              <select
                name="complaintType"
                value={formData.complaintType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]"
              >
                <option value="">
                  Select complaint type
                </option>

                <option value="Technical Issue">
                  Technical Issue
                </option>

                <option value="Voting Problem">
                  Voting Problem
                </option>

                <option value="Candidate Misconduct">
                  Candidate Misconduct
                </option>

                <option value="Election Fraud">
                  Election Fraud
                </option>

                <option value="General Feedback">
                  General Feedback
                </option>

              </select>
            </div>

            {/* Subject */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Enter complaint subject"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]"
              />
            </div>

            {/* Description */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="8"
                placeholder="Describe your complaint in detail..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#800020]"
              />
            </div>

            {/* Information Box */}

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">

              <h3 className="font-semibold text-amber-800 mb-2">
                Important
              </h3>

              <ul className="text-sm text-amber-700 space-y-1 list-disc ml-5">
                <li>
                  Complaints are reviewed by election administrators.
                </li>

                <li>
                  False reports may lead to disciplinary action.
                </li>

                <li>
                  Include as much detail as possible.
                </li>

                <li>
                  Your complaint will be assigned a status after review.
                </li>
              </ul>

            </div>

            {/* Buttons */}

            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-100 font-semibold text-slate-700 transition-colors"
              >
                ← Back
              </button>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      complaintType: "",
                      subject: "",
                      description: "",
                    })
                  }
                  className="px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-100"
                >
                  Clear
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-[#800020] hover:bg-[#650019] text-white rounded-xl font-semibold disabled:opacity-50"
                >
                  {loading
                    ? "Submitting..."
                    : "Submit Complaint"}
                </button>
              </div>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Complaint;