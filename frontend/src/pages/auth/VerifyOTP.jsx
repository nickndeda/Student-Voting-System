import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";

function VerifyOTP() {
  const { registrationNumber, verifyOtp } = useAuth();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (!registrationNumber) {
      navigate("/");
    }
  }, [registrationNumber, navigate]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const otpCode = otp.join("");

    try {
      const response = await verifyOtp(otpCode);
      if (response.success) {
        navigate("/student");
      } else {
        setError(response.message || "Invalid or expired OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("OTP verification failed. Please try again.");
    } finally {
      setSubmitting(false);
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
          OTP
          <br />
          Verification
        </h1>

        <p className="mt-6 text-lg text-white/90 max-w-md">
          To protect election integrity, verify your identity using the
          one-time password sent to your registered phone number and email.
        </p>


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

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

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
              disabled={submitting}
              className="w-full bg-[#800020] hover:bg-[#650019] text-white py-4 rounded-xl font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Verifying..." : "Verify OTP"}
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