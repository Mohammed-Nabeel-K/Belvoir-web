
// import React from "react";
// import Container from "../../components/clothes/Container";
// import Image from "next/image";
// import Footer from "../../components/ui/footer/Footer"

// function Page() {
//   const word = "MAKEYOURFIT";

//   return (
//     <main className="min-h-screen bg-white ">
//       <div className="flex mt-4">
       
//         <div className=" w-[100px] text-center ml-2 text-4xl font  font-serif">
//           {word.split("").map((letter, index) => (
//             <div className="mt-2" key={index}>{letter}</div>
//           ))}
//         </div>

        
//         <div className="w-full h-[500px] relative mt-3">
//     <Image
//       src="/clothes/cloths.jpg"
//       alt="cover image"
     
//       layout="fill"
//       objectFit="cover"
//     />
//   </div>
//       </div>
//       <div className="mt-4">
//         <Container/>
//       </div>
//       <div>
//         <Footer/>
        
//       </div>
//     </main>
//   );
// }

// export default Page;

import React from "react";
import Container from "../../components/clothes/Container";
import Image from "next/image";
import Footer from "../../components/ui/footer/Footer";
import NavbarCloth from "../../components/clothes/NavbarClothpage";

function Page() {
  const caption = "Elevate Your Style with Every Piece.";

  return (
    <main className="min-h-screen bg-white">
      <div>
        <NavbarCloth/>
      </div>


      
      <div className="w-full h-[500px] relative mt-3">
        <Image
          src="/clothes/cloths.jpg"
          alt="cover image"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center text-white">
          <div className="text-6xl font-serif uppercase font-bold text-gold mt-5">Belvoir</div>
          <p className="mt-4 text-xl font-sans italic">{caption}</p>
        </div>
      </div>
      <div className="mt-4">
        <Container />
      </div>
      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}

export default Page;
