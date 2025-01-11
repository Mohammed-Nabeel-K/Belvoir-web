import axios from "axios"


export const fetchTailors = async () => {
  const response = await fetch('https://belvoir-rest-api.onrender.com/api/Admin/tailor');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const tailorBlockOrUnblock = async (id) => {
  const response = await axios.patch(`https://belvoir-rest-api.onrender.com/api/Admin/tailor/block-unblock/${id}`);
  return response.data;
}
