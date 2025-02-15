
// import { notFound } from "next/navigation";
// import axiosInstance from "../../../../../../../axios/axiosinstance/axiosInstance";
// import Footer from "../../../components/ui/footer/Footer";
// import CommonNavbar from "../../../components/navbar-common/CommonNavbar";
// import SimilarProducts from "../../../components/Design/SimilarProductsDesign";


// export default async function DesignDetail({ params }) {
//   const { id } = params;

//   const fetchDesign = async (id) => {
//     try {
//       const response = await axiosInstance.get(`/Design/${id}`);
//       return response.data;
//     } catch (error) {
//       return null;
//     }
//   };


  
  
//   const res = await fetchDesign(id);
//   const design = res?.data;
//   localStorage.setItem("selectedDesign", JSON.stringify(design));


//   if (!res) {
//     notFound();
//   }

//   return (
//     <>
//     <CommonNavbar/>
//       <div className="container mx-auto mt-8 p-4">
//         <div className="flex flex-col md:flex-row">
//           <div className="md:w-1/2 flex flex-col items-center md:items-start">
//             <img
//               src={design.images[0].imageUrl}
//               alt={design.title}
//               className="w-96 h-64 object-cover rounded-lg"
//             />

//             <div className="flex gap-2 mt-6">
//               {design.images.slice(1, 3).map((img, index) => (
//                 <div key={index} className="w-24 h-24">
//                   <img
//                     src={img.imageUrl}
//                     alt={`Design image ${index + 2}`}
//                     className="w-full h-full object-cover rounded-md"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
//             <h1 className="text-3xl font-bold">{design.title}</h1>
//             <p className="text-lg mt-4">{design.description}</p>
//             <div className="text-xl font-bold mt-4">Price: ₹{design.price}</div>

//             <div className="mt-6 font-sans">
//               <Link href={`/users/Measurements/${id}`}>
//                 <button className="bg-violet-950 text-white px-6 py-2 rounded-full mr-4 hover:bg-zinc-600">
//                   Make custom fit
//                 </button>
//               </Link>
//               <button className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700">
//                 Wishlist
//               </button>
//             </div>
//           </div>
//         </div>

       

//         <div>
//           <SimilarProducts category={design.category} id={design.id} />
//         </div>
//       </div>

//       <div>
//         <Footer />
//       </div>
//     </>
//   );
// }

"use client";

import { useEffect, use,useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../../../../../axios/axiosinstance/axiosInstance";
import Footer from "../../../components/ui/footer/Footer";
import CommonNavbar from "../../../components/navbar-common/CommonNavbar";
import SimilarProducts from "../../../components/Design/SimilarProductsDesign";
import LoadingUi from "../../../components/ui/loading/loadingui";

export default function DesignDetail({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await axiosInstance.get(`/Design/${id}`);
        if (response.data) {
          setDesign(response.data.data);
          localStorage.setItem("selectedDesign", JSON.stringify(response.data.data));
        } else {
          router.push("/404"); // Redirect if no design found
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

  if (loading) return <LoadingUi/>;
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
              <a href={`/users/Measurements/${id}`}>
                <button className="bg-violet-950 text-white px-6 py-2 rounded-full mr-4 hover:bg-zinc-600">
                  Make custom fit
                </button>
              </a>
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
    </>
  );
}

