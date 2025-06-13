import axios from "@/lib/axios";

export const getAllCategories = async () => {
    const response = await axios.get("/categories");
    return response.data;
};

export const createCategory = async (data) => {
    const response = await axios.post("/categories", data);
    return response.data;
};

export const updateCategory = async (id, data) => {
    const response = await axios.put(`/categories/${id}`, data);
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await axios.delete(`/categories/${id}`);
    return response.data;
};
