import axiosInstance from "../../axios/axiosinstance/axiosInstance";



export const fetchAlldesigns=async({
    Name="",
    Category="",
    MinPrice="",
    MaxPrice="",
    SortBy="price",
    IsDescending="",
    PageNo ="",
    PageSize=""


   
})=>{
    const response =await axiosInstance.get(
        `/Design?Name=${Name}&Category=${Category}&MinPrice=${MinPrice}&MaxPrice=${MaxPrice}&SortBy=${SortBy}&IsDescending=${IsDescending}&PageNo=${PageNo}&PageSize=${PageSize}`
    );
    return response.data;
}

export const getMeasurment=async(id)=>{
    const response =await axiosInstance.get(`Design/get/mesurments/${id}`);
    return response.data;

}
// export const saveMeasurement=async(values)=>{
//     const response=await axiosInstance.post(`/Design/add/mesurment/values`,values);
//     return response.data;
// }


// export const saveMeasurement = async (values) => {
//     const response = await axiosInstance.post(`/Design/add/mesurment/values`, values);
//     return response.data;
// };

export const saveMeasurement = async (values) => {
   
    const response = await axiosInstance.post(
      `/Design/add/mesurment/values`, 
      values,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userData")}`, // Attach token in the request headers
        },
      }
    );
  
    return response.data;
  };
  
  