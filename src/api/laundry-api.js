import axiosInstance from "../../axios/axiosinstance/axiosInstance"

export const fetchAllLaundryShops=async(pagesize,pagenum,search,status)=>{
    const response=await axiosInstance.get(`/Admin/users/laundry?SearchTerm=${search}&IsBlocked=${status}&PageSize=${pagesize}&pageNo=${pagenum}`);
    return response.data;
}

export const blockOrUnblockLaundryShops=async(id)=>{
    const response=await axiosInstance.patch(`/Admin/laundry/block-unblock/${id}`)
    return response.data;
}
export const addLaundryShops = async (values) => {
  
    const response = await axiosInstance.post(`/Admin/add/laundry`, values);
  
    return response.data;
  };
  
  
  
  export const deleteLaundryShop = async (id) => {

    const response = await axiosInstance.delete(`/Admin/delete/laundry?id=${id}`);
    return response.data;
  };
  