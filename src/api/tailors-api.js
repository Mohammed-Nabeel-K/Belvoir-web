import axiosInstance from "../../axios/axiosinstance/axiosInstance";

export const fetchTailors = async (pagesize, pagenum, search, status) => {
  const response = await axiosInstance.get(
    `/Admin/users/tailor?SearchTerm=${search}&IsBlocked=${status}&PageSize=${pagesize}&pageNo=${pagenum}`
  );

  return response.data;
};

export const tailorBlockOrUnblock = async (id) => {
  const response = await axiosInstance.patch(
    `/Admin/tailor/block-unblock/${id}`
  );
  return response.data;
};
export const addTailor = async (values) => {
  const response = await axiosInstance.post(`/Admin/add/tailor`, values);

  return response.data;
};

export const deleteTailor = async (id) => {
  console.log(id);
  const response = await axiosInstance.delete(`/Admin/delete/tailor?id=${id}`);
  return response.data;
};
