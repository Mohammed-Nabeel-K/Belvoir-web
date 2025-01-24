
import axiosInstance from "../../api/axiosinstance/axiosInstance"


export const fetchDetails=async()=>{
    const response=await axiosInstance.get("/Admin/Dashboard");
    return response.data
}