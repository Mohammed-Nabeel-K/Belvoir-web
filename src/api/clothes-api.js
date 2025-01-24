import axiosInstance from "../../api/axiosinstance/axiosInstance"


export const fetchAllClothes =async(search,pageNo,pageSize)=>{
    const response= await axiosInstance.get(`/Clothes/get?SearchTerm=${search}&PageNo=${pageNo}&PageSize=${pageSize}`);
    return response.data
}

export const addClothes=async(values)=>{
    const response=await axiosInstance.post("/Clothes/Add",values);
    return response.data
}
// export const editClothes=async(id,values)=>{
//     const response=await axiosInstance.put(`/Clothes?id=${id}`,values);
//     return response.data
// }
export const deleteClothes=async(id)=>{
    const response=await axiosInstance.delete(`/Clothes/delete/${id}`);
    return response.data
}
