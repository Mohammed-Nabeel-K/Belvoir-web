import axios from "axios";

export const fetchRentalProducts = async ({ queryKey }) => {
  const [, pagenumber, pagesize] = queryKey; 
  const response = await axios.get(
    `https://belvoir-rest-api-p2cq.onrender.com/api/Rentals/paginated`,
    { params: { pagenumber:pagenumber,pagesize:pagesize} }
  );
  console.log("the data is --",response.data)
  return response.data;

};

export const editRentalProducts = async () => {
  const response = await axios.put(
    "https://belvoir-rest-api.onrender.com/api/Rentals/update?id=${id}"
  );
  return response.data;
};
