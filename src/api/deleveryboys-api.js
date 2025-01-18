import axiosInstance from "../../api/axiosinstance/axiosInstance";

export const fetchDeleveryBoy = async (pageNo,pagesize,search) => {
  const response = await axiosInstance.get(`/Admin/users/delevery?SearchTerm=${search}&PageSize=${pagesize}&pageNo=${pageNo}`);

  return response.data;
};

export const deleveryBoyBlockOrUnblock = async (id) => {
  const response = await axiosInstance.patch(
    `/Admin/delevery/block-unblock/${id}`
  );
  return response.data;
};
export const addDeleveryBoy = async (values) => {
  const response = await axiosInstance.post(`/Admin/add/delevery`, values);

  return response.data;
};

export const deleteDeleveryBoy = async (id) => {
  console.log(id);
  const response = await axiosInstance.delete(`/Admin/delete/delevery?id=${id}`);
  return response.data;
};

