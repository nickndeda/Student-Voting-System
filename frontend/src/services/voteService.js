import api from "./api";

export const submitVotes = async (votes) => {

  const response = await api.post(
    "/votes/submit",
    { votes }
  );

  return response.data;
};

export const getReceipt = async () => {
  const response = await api.get("/votes/receipt");
  return response.data;
};