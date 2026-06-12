const otpStore = new Map();
const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes

const generateOtp = (registrationNumber) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(registrationNumber, {
    otp,
    expiresAt: Date.now() + OTP_TTL_MS,
  });
  return otp;
};

const verifyOtp = (registrationNumber, otp) => {
  const entry = otpStore.get(registrationNumber);

  if (!entry) {
    return false;
  }

  if (Date.now() > entry.expiresAt) {
    otpStore.delete(registrationNumber);
    return false;
  }

  if (entry.otp !== otp) {
    return false;
  }

  otpStore.delete(registrationNumber);
  return true;
};

module.exports = {
  generateOtp,
  verifyOtp,
};