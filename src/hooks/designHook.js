import { useQuery } from "@tanstack/react-query";
import { fetchDesignWithoutQuery } from "../api/design-api";




export const useFetchDesignWithoutQuery=()=>{
    return useQuery({
        queryKey:["design"],
        queryFn:fetchDesignWithoutQuery
    });
};