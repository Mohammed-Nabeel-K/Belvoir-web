import axiosInstance from "../../api/axiosinstance/axiosInstance"


export const fetchAllClothes =async()=>{
    const response= await axiosInstance.get("/Cloths/cloths");
    return response.data
}