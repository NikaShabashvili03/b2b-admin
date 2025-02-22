import axios from '../utils/axios'

export const login = async ({ email, password }) => {
  const response = await axios.post(`/admin/login`, { email, password });
  return response.data;
};

export const fetchProfile = async () => {
  const response = await axios.get(`/admin/profile`);
  return response.data;
};

export const logout = async () => {
  await axios.post(`/admin/logout`, {});
};
