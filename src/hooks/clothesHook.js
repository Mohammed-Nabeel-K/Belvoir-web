import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addClothes, clothesfilterBy, deleteClothes,  fetchAllClothes } from "../api/clothes-api"




export const useFetchAllClothes = (
  search ,
  sortBy ,
  isDescending ,
  Material ,
  Color,
  DesignPattern,
  minPrice = 0,
  maxPrice = 10000,
  pageNo = 1,
  pageSize = 10
) => {
  console.log("hoook",Material)
  return useQuery({
    queryKey: ["clothes", search, sortBy, isDescending, Material,Color,DesignPattern, minPrice, maxPrice, pageNo, pageSize],
    queryFn: () =>
      fetchAllClothes({
        search,
        sortBy,
        isDescending,
        Material,
        Color,
        DesignPattern,
        minPrice,
        maxPrice,
        pageNo,
        pageSize
      }),
    keepPreviousData: true, // Helps with pagination performance
    staleTime: 300000, // 5 minutes to avoid unnecessary refetching
  });
};



export const useClothesFilterBy=()=>{
  return useQuery({
    queryKey:['clothes'],
    queryFn:clothesfilterBy
  })
};

// export const useFetchRatings=(id)=>{
//   return useQuery({
//     queryKey:['clothes',id],
//     queryFn:()=>fetchRating({id})
//   })
// };
export const useAddClothes=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:addClothes,
        onSuccess:(data)=>{
            console.log(data);
            queryClient.invalidateQueries({queryKey:["clothes"]})
        }
    })
}
export const useDeleteClothes=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:deleteClothes,
        onSuccess:(data)=>{
            console.log(data);
            queryClient.invalidateQueries({queryKey:["clothes"]})
        }
    })
}
// export const useEditClothes=()=>{
//     const queryClient=useQueryClient();
//     return useMutation({
//         mutationFn:editClothes,
//         onSuccess:(data)=>{
//             console.log(data);
//             queryClient.invalidateQueries({queryKey:["clothes"]})
//         }
//     })
// }
export const useEditClothes = () => {
    return useMutation(({ id, formData }) =>
      axiosInstance.put(`/Clothes/update${id}`, formData)
    );
  };
