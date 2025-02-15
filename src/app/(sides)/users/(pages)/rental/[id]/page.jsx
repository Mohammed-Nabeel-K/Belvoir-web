"use client";
import { notFound, useParams } from "next/navigation";
import axiosInstance from "../../../../../../../axios/axiosinstance/axiosInstance";
import SimilarProducts from "../../../components/Rentals/SimilarProducts";
import Footer from "../../../components/ui/footer/Footer";
import Link from "next/link";
import RatingCard from "../../../components/Rentals/RatingCard";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Loadercustom from "../../../components/ui/Loader";
import Image from "next/image";
import Navbar from "../../../components/ui/navbar/Navbar";
import LoaderCustom from "../../../components/ui/Loader";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function RentalDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [cloth, setCloth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeimage, setactiveimage] = useState(null);
  const [similiarproducts, setsimiliarproducts] = useState(null);
  const [clicked, setclicked] = useState(false);
  const [rating, setrating] = useState();
  const [handlmore, sethandlmore] = useState(true);
  const [filterdata, setfilterdata] = useState({
    gender: "",
    garmenttype: "",
    fabrictype: "",
  });
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const [ratingloading, setratingloading] = useState(false);
  const [stars, setstars] = useState({
    fullstar: "",
    halfstar: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/Rental/id`, {
          params: { id },
        });
        setCloth(response.data.data);
        var defaultimg = response.data.data.images.find(
          (x) => x.isPrimary
        )?.imagePath;
        setactiveimage(defaultimg);
        const ratingres = await axiosInstance.get(`/Rental/rental-rating`, {
          params: { productid: id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userData")}`,
          },
        });

        setrating(ratingres.data.data);
        const fullStars = Math.floor(rating.averageRating);
        const halfStar = rating.averageRating % 1 >= 0.5 ? 1 : 0;
        setstars({ fullstar: fullStars, halfstar: halfStar });
        setratingloading(false);

        const similiarProductresponse = await axiosInstance.get(
          `/Rental/products`,
          {
            params: {
              pageSize: 8,
              pageNumber: 1,
              gender: response.data.data.gender,
              garmentType: response.data.data.garmenttype,
              fabricType: response.data.data.fabrictype,
            },
          }
        );
        const similarproduct = similiarProductresponse.data.data?.filter(
          (x) => x.id != response?.data.data.id
        );
        setsimiliarproducts(similarproduct?.data.data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch rental data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [handlmore]);

  if (loading) return <Loadercustom></Loadercustom>;
  if (cloth == null) return notFound();

  const handleRatingSubmit = async () => {
    if (userRating === 0 || reviewMessage.trim() === "") {
      toast.error("Please select a rating and enter a review message.");
      return;
    }
    try {
      const response=await axiosInstance.post(
        "/Rental/rental-rating",
        {
          message: reviewMessage, // Correct message mapping
          ratingvalue: userRating, // Correct rating value mapping
        },
        {
          params: {
            productid: id, // Ensure product ID is passed in params correctly
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
      if (error.response.status==400) {
        toast.error("User already reviewed for this product!");
      }else{
      toast.error("Failed to submit review. Please try again.");
      }
      if (error.response.status == 401) {
        toast.error("please login");
        router.push("/login");
      }
    }
  };

  const addToCart = async (item) => {
    const token = localStorage.getItem("userData");

    try {
      const response = await axiosInstance.post(
        "/RentalCart/AddToCart",
        {
          productId: item.id,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status == 200) {
        toast.success("item added to cart successfully");
        router.push("/users/cart");
      }

      return response.data;
    } catch (error) {
      if (error.response.status == 401) {
        toast.error("please login");
        router.push("/login");
      }
      console.error("cart", error);
    }
  };
  return (
    <>
      <Navbar></Navbar>
      {cloth && (
        <div className="container mx-auto mt-8 p-4 pb-[40px]">
          <div className="flex flex-col md:flex-row">
            {/* Image on the left side */}
            <div className="md:w-1/2 flex flex-col justify-center md:justify-start">
              <img
                src={activeimage && activeimage}
                alt="loading"
                className="w-96 h-[300px] object-cover object-left-top rounded-lg"
              />
              <div>
                {cloth?.images?.map(
                  (image, index) =>
                    image.imagePath != activeimage && (
                      <img
                        onClick={() => setactiveimage(image.imagePath)}
                        key={index}
                        src={image.imagePath}
                        alt={`Image ${index + 1}`}
                        className="w-[50px] h-[50px] object-cover rounded-lg mt-4 mx-3"
                      />
                    )
                )}
              </div>
            </div>

            {/* Title, Price, Description, and Buttons on the right side */}
            <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
              <h1 className="text-3xl font-bold">{cloth.title}</h1>
              <p className="text-lg mt-4">{cloth.description}</p>
              <div className="text-xl font-bold mt-4 flex w-[100%] items-center justify-between">
                <p>₹{cloth?.price}</p>
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={() => setclicked(!clicked)}
                  className={clicked ? "text-red-600" : "text-gray-300"}
                />
              </div>
              {/* Buttons */}
              <div className="mt-6 font-sans flex justify-between">
                {/* <Link href={"/users/cart"}>
                  <button className="bg-violet-950 text-white px-6 py-2 rounded-full mr-4 hover:bg-zinc-600">
                    Checkout in cart
                  </button>
                </Link> */}

                <button
                  className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700"
                  onClick={() => addToCart(cloth.id)}
                >
                  Add to cart
                </button>
                {/* <div className="p-2 border-[2px] border-black rounded-l-2xl">
                  <button onClick={()=>handleDecrement()}><FontAwesomeIcon icon={faCaretLeft} className="size-5 cursor-pointer"/></button>
                  {quantity}
                  <button onClick={()=>handleIncrement()}><FontAwesomeIcon icon={faCaretRight} className="size-5 cursor-pointer"/></button>
                </div> */}
              </div>
            </div>
          </div>

          {/* Ratings */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Customer Ratings</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-bold">
                {rating?.averageRating}
              </span>
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
                onClick={()=>handleRatingSubmit()}
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
                    rating?.ratings.map((x, i) => (
                      <RatingCard key={i} data={x} />
                    ))
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

          {/* Similar Products */}
          <div>
            <SimilarProducts data={similiarproducts && similiarproducts} />
          </div>
        </div>
      )}

      <div>
        <Footer />
      </div>
    </>
  );
}
