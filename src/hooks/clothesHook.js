import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addClothes, deleteClothes,  fetchAllClothes } from "../api/clothes-api"



export const useFetchAllClothes=(search,pageNo,pageSize)=>{
    return useQuery({
        queryKey:["clothes"],
        queryFn:()=>fetchAllClothes(search,pageNo,pageSize)
    });
};

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
