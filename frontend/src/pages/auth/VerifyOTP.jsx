import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useEffect } from "react";

function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);

useEffect(() => {
  if (countdown === 0) return;

  const timer = setTimeout(() => {
    setCountdown((prev) => prev - 1);
  }, 1000);

  return () => clearTimeout(timer);
}, [countdown]);


  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const otpCode = otp.join("");

    console.log("OTP Submitted:", otpCode);

    // Navigate to student dashboard later
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
          OTP
          <br />
          Verification
        </h1>

        <p className="mt-6 text-lg text-white/90 max-w-md">
          To protect election integrity, verify your identity using the
          one-time password sent to your registered phone number and email.
        </p>

        <div className="mt-12 space-y-4">

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>Two-Factor Authentication</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>Secure Access Control</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>Protected Elections</span>
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-6">

        <div className="w-full max-w-md">

          <div className="lg:hidden flex justify-center mb-8">
            <img
              src={logo}
              alt="Logo"
              className="w-24 h-24 object-contain"
            />
          </div>

          <div className="mb-6">
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              ● Election Active
            </span>
          </div>

          <h2 className="text-4xl font-bold text-slate-800">
            Verify OTP
          </h2>

          <p className="text-slate-500 mt-2">
            Enter the 6-digit code sent to your registered phone number and institutional email.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-8"
          >

            {/* OTP BOXES */}
            <div className="flex justify-between gap-3">

              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) =>
                    handleChange(e.target.value, index)
                  }
                  className="w-14 h-14 text-center text-xl font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#800020]"
                />
              ))}

            </div>

            {/* VERIFY BUTTON */}

            <button
              type="submit"
              className="w-full bg-[#800020] hover:bg-[#650019] text-white py-4 rounded-xl font-semibold transition-all"
            >
              Verify OTP
            </button>

            {/* RESEND */}

            <div className="text-center">

              <p className="text-slate-500 text-sm mb-2">
                Didn't receive the code?
              </p>

              <button
                type="button"
                className="text-[#800020] font-medium hover:underline"
              >
                Resend OTP
              </button>

            </div>

            {/* COUNTDOWN */}

            <div className="text-center text-sm text-slate-500">
              Resend available in {countdown}s
            </div>

            {/* BACK */}

            <div className="text-center">

              <Link
                to="/"
                className="text-slate-600 hover:text-[#800020]"
              >
                ← Back to Login
              </Link>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default VerifyOTP;