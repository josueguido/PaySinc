import axios from "axios";

export const getUserById = async (id) => {
  const response = await axios.get(`/users/${id}`);
  return response.data;
}

export const updateUser = async (id, data) => {
  const response = await axios.put(`/users/${id}`, data);
  return response.data;
}