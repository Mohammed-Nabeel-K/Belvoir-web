import axiosInstance from "../../api/axiosinstance/axiosInstance";



export const fetchDesignWithoutQuery=async()=>{
    const response=await axiosInstance.get("/Design");
    return response.data
}
