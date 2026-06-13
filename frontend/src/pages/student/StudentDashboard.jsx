import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";

function StudentDashboard() {
  const { logout, user: student, initializing } = useAuth();
  const [loading] = useState(false);

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#800020]"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <p className="text-slate-600 font-medium">Unable to load student data</p>
        </div>
      </div>
    );
  }


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#800020]"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <p className="text-slate-600 font-medium">Unable to load student data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-[#800020] text-white flex flex-col">

        <div className="p-6 border-b border-white/10">

          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 mx-auto"
          />

          <h2 className="text-center mt-4 font-semibold">
            Student Voting System
          </h2>

        </div>

        <div className="p-6 border-b border-white/10">

          <h3 className="font-medium">
            {student.first_name} {student.last_name}
          </h3>

          <p className="text-sm text-white/70">
            {student.registration_number}
          </p>

        </div>

        <nav className="flex-1 p-4 space-y-2">

          <Link
            to="/student"
            className="block px-4 py-3 rounded-lg bg-white/20"
          >
            Dashboard
          </Link>

          <Link
            to="/student/vote"
            className="block px-4 py-3 rounded-lg hover:bg-white/10"
          >
            Vote
          </Link>

          <Link
            to="/student/candidates"
            className="block px-4 py-3 rounded-lg hover:bg-white/10"
          >
            Candidates
          </Link>

          <Link
            to="/student/receipt"
            className="block px-4 py-3 rounded-lg hover:bg-white/10"
          >
            My Receipt
          </Link>

          <Link
            to="/student/complaint"
            className="block px-4 py-3 rounded-lg hover:bg-white/10"
          >
            Report Issue
          </Link>

        </nav>

        <div className="p-4 border-t border-white/10">

          <button className="w-full bg-white text-[#800020] py-3 rounded-lg font-semibold hover:bg-slate-100"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Welcome, {student.first_name}
            </h1>

            <p className="text-slate-500 mt-2">
              Participate in the Student Council Elections
            </p>

          </div>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
            Election Active
          </span>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <p className="text-slate-500 text-sm">
              Election Status
            </p>

            <h2 className="text-2xl font-bold mt-2">
              Active
            </h2>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <p className="text-slate-500 text-sm">
              Positions
            </p>

            <h2 className="text-2xl font-bold mt-2">
              5
            </h2>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <p className="text-slate-500 text-sm">
              Vote Status
            </p>

            <h2 className={`text-2xl font-bold mt-2 ${student.has_voted ? "text-green-600" : "text-orange-600"}`}>
              {student.has_voted ? "Voted" : "Not Voted"}
            </h2>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <p className="text-slate-500 text-sm">
              Time Remaining
            </p>

            <h2 className="text-2xl font-bold mt-2">
              2d 14h
            </h2>

          </div>

        </div>

        {/* Election Information */}

        <div className="bg-white rounded-2xl p-8 shadow-sm">

          <h2 className="text-xl font-bold mb-4">
            Student Council Election 2026
          </h2>

          <p className="text-slate-600 leading-relaxed">
            Welcome to the official Kitale National Polytechnic
            Student Voting System. This platform allows
            students to securely cast their votes for
            student leaders.
          </p>

          <div className="mt-6">

            {student.has_voted ? (
              <button
                disabled
                className="inline-block bg-slate-400 text-white px-6 py-3 rounded-xl font-semibold cursor-not-allowed"
              >
                Vote Already Cast
              </button>
            ) : (
              <Link
                to="/student/vote"
                className="inline-block bg-[#800020] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#650019]"
              >
                Start Voting
              </Link>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default StudentDashboard;