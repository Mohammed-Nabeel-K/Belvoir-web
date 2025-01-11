// import axios from "axios";

// export const fetchRentalProducts = async ({ queryKey }) => {
//   const [,pagenumber, pagesize] = queryKey;
//   console.log(pagenumber,pagesize)
//   const response = await axios.get(
//     `https://belvoir-rest-api.onrender.com/api/Rentals/paginated`,
//     { params: { pagenumber, pagesize } }
//   );

//   if (!response.ok) throw new Error("Failed to fetch users");
//   return response.data;
// };

// export const editRentalProducts = async () => {
//   const response = await axios.put(
//     "https://belvoir-rest-api.onrender.com/api/Rentals/update?id=${id}"
//   );
//   return response.data;
// };
