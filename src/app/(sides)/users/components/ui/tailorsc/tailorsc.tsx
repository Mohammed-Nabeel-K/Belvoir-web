import React from 'react';


interface TailorMet {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

const TailorMet: TailorMet[] = [
  {
    id: 1,
    title: 'Mountain Bike',
    description: 'A sturdy mountain bike for off-road adventures.',
    image: '/images/mountain-bike.jpg',
    price: 25,
  },
  {
    id: 2,
    title: 'Camping Tent',
    description: 'Spacious tent for 4 people.',
    image: '/images/camping-tent.jpg',
    price: 30,
  },
  {
    id: 3,
    title: 'Kayak',
    description: 'Lightweight kayak for water sports.',
    image: '/images/kayak.jpg',
    price: 40,
  },
  {
    id: 4,
    title: 'Drone',
    description: 'High-performance drone with 4K camera.',
    image: '/images/drone.jpg',
    price: 50,
  },
  {
    id: 5,
    title: 'Hiking Backpack',
    description: 'Durable backpack with multiple compartments.',
    image: '/images/backpack.jpg',
    price: 15,
  },
  {
    id: 6,
    title: 'Electric Scooter',
    description: 'Eco-friendly electric scooter for urban commutes.',
    image: '/images/electric-scooter.jpg',
    price: 20,
  },
  {
    id: 7,
    title: 'Snowboard',
    description: 'Premium snowboard for winter sports.',
    image: '/images/snowboard.jpg',
    price: 45,
  },
  {
    id: 8,
    title: 'Fishing Rod',
    description: 'Professional fishing rod for enthusiasts.',
    image: '/images/fishing-rod.jpg',
    price: 12,
  },
  {
    id: 9,
    title: 'Portable Speaker',
    description: 'Waterproof portable speaker with Bluetooth.',
    image: '/images/portable-speaker.jpg',
    price: 18,
  },
  {
    id: 10,
    title: 'Surfboard',
    description: 'Lightweight surfboard for summer fun.',
    image: '/images/surfboard.jpg',
    price: 35,
  },
];

const TailorItem: React.FC = () => {
  return (
    
     
      
      <div className="flex flex-col justify-center items-center min-h-screen "> 
      <div className="">
      <p className='text-lg font-jacques font-bold'>Tailor your fashion :-</p>
      <div className=" w-[1345px] h-96 flex items-center flex-row-reverse overflow-x-auto  gap-4 p-4 scrollbar-hide">
        {TailorMet.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-[250px] h-[350px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition-transform"
          >
            <div className="flex justify-center  h-[200px] border rounded-sm">
              {/* <img src="pend" alt="ing" /> */}
            </div>
            <div className="">
              <p>Item Name</p>
              <p>its just a trila that i have to give description so </p>
              <p>$40/day</p>
              <div className="flex justify-between">
                <div className="bg-slate-900 text-white rounded-sm text-xs flex items-center p-2">
                  Add To cart
                </div>
                <div className="bg-slate-900 text-white rounded-sm text-xs flex items-center px-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
     </div>
    </div>
    
  );
};

export default TailorItem;
