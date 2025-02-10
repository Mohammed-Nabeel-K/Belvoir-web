import {Heart,Box,Zap} from 'lucide-react'
import Link from 'next/link';


// components/UserProfile.jsx
export default function UserProfile() {
    // Temporary data - replace with real data from your backend
    const userDetails = {
      name: "Nabeel",
      email: "Nabeel@gmail.com",
      phone: "7356899308",
      joined: "March 2025",
      ordersPending: 2,
      wishlistItems: 4
    };
  
    const recentServices = [
      { type: 'Tailoring', item: "Men's Suit", status: 'In Progress', date: '2023-07-15' },
      { type: 'Laundry', item: "Winter Coat", status: 'Completed', date: '2023-07-12' },
      { type: 'Rental', item: "Evening Gown", status: 'Pending Pickup', date: '2023-07-10' }
    ];
  
    return (
      <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src="/home/nabeel.png"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow"
              />
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-800">{userDetails.name}</h1>
                <p className="text-gray-600">Member since {userDetails.joined}</p>
                <div className="mt-2 flex gap-2 justify-center md:justify-start">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {userDetails.ordersPending} Ongoing Orders
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {userDetails.wishlistItems} Wishlist Items
                  </span>
                </div>
              </div>
            </div>
          </div>
  
          {/* Service Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex justify-center items-centery"><Box strokeWidth={1} />&nbsp;&nbsp; My Orders</h3>
              <p className="text-gray-600 text-sm">Track your ongoing services</p>
            </button>
            <button className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Link href="/users/wishlist">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex justify-center items-centery"><Heart strokeWidth={1} />&nbsp;&nbsp; Wishlist</h3>
              <p className="text-gray-600 text-sm">Saved items for later</p>
          </Link>
            </button>
            <button className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex justify-center items-centery"><Zap strokeWidth={1} />&nbsp;&nbsp; Quick Order</h3>
              <p className="text-gray-600 text-sm">Start new service request</p>
            </button>
          </div>
  
          {/* Recent Services Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Services</h2>
            <div className="space-y-4">
              {recentServices.map((service, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-800">{service.type}</h4>
                      <p className="text-gray-600 text-sm">{service.item}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        service.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        service.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {service.status}
                      </span>
                      <p className="text-gray-500 text-sm mt-1">{service.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Account Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-800">{userDetails.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="text-gray-800">{userDetails.phone}</span>
              </div>
            </div>
          </div>
  
        </div>
      </main>
    );
  }