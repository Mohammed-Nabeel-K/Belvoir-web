
import axiosInstance from '../../axios/axiosinstance/axiosInstance'

export const fetchUsers = async (pagesize,pagenum,search,status) => {
  const response = await axiosInstance.get(`/Admin/users/user?SearchTerm=${search}&IsBlocked=${status}&PageSize=${pagesize}&pageNo=${pagenum}`);
 
  
  
  return response.data;
};

export const userBlockOrUnblock = async (id) => {
  const response = await axiosInstance.patch(`/Admin/user/block-unblock/${id}`);
  return response.data;
}


