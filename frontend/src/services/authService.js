import api, { setAuthToken } from "./api";

const TOKEN_KEY = "student_voting_token";
const USER_KEY = "student_voting_user";

export const login = async ({ registrationNumber, password }) => {
  const response = await api.post("/auth/login", {
    registrationNumber,
    password,
  });
  return response.data;
};

export const verifyOtp = async ({ registrationNumber, otp }) => {
  const response = await api.post("/auth/verify-otp", {
    registrationNumber,
    otp,
  });
  return response.data;
};

export const setToken = (token) => {
  if (!token) return;
  localStorage.setItem(TOKEN_KEY, token);
  setAuthToken(token);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  setAuthToken(null);
};

export const saveUser = (user) => {
  if (!user) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const logout = () => {
  removeToken();
  removeUser();
};

export const fetchCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export { setAuthToken };
