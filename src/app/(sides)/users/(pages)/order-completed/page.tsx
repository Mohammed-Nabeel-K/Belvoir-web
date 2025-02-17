"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/users/orders"); 
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-20 h-20 text-green-500 mx-auto"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9 12l2 2 4-4"></path>
        </svg>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Order Successful!
        </h2>
        <p className="text-gray-600 mt-2">
          Your Order placed  successfully. You will be redirected to your orders page shortly.
        </p>

        <button
          onClick={() => router.push("/users/orders")}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
