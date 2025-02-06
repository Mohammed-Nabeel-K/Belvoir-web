import axiosInstance from "../../axios/axiosinstance/axiosInstance";

export const fetchRentalProducts = async ({ queryKey }) => {
  const [, pagenumber, pagesize,gender,garmenttype,fabrictype,searchdata,minPrice,maxPrice] = queryKey;
  const response = await axiosInstance.get(`/Rentals/products`, {
    params: { pagenumber: pagenumber, pagesize: pagesize ,gender:gender,fabric_type:fabrictype,garmentType:garmenttype,searchName:searchdata,minPrice:minPrice,maxPrice:maxPrice},
  });
  return response.data;
};

export const FetchRentalById =async({queryKey})=>{
  const [id]=queryKey
  const response =await axiosInstance.get(`Rentals/${id}`)
  return response.data
} 

export const editRentalProducts = async () => {
  const response = await axiosInstance.put(`/Rentals/update?id=${id}`);
  return response.data;
};
