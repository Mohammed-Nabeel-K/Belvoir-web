
// import { notFound } from "next/navigation";
// import axiosInstance from "../../../../../../../api/axiosinstance/axiosInstance";

// export default async function ClothDetail({ params }) {
//   const { id } = params;

//   const fetchCloth = async (id) => {
//     try {
//       const response = await axiosInstance.get(`/Clothes/${id}`);
//       return response.data;
//     } catch (error) {
//       return null;
//     }
//   };

//   const res = await fetchCloth(id);
//   const cloth = res.data;

//   if (!res) {
//     notFound();
//   }

//   return (
//     <div className="container mx-auto mt-8 p-4">
//       <div className="flex flex-col md:flex-row">
//         {/* Image on the left side */}
//         <div className="md:w-1/2 flex justify-center md:justify-start">
//           <img
//             src={cloth.imageUrl}
//             alt={cloth.title}
//             className="w-96 h-64 object-cover rounded-lg"
//           />
//         </div>

//         {/* Title, Price, Description, and Buttons on the right side */}
//         <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
//           <h1 className="text-3xl font-bold">{cloth.title}</h1>
//           <p className="text-lg mt-4">{cloth.description}</p>
//           <div className="text-xl font-bold mt-4">Price: ₹{cloth.price}</div>

//           {/* Buttons */}
//           <div className="mt-6 font-sans">
//             <button className="bg-violet-950 text-white px-6 py-2 rounded-full mr-4 hover:bg-zinc-600">
//               Select Design
//             </button>
//             <button className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700">
//               Wishlist
//             </button>
//           </div>
//         </div>

//         {/* ratings */}
//         <div>
          
//         </div>
//       </div>
//     </div>
//   );
// }

import { notFound } from "next/navigation";
import axiosInstance from "../../../../../../../api/axiosinstance/axiosInstance";
import SimilarProducts from "../../../components/clothes/SimilarProducts";
import Footer from "../../../components/ui/footer/Footer";
import Link from "next/link";

export default async function ClothDetail({ params }) {
  const { id } = params;

  const fetchCloth = async (id) => {
    try {
      const response = await axiosInstance.get(`/Clothes/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const res = await fetchCloth(id);
  const cloth = res?.data;

  if (!res) {
    notFound();
  }

  return (
    <>
    <div className="container mx-auto mt-8 p-4">
      <div className="flex flex-col md:flex-row">
        {/* Image on the left side */}
        <div className="md:w-1/2 flex justify-center md:justify-start">
          <img
            src={cloth.imageUrl}
            alt={cloth.title}
            className="w-96 h-64 object-cover rounded-lg"
          />
        </div>

        {/* Title, Price, Description, and Buttons on the right side */}
        <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
          <h1 className="text-3xl font-bold">{cloth.title}</h1>
          <p className="text-lg mt-4">{cloth.description}</p>
          <div className="text-xl font-bold mt-4">Price: ₹{cloth.price}</div>

          {/* Buttons */}
          <div className="mt-6 font-sans">
            <Link href={"/users/Design"}>
            <button className="bg-violet-950 text-white px-6 py-2 rounded-full mr-4 hover:bg-zinc-600">
              Select Design
            </button>
            </Link>
            <button className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700">
              Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Ratings */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Customer Ratings</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-2xl font-bold">4.5</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={i < 4.5 ? "#FFD700" : "#D1D5DB"}
                className="w-6 h-6"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-600">(250 reviews)</span>
        </div>

        {/* Reviews Section */}
        <div className="mt-4">
          <h4 className="text-md font-medium">Review Title</h4>
          <p className="text-gray-700 mt-2">
            This is an amazing product! The quality is top-notch and the fabric is really comfortable.
          </p>
        </div>
      </div>

      {/* Similar Products */}
      <div>
        <SimilarProducts materialType={cloth.materialType} id={cloth.id} />
      </div>


      {/* footer */}

     
    </div>
     <div>
     <Footer/>
   </div>
   </>
  );
}
