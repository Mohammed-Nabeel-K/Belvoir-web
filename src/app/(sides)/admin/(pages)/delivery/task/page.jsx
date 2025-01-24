import React from 'react'
import { X } from "lucide-react";



const page = () => {
  return (
    <div className="">
      <h1 className="pt-10 pl-10 pb-10 text-3xl text-slate-400">Tasks</h1>
      <div className="flex w-full h-screen">

        <div className="w-1/3 text-center  flex flex-col items-center gap-4">
         <div className="w-[90%] bg-[#0E0E25] rounded py-1 text-white">Pending</div>
          <div className="w-[90%] h-14 shadow-md border rounded-md text-start flex items-center justify-between">
                <div className='pl-5 text-amber-500'>#1000</div>
                <div className='pr-5'><X size={14} /></div> 
          </div>
        </div>
        <div className="w-1/3 text-center flex flex-col items-center gap-4">
         <div className="w-[90%] bg-[#0E0E25] rounded py-1 text-white">Delivered</div>
          <div className="w-[90%] h-14 shadow-md border rounded-md text-start flex items-center justify-between">
                <div className='pl-5 text-sky-500'>#1001</div>
                <div className='pr-5'><X size={14} /></div> 
          </div>
        </div>
        <div className="w-1/3 text-center  flex flex-col items-center gap-4">
         <div className="w-[90%] bg-[#0E0E25] rounded py-1 text-white">Completed</div>
          <div className="w-[90%] h-14 shadow-md border rounded-md text-start flex items-center justify-between">
                <div className='pl-5 text-green-500'>#1002</div>
                <div className='pr-5'><X size={14} /></div> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default page