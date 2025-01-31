// import { useState } from "react";
// import { FiMoreVertical } from "react-icons/fi"; // Importing 3-dots menu icon

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const categories = ["T-Shirts", "Hoodies", "Jeans", "Jackets", "Dresses", "Shoes"];

//   return (
//     <>
//       {/* Menu Icon for Mobile */}
//       <button
//         className="md:hidden fixed top-4 right-4 bg-white p-2 rounded-full shadow-lg"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <FiMoreVertical className="text-2xl text-gray-700" />
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-full w-64 bg-white p-6 shadow-xl border border-gray-200 rounded-r-2xl transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform md:relative md:translate-x-0 md:flex md:flex-col`}
//       >
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter by Category</h2>

//         <ul className="space-y-3">
//           {categories.map((category, index) => (
//             <li
//               key={index}
//               className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
//             >
//               <div className="w-5 h-5 border-2 border-gray-400 rounded-md"></div>
//               <span className="text-gray-700 font-medium">{category}</span>
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* Background overlay when sidebar is open */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}
//     </>
//   );
// }
// import { useState } from "react";
// import { FiMoreVertical } from "react-icons/fi"; // Importing 3-dots menu icon

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const categories = ["T-Shirts", "Hoodies", "Jeans", "Jackets", "Dresses", "Shoes"];

//   return (
//     <>
//       {/* Menu Icon for Mobile - Moved to Left Corner */}
//       <button
//         className="md:hidden fixed top-4 left-4 bg-white p-2 rounded-full shadow-lg"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <FiMoreVertical className="text-2xl text-gray-700" />
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-2 h-full w-64 bg-white p-6 shadow-xl border border-gray-200 rounded-r-2xl transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform md:relative md:translate-x-0 md:flex md:flex-col`}
//       >
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter by Category</h2>

//         <ul className="space-y-3">
//           {categories.map((category, index) => (
//             <li
//               key={index}
//               className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
//             >
//               <div className="w-5 h-5 border-2 border-gray-400 rounded-md"></div>
//               <span className="text-gray-700 font-medium">{category}</span>
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* Background overlay when sidebar is open */}
//       {isOpen && (
//         <div
//           className="fixed inset-0  md:hidden"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}
//     </>
//   );
// }


import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi"; 

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const categories = ["T-Shirts", "Hoodies", "Jeans", "Jackets", "Dresses", "Shoes"];

  return (
    <>
      <button
        className="md:hidden fixed top-4 right-[20px] bg-white p-2 rounded-full shadow-lg" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMoreVertical className="text-2xl text-gray-700" />
      </button>

      <aside
        className={`fixed top-0 left-2 h-full w-64 bg-white p-6 shadow-xl border border-gray-200 rounded-r-2xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:relative md:translate-x-0 md:flex md:flex-col`}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter by Category</h2>

        <ul className="space-y-3">
          {categories.map((category, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
            >
              <div className="w-5 h-5 border-2 border-gray-400 rounded-md"></div>
              <span className="text-gray-700 font-medium">{category}</span>
            </li>
          ))}
        </ul>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
