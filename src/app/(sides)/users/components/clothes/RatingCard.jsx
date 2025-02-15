import React from "react";

function RatingCard({data}) {
  const ratingval = data.ratingvalue; 
  function ConvertToStars(ratingval) {
    const fullstar = Math.floor(ratingval); 
    const halfstar = ratingval % 1 !== 0;
    return { fullstar, halfstar };
  }
  const { fullstar, halfstar } = ConvertToStars(ratingval); 
  return (
    <div className="rounded-[20px] shadow-custom p-[15px] mt-3">
      <div className="flex items-center">
        <div className="w-[30px] h-[30px] rounded-[100%] flex items-center justify-center bg-slate-700 text-white mr-1">
        {data?.username?.[0]?.toUpperCase()}
        </div>
       <p>{data.username}</p>
      </div>
      <p className="line-clamp-2 overflow-hidden text-ellipsis text-[13px]">
          {data.message}
       </p>{" "}
       {[...Array(fullstar)].map((_, i) => (
          <span key={i} className="text-yellow-500">★</span> 
        ))}
        {halfstar && <span className="text-yellow-500">☆</span>}
    </div>
  );
}

export default RatingCard;
