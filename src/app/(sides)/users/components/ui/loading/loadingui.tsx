import React from 'react';



const LoadingUi= () => {
  return (
    <div className=' h-screen flex justify-center items-center'>
      <video autoPlay loop muted playsInline className="w-16 h-16">
        <source src="/home/loading.gif" type="video/mp4" />
      </video>
    </div>
  );
};

export default LoadingUi;