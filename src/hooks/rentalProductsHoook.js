import { useQuery } from "@tanstack/react-query";
import { fetchRentalProducts } from "../api/rentalProducts-api";
import { FetchRentalById } from "../api/rentalProducts-api";
export const UsefetchAllRentalProducts = (pagenumber = 1, pagesize = 10,gender,garmenttype,fabrictype,searchdata,minPrice,maxPrice) => {
  return useQuery({
    queryKey: ["rentalPrdoducts", pagenumber,pagesize,gender,garmenttype,fabrictype,searchdata,minPrice,maxPrice],
    queryFn: fetchRentalProducts,
    onError: (error) => {
      console.log("error",error);
    },
  });
};

export const UseFetchReantalById=(id)=>{
  return useQuery({
   queryKey:[id],
   queryFn:FetchRentalById
  });
}
