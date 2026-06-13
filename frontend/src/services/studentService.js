import api from "./api";

export const getCurrentStudent = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
