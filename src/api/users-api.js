
import axios from "axios"


export const fetchUsers = async () => {
  const response = await fetch('https://belvoir-rest-api.onrender.com/api/Admin/User');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const userBlockOrUnblock = async (id) => {
  const response = await axios.patch(`https://belvoir-rest-api.onrender.com/api/Admin/user/block-unblock/${id}`);
  return response.data;
}


