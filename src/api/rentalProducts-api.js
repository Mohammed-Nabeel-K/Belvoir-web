import axiosInstance from "../../api/axiosinstance/axiosInstance";

export const fetchRentalProducts = async ({ queryKey }) => {
  const [, pagenumber, pagesize] = queryKey;
  const response = await axiosInstance.get(`/Rentals/paginated`, {
    params: { pagenumber: pagenumber, pagesize: pagesize },
  });
  console.log("the data is --", response.data);
  return response.data;
};

export const editRentalProducts = async () => {
  const response = await axiosInstance.put(`/Rentals/update?id=${id}`);
  return response.data;
};
