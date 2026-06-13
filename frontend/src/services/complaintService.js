import api from "./api";

export const createComplaint = async (complaintData) => {

  const response = await api.post(
    "/complaints/create",
    complaintData
  );

  return response.data;

};