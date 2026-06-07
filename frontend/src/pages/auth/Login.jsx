import { useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  if (role === "student") {
    navigate("/verify-otp");
  } else {
    navigate("/admin");
  }
};

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#800020] text-white flex-col justify-center px-16">

        <img
          src={logo}
          alt="Kitale National Polytechnic"
          className="w-32 h-32 object-contain mb-8"
        />

        <h1 className="text-5xl font-bold leading-tight">
          Kitale National Polytechnic
          <br />
          Voting System
        </h1>

        <p className="mt-6 text-lg text-white/90 max-w-md">
          Secure, transparent and fair digital elections.
        </p>

        <div className="mt-12 space-y-4">

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>Secure</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>Anonymous Voting</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>Open</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>Election Transparency</span>
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-6">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <img
              src={logo}
              alt="Logo"
              className="w-24 h-24 object-contain"
            />
          </div>

          {/* Election Status */}
          <div className="mb-6">
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              ● Election Active
            </span>
          </div>

          <h2 className="text-4xl font-bold text-slate-800">
            Welcome
          </h2>

          <p className="text-slate-500 mt-2">
            Login 
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {/* Username */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                {role === "student"
                  ? "Registration Number"
                  : "Administrator Username"}
              </label>

              <input
                type="text"
                placeholder={
                  role === "student"
                    ? "Enter registration number"
                    : "Enter administrator username"
                }
                className="w-full px-4 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#800020]"
              />

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full px-4 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#800020]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* Role Selection */}

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-3">
                Login As
              </label>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`py-3 rounded-xl font-medium transition-all ${
                    role === "student"
                      ? "bg-[#800020] text-white"
                      : "bg-white border border-slate-300 text-slate-700"
                  }`}
                >
                  Student
                </button>

                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`py-3 rounded-xl font-medium transition-all ${
                    role === "admin"
                      ? "bg-[#800020] text-white"
                      : "bg-white border border-slate-300 text-slate-700"
                  }`}
                >
                  Administrator
                </button>

              </div>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="w-full bg-[#800020] hover:bg-[#650019] text-white py-4 rounded-xl font-semibold transition-all"
            >
              Login
            </button>

            {/* Forgot Password */}

            <div className="text-center">

              <button
                type="button"
                className="text-[#800020] hover:underline"
              >
                Forgot Password?
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;