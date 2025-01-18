import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addLaundryShops, blockOrUnblockLaundryShops, deleteLaundryShop, fetchAllLaundryShops } from "../api/laundry-api"


export const useFetchAllLaundryShops=(pagesize,pagenum,search,status)=>{
    return useQuery({
        queryKey:["laundryShops"],
        queryFn:()=>fetchAllLaundryShops(pagesize,pagenum,search,status)
    })
}

export const useBlockOrUnblockLaundryShops=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:blockOrUnblockLaundryShops,
        onSuccess :(data)=>{
            console.log(data);
            queryClient.invalidateQueries({queryKey:["laundryShops"]})
        },
      
    })
}

export const useAddLaundryShops=()=>{
    const queryClient =useQueryClient();
    return useMutation({
        mutationFn:addLaundryShops,
        onSuccess :(data)=>{
            console.log(data);
            queryClient.invalidateQueries({queryKey:["laundryShops"]})
        },
    })
}

export const useDeleteLaundryShop=()=>{
    
    const queryClient =useQueryClient();
    return useMutation({
        mutationFn:deleteLaundryShop,
        onSuccess :(data)=>{
            console.log(data);
            queryClient.invalidateQueries({queryKey:["laundryShops"]})
        },
    })
}