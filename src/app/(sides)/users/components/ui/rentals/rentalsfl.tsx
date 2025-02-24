// import React from 'react';
// import Image from 'next/image';




// interface RentalItem {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   price: number;
// }

// const rentalItems: RentalItem[] = [
//   {
//     id: 1,
//     title: 'Mountain Bike',
//     description: 'A sturdy mountain bike for off-road adventures.',
//     image: '/home/suit.jpg',
//     price: 25,
//   },
//   {
//     id: 2,
//     title: 'Camping Tent',
//     description: 'Spacious tent for 4 people.',
//     image: '/home/suit.jpg',
//     price: 30,
//   },
//   {
//     id: 3,
//     title: 'Kayak',
//     description: 'Lightweight kayak for water sports.',
//     image:  '/home/suit.jpg',
//     price: 40,
//   },
//   {
//     id: 4,
//     title: 'Drone',
//     description: 'High-performance drone with 4K camera.',
//     image:  '/home/suit.jpg',
//     price: 50,
//   },
//   {
//     id: 5,
//     title: 'Hiking Backpack',
//     description: 'Durable backpack with multiple compartments.',
//     image:  '/home/suit.jpg',
//     price: 15,
//   },
//   {
//     id: 6,
//     title: 'Electric Scooter',
//     description: 'Eco-friendly electric scooter for urban commutes.',
//     image:  '/home/suit.jpg',
//     price: 20,
//   },
//   {
//     id: 7,
//     title: 'Snowboard',
//     description: 'Premium snowboard for winter sports.',
//     image:  '/home/suit.jpg',
//     price: 45,
//   },
//   {
//     id: 8,
//     title: 'Fishing Rod',
//     description: 'Professional fishing rod for enthusiasts.',
//     image:  '/home/suit.jpg',
//     price: 12,
//   },
//   {
//     id: 9,
//     title: 'Portable Speaker',
//     description: 'Waterproof portable speaker with Bluetooth.',
//     image:  '/home/suit.jpg',
//     price: 18,
//   },
//   {
//     id: 10,
//     title: 'Surfboard',
//     description: 'Lightweight surfboard for summer fun.',
//     image:  '/home/suit.jpg',
//     price: 35,
//   },
// ];

// const RentalItemCards: React.FC = () => {
//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen ">
//       <div className="">
//         <p className="text-lg font-jacques font-bold">Our Rentals :-</p>
//         <div className=" w-[1345px] h-96 flex items-center flex-row-reverse overflow-x-auto  gap-4 p-4 scrollbar-hide">
//           {rentalItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex-shrink-0 w-[250px] h-[350px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition-transform"
//             >
//               <div className="flex justify-center  h-[200px] border rounded-sm">
//                 <Image
//                   src={item.image}
//                   alt="itm"
//                   width={800}
//                   height={800}
//                   priority
//                 />
//               </div>
//               <div className="">
//                 <p>Item Name</p>
//                 <p>its just a trila that i have to give description so </p>
//                 <p>$40/day</p>
//                 <div className="flex justify-between">
//                   <div className="bg-slate-900 text-white rounded-sm text-xs flex items-center p-2">
//                     Add To cart
//                   </div>
//                   <div className="bg-slate-900 text-white rounded-sm text-xs flex items-center px-6">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M5 12h14M12 5l7 7-7 7"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RentalItemCards;
