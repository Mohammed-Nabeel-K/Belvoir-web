"use client";
import Ordertable from "@/app/(sides)/admin/components/ui/tailor-order-table/ordertable";
import { ChevronsDown, ChevronsUp, FilterIcon } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [drop, setDrop] = useState(false);

  return (
    <div className="min-h-screen w-full  flex flex-col p-4 gap-4">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-Cormorant font-semibold text-dark">
          Orders
        </h1>
        <div
          onClick={() => {
            setDrop(!drop);
          }}
          className="relative cursor-pointer min-w-60 flex items-center justify-between py-1 px-2 bg-blue-100 text-blue-600 rounded-md"
        >
          <div className="flex gap-1 items-center">
            <FilterIcon size={16} />
            <p>Filter</p>
          </div>
          {drop ? <ChevronsUp size={16} /> : <ChevronsDown size={16} />}
          <div
            className={`transition-all duration-300 ease-out absolute grid grid-cols-1 gap-1 min-w-[240px] top-8 left-0 bg-white rounded-lg shadow-lg ${
              drop
                ? "opacity-100 py-2 pointer-events-auto"
                : "opacity-0 py-0 pointer-events-none"
            }`}
          >
            {["All", "Pending", "Delivered", "Shipped", "Cancelled"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setDrop(false)}
                  className="w-full text-center text-sm text-dark  rounded-lg p-1"
                >
                  {status}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <div className="flex-grow w-full overflow-auto">
        <Ordertable height="overflow-visible" />
      </div>
    </div>
  );
}


