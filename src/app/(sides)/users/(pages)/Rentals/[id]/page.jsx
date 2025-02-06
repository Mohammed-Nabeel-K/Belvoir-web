"use client";
import { notFound, useParams } from "next/navigation";
import axiosInstance from "../../../../../../../axios/axiosinstance/axiosInstance";
import SimilarProducts from "../../../components/Rentals/SimilarProducts";
import Footer from "../../../components/ui/footer/Footer";
import Link from "next/link";
import RatingCard from "../../../components/Rentals/RatingCard";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Loadercustom from "../../../components/ui/Loader"
import Image from "next/image";
import Navbar from "../../../components/ui/navbar/Navbar";
export default function RentalDetail() {
  const params = useParams();
  const id = params?.id ;
  const [cloth, setCloth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeimage, setactiveimage] = useState(null);
  const [similiarproducts, setsimiliarproducts] = useState(null)
  const [clicked, setclicked] = useState(false);
  const [rating, setrating] = useState();
  const [filterdata, setfilterdata] = useState({
    gender: "",
    garmenttype: "",
    fabrictype: "",
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/Rentals/id`, {
          params: { id },
        });
        setCloth(response.data.data);
        var defaultimg = response.data.data.images.find((x) => x.isPrimary)?.imagePath;
        setactiveimage(defaultimg);
        const similiarProductresponse =await axiosInstance.get(`/Rentals/category`,{
          params:{
            gender:response.data.data.gender,
            garmentType:response.data.data.garmenttype,
            fabricType:response.data.data.fabrictype
          }
        })
        setsimiliarproducts(similiarProductresponse.data.data);

        const ratingres = await axiosInstance.get(`/Rentals/rental-rating`, {
          params: {productid:id},
          headers:{
            Authorization :`Bearer ${localStorage.getItem("userData")}`
          }
        });
        setrating(ratingres.data.data);
       
      } catch (err) {
        console.log(err);
        setError("Failed to fetch rental data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  if (loading)
    return (
      <Loadercustom></Loadercustom>
    );
  if (cloth == null) return notFound() ;
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
             {cloth?.images?.map((image, index) => (
              image.imagePath!=activeimage && (
                <img
                  onClick={() => setactiveimage(image.imagePath)}
                  key={index}
                  src={image.imagePath}
                  alt={`Image ${index + 1}`}
                  className="w-[50px] h-[50px] object-cover rounded-lg mt-4 mx-3"
                />
              )
            ))}
             </div>
            </div>

            {/* Title, Price, Description, and Buttons on the right side */}
            <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
              <h1 className="text-3xl font-bold">{cloth.title}</h1>
              <p className="text-lg mt-4">{cloth.description}</p>
              <div className="text-xl font-bold mt-4 flex w-[100%] items-center justify-between">
                <p>Price: ₹{cloth?.price}</p>
                <FontAwesomeIcon icon={faHeart} onClick={()=>setclicked(!clicked)} className={clicked?"text-red-600":"text-gray-300"}/>
                </div>
              {/* Buttons */}
              <div className="mt-6 font-sans">
                <Link href={"/users/Design"}>
                  <button className="bg-violet-950 text-white px-6 py-2 rounded-full mr-4 hover:bg-zinc-600">
                    Place an order
                  </button>
                </Link>
                <button className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700">
                  Add to cart
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
                {rating?rating.map((x, i) => (
                  <RatingCard key={i} data={x}></RatingCard>
                )):
                <div className="text-gray-500 ">No Reviews Yet..</div>
                }
              </div>
              <button className="p-3 rounded-[20px] bg-[#0F172A] my-4 w-max text-white text-[12px] block m-auto">
                View More
              </button>
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
