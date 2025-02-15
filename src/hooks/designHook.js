import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {fetchAlldesigns, getMeasurment, saveMeasurement} from "../api/design-api"



// export const useFetchDesignWithoutQuery=()=>{
//     return useQuery({
//         queryKey:["design"],
//         queryFn:fetchDesignWithoutQuery
//     });
// };
export const useFetchAllDesigns = (
  Name="",
  Category="",
  MinPrice="",
  MaxPrice="",
  SortBy="price",
  IsDescending="",
  PageNo ="",
  PageSize=""
  ) => {
    return useQuery({
      queryKey: ["designs", Name, Category,MinPrice,MaxPrice, IsDescending, PageNo, PageSize],
      queryFn: () =>
        fetchAlldesigns({
          Name,
          Category,
          
          MinPrice,
          MaxPrice,
          SortBy,
          IsDescending,
          PageNo,
          PageSize,
        }),
      keepPreviousData: true, // Helps with pagination performance
      staleTime: 300000, // 5 minutes to avoid unnecessary refetching
    });
  };

  export const useGetMeasurement=(id)=>{
    return useQuery({
      queryKey:["designs",id],
      queryFn:()=>getMeasurment(id)
    })
  }
  

 



export const useSaveMeasurement = () => {
  const queryClient =useQueryClient();
  return useMutation({
    mutationFn: saveMeasurement, 
    onSuccess: (data) => {
      console.log("Measurement saved successfully:", data);
      queryClient.invalidateQueries({queryKey:["designs"]})
    },
    onError: (error) => {
      console.error("Error saving measurement:", error);
    },
  });
};
