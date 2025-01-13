import { useQuery } from "@tanstack/react-query";
import { fetchRentalProducts } from "../api/rentalProducts-api";

export const UsefetchAllRentalProducts = (pagenumber = 1, pagesize = 10) => {
  return useQuery({
    queryKey: ["rentalProducts", pagenumber, pagesize],
    queryFn: fetchRentalProducts,
    onError: (error) => {
      console.log("error",error);
    },
  });
};
