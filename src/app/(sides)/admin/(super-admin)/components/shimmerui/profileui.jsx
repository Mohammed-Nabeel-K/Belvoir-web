import React from 'react'

const Profileui = () => {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0 w-32 h-32 sm:w-48 sm:h-48 mx-auto sm:mx-0 bg-gray-200 animate-pulse rounded-lg"></div>

      <div className="flex flex-col gap-4">
        <div className="h-6 w-28 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-36 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  );
}

export default Profileui