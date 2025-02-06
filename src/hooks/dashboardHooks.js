
import { useQuery } from "@tanstack/react-query";
import {fetchDetails} from "../api/dashboard-api"
 
export const useFetchDetails=()=>{

    return useQuery({
        querykey:["details"],
        queryFn:fetchDetails
    })
}


