import React from 'react';
import Image from 'next/image';


const LoadingUi= () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Image
        src="/home/loading.gif"
        alt="Loading"
        width={120}
        height={120}
        priority
      />
    </div>
  );
};

export default LoadingUi;