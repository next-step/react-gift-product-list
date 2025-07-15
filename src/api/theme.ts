import axiosInstance from "./axiosInstance";

export const fetchTheme = async () => {
  const response = await axiosInstance.get("/api/themes");
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return response.data;
};
