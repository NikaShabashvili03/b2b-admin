
import axios from '../utils/axios'


export const fetchAllCustomer = async () => {
  const response = await axios.get(`/user/all`);
  return response.data;
}