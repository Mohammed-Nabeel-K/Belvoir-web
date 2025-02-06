import axiosInstance from "../../axios/axiosinstance/axiosInstance"


export const fetchAllClothes = async ({
    search ="",
    sortBy ="price" ,
    isDescending ="false",
    Material ="",
    DesignPattern="",
    minPrice = 0,
    maxPrice = 10000,
    pageNo = 1,
    pageSize = 10
  }) => {
    const response = await axiosInstance.get(
      `/Clothes/get?SearchTerm=${search}&SortBy=${sortBy}&IsDescending=${isDescending}&Material=${Material}&DesignPattern=${DesignPattern}&MinPrice=1&MinPrice=${minPrice}&MaxPrice=${maxPrice}&PageNo=${pageNo}&PageSize=${pageSize}`
    );


    
    return response.data;
  };

  
export const fetchClothesWithoutQuery=async()=>{
    const response=await axiosInstance.get("/Clothes/get");
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
