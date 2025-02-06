import { useQuery } from "@tanstack/react-query";
import {fetchAlldesigns} from "../api/design-api"



// export const useFetchDesignWithoutQuery=()=>{
//     return useQuery({
//         queryKey:["design"],
//         queryFn:fetchDesignWithoutQuery
//     });
// };
export const useFetchAllDesigns = (
    Name,
    Category,
    SortBy = "price",
    IsDescending = "false",
    PageNo = 1,
    PageSize = 10
  ) => {
    return useQuery({
      queryKey: ["designs", Name, Category, SortBy, IsDescending, PageNo, PageSize],
      queryFn: () =>
        fetchAlldesigns({
          Name,
          Category,
          SortBy,
          IsDescending,
          PageNo,
          PageSize,
        }),
      keepPreviousData: true, // Helps with pagination performance
      staleTime: 300000, // 5 minutes to avoid unnecessary refetching
    });
  };
  