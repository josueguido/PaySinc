import axios from "@/lib/axios";

export const getAllGroups = async () => {
    const response = await axios.get("/groups");
    return response.data;
};

export const getGroupById = async (id) => {
    const response = await axios.get(`/groups/${id}`);
    return response.data;
};

export const createGroup = async (data) => {
    const response = await axios.post("/groups", data);
    return response.data;
};

export const updateGroup = async (id, data) => {
    const response = await axios.put(`/groups/${id}`, data);
    return response.data;
};

export const deleteGroup = async (id) => {
    const response = await axios.delete(`/groups/${id}`);
    return response.data;
};
