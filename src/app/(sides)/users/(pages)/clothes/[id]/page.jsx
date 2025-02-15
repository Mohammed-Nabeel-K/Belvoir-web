

"use client";
import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import axiosInstance from "../../../../../../../axios/axiosinstance/axiosInstance";
import SimilarProducts from "../../../components/clothes/SimilarProducts";
import Footer from "../../../components/ui/footer/Footer";
import Navbar from "../../../components/ui/navbar/Navbar";
import RatingCard from "../../../components/Rentals/RatingCard";
import { useRouter } from "next/navigation";
import LoadingUi from "../../../components/ui/loading/loadingui";

export default function ClothDetail({ params }) {
  const { id } = use(params); // ✅ Unwrap params properly
  const router=useRouter();

  const [cloth, setCloth] = useState(null);
  const [rating, setRating] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/Clothes/${id}`);
        setCloth(res.data.data);

        const ratingRes = await axiosInstance.get(`/Clothes/cloth-rating`, {
          params: { productid: id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userData")}`,
          },
        });

        setRating(ratingRes.data.data);
      } catch (error) {
        console.error("Error fetching cloth details:", error);
        notFound(); // Redirect to 404 if data is not found
      }
    };

    fetchData();
  }, [id]); // ✅ Fetch when `id` changes

  const handleSelectCloth = () => {
    localStorage.setItem("selectedCloth", JSON.stringify(cloth));
    router.push("/users/Design");
  };
  

  if (!cloth) return <LoadingUi/>; // ✅ Prevents errors if cloth is not loaded

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="container mx-auto mt-8 p-4">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/2 flex justify-center md:justify-start">
            <img
              src={cloth.imageUrl}
              alt={cloth.title}
              className="w-96 h-64 object-cover rounded-lg"
            />
          </div>

          {/* Details */}
          <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
            <h1 className="text-3xl font-bold">{cloth.title}</h1>
            <p className="text-lg mt-4">{cloth.description}</p>
            <div className="text-xl font-bold mt-4">Price: ₹{cloth.price}</div>

            {/* Buttons */}
            <div className="mt-6 font-sans">
             
                <button onClick={handleSelectCloth} className="bg-violet-950  text-white px-6 py-2 rounded-full mr-4 hover:bg-zinc-600">
                  Select Design
                </button>
        
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
            <h4 className="text-md font-medium">Rating Review</h4>
            <div className="grid gap-2 lg:grid-cols-3 sm:grid-cols-12">
              {rating.length > 0 ? (
                rating.map((x, i) => <RatingCard key={i} data={x} />)
              ) : (
                <div className="text-gray-500 ">No Reviews Yet..</div>
              )}
            </div>
            <button className="p-3 rounded-[20px] bg-[#0F172A] my-4 w-max text-white text-[12px] block m-auto">
              View More
            </button>
          </div>
        </div>

        {/* Similar Products */}
        <div>
          <SimilarProducts materialType={cloth.materialType} id={cloth.id} />
        </div>
      </div>

      <div className="mt-60"> 
        <Footer />
      </div>
    </>
  );
}
