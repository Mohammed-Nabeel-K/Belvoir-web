import { useQuery } from "@tanstack/react-query"
import { fetchAllClothes } from "../api/clothes-api"



export const useFetchAllClothes=()=>{
    return useQuery({
        queryKey:["clothes"],
        queryFn:fetchAllClothes
    });
};