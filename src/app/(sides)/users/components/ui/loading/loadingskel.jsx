
import React from 'react'

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex flex-col gap-4">
        <div className="bg-gray-200 aspect-square rounded-xl" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    ))}
  </div>
  )
}

export default LoadingSkeleton
