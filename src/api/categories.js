import axios from '../utils/axios'

export const fetchAllCategory = async () => {
  const response = await axios.get(`/category`);
  return response.data;
}

export const editCategory = async (id, data) => {
  const response = await axios.put(`/category/${id}`, data);
  return response.data;
}

export const deleteCategory = async (id) => {
  const response = await axios.delete(`/category/${id}`);
  return response.data;
}

export const createCategory = async (data) => {
    const response = await axios.post(`/category`, data);
    return response.data;
}