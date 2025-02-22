
import axios from '../utils/axios'

export const fetchAllProduct = async ({ subcategoryId }) => {
  const response = await axios.get(`/product/subcategory/${subcategoryId}`);
  return response.data;
}

// name, prod_id, price, description, images, categoryId, quantity, subcategoryId, attributes
// attributes = {name: value, name2: value2}
export const createProduct = async (data) => {
  const response = await axios.post(`/product`, data);
  return response.data;
}


export const editProduct = async (id, data) => {
  const response = await axios.put(`/product/${id}`, data);
  return response.data;
}

export const deleteProduct = async (id) => {
  const response = await axios.delete(`/product/${id}`);
  return response.data;
}