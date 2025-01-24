import type React from "react";

interface Order {
  id: number;
  name: string;
  date: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  deadline: string;
}

// Status color mapping for consistent styling
const statusStyles = {
  Shipped: "text-blue-600 ",
  Delivered: "text-green-600 ",
  Cancelled: "text-red-600 ",
  Pending: "text-yellow-600 "
};

const OrderTable: React.FC<{ height?: string }> = ({ height = "h-[350px]" }) => {
  // Sample order data
  const orders = [
    {
      id: 1000,
      name: "John Doe",
      date: "2025-01-01",
      status: "Pending",
      deadline: "2025-01-05",
    },
    {
      id: 1001,
      name: "John Doe",
      date: "2025-01-01",
      status: "Pending",
      deadline: "2025-01-05",
    },
    {
      id: 1002,
      name: "Jane Smith",
      date: "2025-01-02",
      status: "Shipped",
      deadline: "2025-01-06",
    },
    {
      id: 1003,
      name: "Bob Johnson",
      date: "2025-01-03",
      status: "Delivered",
      deadline: "2025-01-07",
    },
    {
      id: 1004,
      name: "Alice Williams",
      date: "2025-01-04",
      status: "Cancelled",
      deadline: "2025-01-08",
    },
    {
      id: 1005,
      name: "Charlie Brown",
      date: "2025-01-05",
      status: "Pending",
      deadline: "2025-01-09",
    },
    {
      id: 1006,
      name: "John Doe",
      date: "2025-01-01",
      status: "Pending",
      deadline: "2025-01-05",
    },
    {
      id: 1007,
      name: "Jane Smith",
      date: "2025-01-02",
      status: "Shipped",
      deadline: "2025-01-06",
    },
    {
      id: 1008,
      name: "Bob Johnson",
      date: "2025-01-03",
      status: "Delivered",
      deadline: "2025-01-07",
    },
    {
      id: 1009,
      name: "Alice Williams",
      date: "2025-01-04",
      status: "Cancelled",
      deadline: "2025-01-08",
    },
    {
      id: 1010,
      name: "Charlie Brown",
      date: "2025-01-05",
      status: "Pending",
      deadline: "2025-01-09",
    },
    {
      id: 1011,
      name: "Emily Davis",
      date: "2025-01-06",
      status: "Pending",
      deadline: "2025-01-10",
    },
    {
      id: 1012,
      name: "Daniel Martinez",
      date: "2025-01-07",
      status: "Shipped",
      deadline: "2025-01-11",
    },
    {
      id: 1013,
      name: "Sophia Lee",
      date: "2025-01-08",
      status: "Delivered",
      deadline: "2025-01-12",
    },
    {
      id: 1014,
      name: "Michael Brown",
      date: "2025-01-09",
      status: "Cancelled",
      deadline: "2025-01-13",
    },
    {
      id: 1015,
      name: "Olivia Taylor",
      date: "2025-01-10",
      status: "Pending",
      deadline: "2025-01-14",
    },
    {
      id: 1016,
      name: "Liam Wilson",
      date: "2025-01-11",
      status: "Shipped",
      deadline: "2025-01-15",
    },
    {
      id: 1017,
      name: "Mia Johnson",
      date: "2025-01-12",
      status: "Delivered",
      deadline: "2025-01-16",
    },
    {
      id: 1018,
      name: "Noah Anderson",
      date: "2025-01-13",
      status: "Pending",
      deadline: "2025-01-17",
    },
    {
      id: 1019,
      name: "Isabella Thomas",
      date: "2025-01-14",
      status: "Cancelled",
      deadline: "2025-01-18",
    },
    {
      id: 1020,
      name: "Ethan White",
      date: "2025-01-15",
      status: "Shipped",
      deadline: "2025-01-19",
    },
    // ... other orders
  ] as Order[];

  return (
    <div className="p-4 w-full overflow-hidden">
      <div className={`${height} overflow-y-auto space-y-3`}>
        {/* Header */}
        <div className="grid grid-cols-6 gap-4 p-4 rounded-lg bg-gray-50 text-sm font-medium text-gray-600 shadow-md ">
          <div>Order ID</div>
          <div>Customer</div>
          <div>Date</div>
          <div>Status</div>
          <div>Deadline</div>
          <div>Actions</div>
        </div>

        {/* Orders list */}
        <div className="space-y-2">
          {orders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-6 gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="text-blue-600 font-medium">#{order.id}</div>
              <div>{order.name}</div>
              <div>{order.date}</div>
              <div>
                <span className={`px-3 py-1 rounded-full text-sm ${statusStyles[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <div>{order.deadline}</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-slate-900 text-white rounded-md hover:bg-white hover:text-slate-900 transition-colors">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm text-slate-900 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
