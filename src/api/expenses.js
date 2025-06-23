import axios from "@/lib/axios";

export const getAllExpenses = async () => {
    const response = await axios.get("/expenses");
    return response.data;
};

export const getExpenseById = async (id) => {
    const response = await axios.get(`/expenses/${id}`);
    return response.data;
};

export const getStatsByCategory = async () => {
    const response = await axios.get("/expenses/stats/category");
    return response.data;
};

export const getStatsByMonth = async () => {
    const response = await axios.get("/expenses/stats/month");
    return response.data;
};

export const getStatsByFriend = async () => {
    const response = await axios.get("/expenses/stats/friend");
    return response.data;
};

export const createExpense = async (data) => {
    const response = await axios.post("/expenses", data);
    return response.data;
};

export const updateExpense = async (id, data) => {
    const response = await axios.put(`/expenses/${id}`, data);
    return response.data;
};

export const deleteExpense = async (id) => {
    const response = await axios.delete(`/expenses/${id}`);
    return response.data;
};
