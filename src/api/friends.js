import axios from "axios";

export const getAllFriends = async () => {
  const response = await axios.get("/friends");
  return response.data;
}

export const getFriendById = async (id) => {
  const response = await axios.get(`/friends/${id}`);
  return response.data;
}

export const createFriend = async (data) => {
  const response = await axios.post("/friends", data);
  return response.data;
}

export const updateFriend = async (id, data) => {
  const response = await axios.put(`/friends/${id}`, data);
  return response.data;
}

export const deleteFriend = async (id) => {
  const response = await axios.delete(`/friends/${id}`);
  return response.data;
}