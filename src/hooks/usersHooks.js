import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  fetchUsers, userBlockOrUnblock } from "../api/users-api";


export const UsefetchAllUsers =  (pagesize,pagenum,search,status) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: ()=>fetchUsers(pagesize,pagenum,search,status)
  });
};


export const UseBlockOrUnblockUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: userBlockOrUnblock,
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries({ queryKey: ["users"] }); 
      },
    });
  };
  