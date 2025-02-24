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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ClothDetail({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [cloth, setCloth] = useState(null);
  const [rating, setrating] = useState({ averageRating: 0, count: 0, ratings: [] });
  const [userRating, setUserRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const [ratingloading, setratingloading] = useState(false);
  const [stars, setstars] = useState({
    fullstar: "",
    halfstar: "",
  });
  const [handlmore, sethandlmore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/Clothes/${id}`);
        setCloth(res.data.data);

        const ratingres = await axiosInstance.get(`/Rating/get`, {
          params: { entityId: id, rating_to: "cloth" },
        });
        console.log(ratingres.data.data);
        
        setrating(ratingres.data.data);
        const fullStars = Math.floor(rating.averageRating);
        const halfStar = rating.averageRating % 1 >= 0.5 ? 1 : 0;
        setstars({ fullstar: fullStars, halfstar: halfStar });
        setratingloading(false);
      } catch (error) {
        console.error("Error fetching cloth details:", error);
        notFound();
      }
    };

    fetchData();
  }, [id]);

  const handleRatingSubmit = async () => {
    if (userRating === 0 || reviewMessage.trim() === "") {
      toast.error("Please select a rating and enter a review message.");
      return;
    }
    try {
      const response = await axiosInstance.post(
        "/Rating/Add",
        {
          message: reviewMessage,
          ratingvalue: userRating,
        },
        {
          params: {
            entityId: id,
            rating_to: "cloth",
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userData")}`,
          },
        }
      );
      toast.success("Review submitted successfully!");
      setUserRating(0);
      setReviewMessage("");
    } catch (error) {
      if (error.response.status == 400) {
        toast.error("User already reviewed for this product!");
      } else {
        toast.error("Failed to submit review. Please try again.");
      }
      if (error.response.status == 401) {
        toast.error("please login");
        router.push("/login");
      }
    }
  };
  const handleSelectCloth = () => {
    localStorage.setItem("selectedCloth", JSON.stringify(cloth));
    router.push("/users/Design");
  };

  if (!cloth) return <LoadingUi />;

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="container mx-auto mt-8 p-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 flex justify-center md:justify-start">
            <img
              src={cloth.imageUrl}
              alt={cloth.title}
              className="w-96 h-64 object-cover rounded-lg"
            />
          </div>

          <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
            <h1 className="text-3xl font-bold">{cloth.title}</h1>
            <p className="text-lg mt-4">{cloth.description}</p>
            <div className="text-xl font-bold mt-4">Price: ₹{cloth.price}</div>

            <div className="mt-6 font-sans">
              <button
                onClick={handleSelectCloth}
                className="bg-violet-950  text-white px-6 py-2 rounded-full mr-4 hover:bg-zinc-600"
              >
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
            <span className="text-2xl font-bold">{rating?.averageRating}</span>
            <div className="flex">
              {/* Render full stars */}
              {rating?.averageRating != 0 &&
                [...Array(stars?.fullstar)].map((_, i) => (
                  <svg
                    key={`full-${i}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#FFD700"
                    className="w-6 h-6"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}

              {/* Render half star */}
              {stars?.halfstar === 1 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#FFD700"
                  className="w-6 h-6"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              )}
            </div>
            <span className="text-gray-600">({rating?.count} reviews)</span>
          </div>
          {/* add Rating */}
          <div className="mt-6 p-6 rounded-lg ">
            <h3 className="text-lg ">Leave a Review</h3>
            <div className="flex items-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={faStar}
                  className={`text-2xl cursor-pointer mx-1 ${
                    userRating >= star ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => setUserRating(star)}
                />
              ))}
            </div>
            <textarea
              className="w-full mt-3 p-2 border rounded-lg"
              rows="3"
              placeholder="Write your review..."
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
            ></textarea>
            <button
              className="mt-3 bg-[#0E0E25] text-white px-4 py-2 rounded-lg "
              onClick={() => handleRatingSubmit()}
            >
              Submit Review
            </button>
          </div>

          <div className="mt-4">
            <h4 className="text-md font-medium">Rating Review</h4>
            <div className="grid gap-2 lg:grid-cols-3 sm:grid-cols-12 relative">
              {rating ? (
                handlmore ? (
                  rating?.ratings
                    .slice(0, 3)
                    .map((x, i) => <RatingCard key={i} data={x} />)
                ) : (
                  rating?.ratings.map((x, i) => <RatingCard key={i} data={x} />)
                )
              ) : (
                <div className="text-gray-500">No Reviews Yet..</div>
              )}
            </div>

            <div className="flex justify-between mt-4">
              {ratingloading && <p className="text-gray-500">Loading...</p>}
              {rating && rating.Length > 3 && (
                <button
                  className="p-3 rounded-[20px] bg-[#0F172A] my-4 w-max text-white text-[12px] block m-auto"
                  onClick={() => {
                    sethandlmore(!handlmore);
                    setratingloading(true);
                  }}
                >
                  {handlmore ? "View more" : "View less"}
                </button>
              )}
            </div>
          </div>
        </div>

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
