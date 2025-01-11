import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchTailors, tailorBlockOrUnblock } from "../api/tailors-api"


export const useFetchAllTailors=()=>{
    return useQuery({
        queryKey:["tailors"],
        queryFn:fetchTailors
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