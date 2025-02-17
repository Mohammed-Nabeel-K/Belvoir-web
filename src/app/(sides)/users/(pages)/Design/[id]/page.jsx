

"use client";

import { useEffect,use, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../../../../../axios/axiosinstance/axiosInstance";
import Footer from "../../../components/ui/footer/Footer";
import CommonNavbar from "../../../components/navbar-common/CommonNavbar";
import SimilarProducts from "../../../components/Design/SimilarProductsDesign";
import LoadingUi from "../../../components/ui/loading/loadingui";
import { toast } from "react-toastify";

export default function DesignDetail({ params }) {
  const { id } =use(params);
  const router = useRouter();

  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await axiosInstance.get(`/Design/${id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userData")}`, 
          },
        });
        if (response.data) {
          setDesign(response.data.data);
          localStorage.setItem("selectedDesign", JSON.stringify(response.data.data));
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.error("Error fetching design:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };
    fetchDesign();
  }, [id, router]);

  const handleOpenModal = () => {

    const userData = localStorage.getItem("userData");
    if (userData) {
      setIsModalOpen(true);
    } else {
      router.push("/login"); 
      toast.error("please login")
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductName("");
  };

  const handleConfirm = () => {
    if (!productName.trim()) {
      alert("Please enter a product name.");
      return;
    }
    localStorage.setItem("customProductName", productName);
    handleCloseModal();
    router.push(`/users/Measurements/${id}`);
  };

  if (loading) return <LoadingUi />;
  if (!design) return null;

  return (
    <>
      <CommonNavbar />
      <div className="container mx-auto mt-8 p-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 flex flex-col items-center md:items-start">
            <img
              src={design.images[0]?.imageUrl}
              alt={design.title}
              className="w-96 h-64 object-cover rounded-lg"
            />
            <div className="flex gap-2 mt-6">
              {design.images.slice(1, 3).map((img, index) => (
                <div key={index} className="w-24 h-24">
                  <img
                    src={img.imageUrl}
                    alt={`Design image ${index + 2}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
            <h1 className="text-3xl font-bold">{design.title}</h1>
            <p className="text-lg mt-4">{design.description}</p>
            <div className="text-xl font-bold mt-4">Price: ₹{design.price}</div>

            <div className="mt-6 font-sans">
              <button
                onClick={handleOpenModal}
                className="bg-violet-950 text-white px-6 py-2 rounded-full mr-4 hover:bg-zinc-600"
              >
                Make custom fit
              </button>
              <button className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700">
                Wishlist
              </button>
            </div>
          </div>
        </div>

        <div>
          <SimilarProducts category={design.category} id={design.id} />
        </div>
      </div>
      <div className="mt-32">
        <Footer />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Enter your product Name</h2>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Product Name"
              className="w-full p-2 border rounded-lg"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


