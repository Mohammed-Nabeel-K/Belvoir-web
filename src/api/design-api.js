import axiosInstance from "../../axios/axiosinstance/axiosInstance";



// export const fetchDesignWithoutQuery=async()=>{
//     const response=await axiosInstance.get("/Design");
//     return response.data
// }

export const fetchAlldesigns=async({
    Name="",
    Category="",
    SortBy="price",
    IsDescending="false",
    PageNo =1,
    PageSize=10

})=>{
    const response =await axiosInstance.get(
        `/Design?Name=${Name}&Category=${Category}&SortBy=${SortBy}&IsDescending=${IsDescending}&PageNo=${PageNo}&PageSize=${PageSize}`
    );
    return response.data;
}
