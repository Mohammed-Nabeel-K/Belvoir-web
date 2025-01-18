import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDeleveryBoy,deleveryBoyBlockOrUnblock, addDeleveryBoy, deleteDeleveryBoy } from "../api/deleveryboys-api";


export const UsefetchAlldeleveryBoys = (pageNo,pagesize,search) => {
  return useQuery({
    queryKey: ["deleveryBoys"],
    queryFn: ()=>fetchDeleveryBoy(pageNo,pagesize,search),
  });
};

export const UseBlockOrUnblockDeleveryBoy = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleveryBoyBlockOrUnblock,
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries({ queryKey: ["deleveryBoys"] }); 
      },
    });
  };
 
  export const useAddDeleveryBoy=()=>{
      const queryClient =useQueryClient();
      return useMutation({
          mutationFn:addDeleveryBoy,
          onSuccess :(data)=>{
              console.log(data);
              queryClient.invalidateQueries({queryKey:["deleveryBoys"]})
          },
      })
  }
  
  export const useDeleteDeleveryBoy=()=>{
      
      const queryClient =useQueryClient();
      return useMutation({
          mutationFn:deleteDeleveryBoy,
          onSuccess :(data)=>{
              console.log(data);
              queryClient.invalidateQueries({queryKey:["deleveryBoys"]})
          },
      })
  }