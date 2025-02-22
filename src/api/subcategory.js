import axios from '../utils/axios';

export const fetchAllSubcategories = async (categoryId) => {
    const response = await axios.get(`/subcategory/category/${categoryId}`);
    return response.data;
};

export const editSubcategory = async (id, data) => {
    const response = await axios.put(`/subcategory/${id}`, data);
    return response.data;
};

export const deleteSubcategory = async (id) => {
    const response = await axios.delete(`/subcategory/${id}`);
    return response.data;
};

export const createSubcategory = async (data) => {
    const response = await axios.post(`/subcategory`, data);
    return response.data;
};
