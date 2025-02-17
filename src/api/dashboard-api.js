
import axiosInstance from "../../axios/axiosinstance/axiosInstance"


export const fetchDetails=async()=>{
    const response=await axiosInstance.get("/Admin/Dashboard",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userData")}`, 
        },
      });
    return response.data
}