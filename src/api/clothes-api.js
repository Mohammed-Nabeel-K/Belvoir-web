import axiosInstance from "../../axios/axiosinstance/axiosInstance"




export const fetchAllClothes = async ({
  search = "",
  sortBy = "price",
  isDescending = "false",
  Material = [],
  Color = [],
  DesignPattern = [],
  minPrice = "",
  maxPrice = "",
  pageNo = "",
  pageSize = "",
}) => {
  
  try {
   
    const forcolor = Color.map((col) => `Colors=${encodeURIComponent(col)}`).join("&");
    const formaterial = Material.map((mat) => `Material=${encodeURIComponent(mat)}`).join("&");
    const forDesign = DesignPattern.map((des) => `DesignPattern=${encodeURIComponent(des)}`).join("&");

    const url = `/Clothes/get?SearchTerm=${search}&SortBy=${sortBy}&IsDescending=${isDescending}&${formaterial}&${forcolor}&${forDesign}&MinPrice=${minPrice}&MaxPrice=${maxPrice}&PageNo=${pageNo}&PageSize=${pageSize}`;
    const response = await axiosInstance.get(url);
    console.log("Response Data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching clothes data: ", error);
    return null;
  }
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

export const clothesfilterBy=async()=>{
    const response=await axiosInstance.get("/Clothes/cloth-category");
    return response.data
}

// export const fetchRating=async({id})=>{
//     const response=await axiosInstance.get(`/Clothes/cloth-rating?productid=${id}`);
//     return response.data
// }
