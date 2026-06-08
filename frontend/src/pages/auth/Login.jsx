import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend authentication will be connected later
    navigate("/verify-otp");
  };

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* LEFT BRANDING SECTION */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#800020] text-white flex-col justify-center px-16">

        <img
          src={logo}
          alt="Kitale National Polytechnic"
          className="w-36 h-36 object-contain mb-8"
        />

        <h1 className="text-5xl font-bold leading-tight">
          Kitale National Polytechnic
          <br />
          Student Voting System
        </h1>

        <p className="mt-6 text-lg text-white/90 max-w-lg">
          Offering a secure, transparent and reliable digital election platform
          designed to uphold democratic participation and integrity.
        </p>

        <div className="mt-12 space-y-5">

          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-lg">Integrity</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-lg">Accountability </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-lg">Inclusivity</span>
          </div>

        </div>

      </div>

      {/* LOGIN SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <img
              src={logo}
              alt="Logo"
              className="w-24 h-24 object-contain"
            />
          </div>

          {/* Election Status */}
          <div className="flex justify-center mb-6">
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              ● Election Active
            </span>
          </div>

          <h2 className="text-4xl font-bold text-slate-800 text-center">
            Welcome
          </h2>

          <p className="text-slate-500 text-center mt-3 mb-8">
            Sign in using your student portal credentials
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Registration Number */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Registration Number
              </label>

              <input
                type="text"
                placeholder="Enter your registration number"
                className="w-full px-4 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                required
              />
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-[#800020]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="w-full bg-[#800020] hover:bg-[#650019] text-white py-4 rounded-xl font-semibold transition duration-300 shadow-md"
            >
              Continue
            </button>

            {/* Forgot Password */}

            <div className="text-center">
              <button
                type="button"
                className="text-[#800020] hover:underline text-sm font-medium"
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