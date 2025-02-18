"use client";
import { Heart, Box, Locate } from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/ui/navbar/Navbar";
import axiosInstance from "../../../../../../axios/axiosinstance/axiosInstance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useRouter} from "next/navigation"

export default function UserProfile() {
  const [data, setdata] = useState();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const recentServices = [
    {
      type: "Tailoring",
      item: "Men's Suit",
      status: "In Progress",
      date: "2023-07-15",
    },
    {
      type: "Laundry",
      item: "Winter Coat",
      status: "Completed",
      date: "2023-07-12",
    },
    {
      type: "Rental",
      item: "Evening Gown",
      status: "Pending Pickup",
      date: "2023-07-10",
    },
  ];
  // const handleReset = async () => {
  //   try {
  //     const response = await axiosInstance.get("/User/profile-user", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("userData")}`,
  //       },
  //     });
  //     setdata(response.data.data);
  //   } catch (error) {
  //     console.log("error in fetching order page data", error);
  //   }
  // };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axiosInstance.get("/User/profile-user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userData")}`,
          },
        });
        setdata(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Please login");
          router.push("/login");
        }
        console.log("error in fetching order page data", error);
      }
    };
    fetchdata();
  }, []);


  const handlereset = () => {
    localStorage.removeItem("userData"); 
    toast.success("logout successfully!")
    
    router.push("/"); 
  };



  const handleResetPassword = async () => {
    if (oldPassword.length < 8 || newPassword.length < 8) {
      toast.error("Passwords must be at least 8 characters long");
      return;
    }
    try {
      await axiosInstance.post(
        "/tailor/resetpassword",
        {
          oldPassword:oldPassword,
          newPassword:newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userData")}`,
          },
        }
      );
      toast.success("Password reset successful");
      setShowModal(false);
    } catch (error) {
      toast.error("Error resetting password");
      console.log("Password reset error", error);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 md:w-20 md:h-20 bg-gray-300 text-blue-500 text-4xl md:text-3xl font-bold flex items-center justify-center rounded-full">
                {data?.name.charAt(0)}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-800">
                  {data?.name}
                </h1>
                <p className="text-gray-600">
                  Member since 
                </p>
                <div className="mt-2 flex gap-2 justify-center md:justify-start">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                     Ongoing Orders
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                     Wishlist Items
                  </span>
                </div>
              </div>
              <button
                className="w-max block m-auto px-5 py-2 text-gray-600 border-[1px] border-gray-700 rounded-md"
                onClick={() => setShowModal(true)}
                >
                Reset Password
              </button>
            </div>
          </div>


          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
                <input
                  type="password"
                  placeholder="Old Password"
                  className="w-full p-2 border rounded mb-2"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full p-2 border rounded mb-4"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="flex justify-between">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={handleResetPassword}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
          {/* Account Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Account Details
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-800">{data?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="text-gray-800">{data?.phone}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-5">
            <button className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Link href={"/users/orders"}>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex justify-center items-centery">
                  <Box strokeWidth={1} />
                  &nbsp;&nbsp; My Orders
                </h3>
                <p className="text-gray-600 text-sm">
                  Track your ongoing services
                </p>
              </Link>
            </button>
            <button className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Link href="/users/wishlist">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex justify-center items-centery">
                  <Heart strokeWidth={1} />
                  &nbsp;&nbsp; Wishlist
                </h3>
                <p className="text-gray-600 text-sm">Saved items for later</p>
              </Link>
            </button>
            <button className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Link href={"/users/Address"}>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex justify-center items-centery">
                  <Locate strokeWidth={1} />
                  &nbsp;&nbsp; Address
                </h3>
                <p className="text-gray-600 text-sm">Manage your address</p>
              </Link>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Items to pickup
            </h2>
            <div className="space-y-4">
              {recentServices.map((service, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {service.type}
                      </h4>
                      <p className="text-gray-600 text-sm">{service.item}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          service.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : service.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {service.status}
                      </span>
                      <p className="text-gray-500 text-sm mt-1">
                        {service.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button    className="w-max block mt-4 ml-1 px-5 py-2 text-gray-600 border-[1px] border-gray-700 rounded-md" onClick={handlereset}>
                Logout
              </button>
            

         

        </div>
      </main>
    </>
  );
}
