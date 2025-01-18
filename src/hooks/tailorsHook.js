import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addTailor, deleteTailor, fetchTailors, tailorBlockOrUnblock } from "../api/tailors-api"


export const useFetchAllTailors=(pagesize,pagenum,search,status)=>{
    return useQuery({
        queryKey:["tailors"],
        queryFn:()=>fetchTailors(pagesize,pagenum,search,status)
    })
};

export const useBlockOrUnblockTailor=()=>{
    const queryClient =useQueryClient();
    return useMutation({
        mutationFn:tailorBlockOrUnblock,
        onSuccess :(data)=>{
            console.log(data);
            queryClient.invalidateQueries({queryKey:["tailors"]})
        },
    })
};

export const useAddTailor=()=>{
    const queryClient =useQueryClient();
    return useMutation({
        mutationFn:addTailor,
        onSuccess :(data)=>{
            console.log(data);
            queryClient.invalidateQueries({queryKey:["tailors"]})
        },
    })
}

export const useDeleteTailor=()=>{
    
    const queryClient =useQueryClient();
    return useMutation({
        mutationFn:deleteTailor,
        onSuccess :(data)=>{
            console.log(data);
            queryClient.invalidateQueries({queryKey:["tailors"]})
        },
    })
}