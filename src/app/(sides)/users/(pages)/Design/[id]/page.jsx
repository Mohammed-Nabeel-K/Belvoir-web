import { notFound } from "next/navigation";
import axiosInstance from "../../../../../../../api/axiosinstance/axiosInstance";
import SimilarProducts from "../../../components/clothes/SimilarProducts";
import Footer from "../../../components/ui/footer/Footer";
import Link from "next/link";

export default async function DesignDetail({ params }) {
  const { id } = params;

  const fetchDesign = async (id) => {
    try {
      const response = await axiosInstance.get(`/Design/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const res = await fetchDesign(id);
  const design = res?.data;

  if (!res) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto mt-8 p-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 flex flex-col items-center md:items-start">
            <img
              src={design.images[0].imageUrl}
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
              <Link href={"/users/Measurements"}>
                <button className="bg-violet-950 text-white px-6 py-2 rounded-full mr-4 hover:bg-zinc-600">
                  Make custom fit
                </button>
              </Link>
              <button className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700">
                Wishlist
              </button>
            </div>
          </div>
        </div>

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

          <div className="mt-4">
            <h4 className="text-md font-medium">Review Title</h4>
            <p className="text-gray-700 mt-2">
              This is an amazing product! The quality is top-notch and the fabric is really comfortable.
            </p>
          </div>
        </div>

        <div>
          <SimilarProducts category={design.category} id={design.id} />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}
