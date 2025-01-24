import type React from "react"

// Sample data for the table
const orders = [
  { id: "001", customerName: "John Doe", orderDate: "2023-05-01", amount: "$100.00" },
  { id: "002", customerName: "Jane Smith", orderDate: "2023-05-02", amount: "$150.50" },
  { id: "003", customerName: "Bob Johnson", orderDate: "2023-05-03", amount: "$75.25" },
]

const ModernMinimalOrderTable: React.FC = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto mt-10">
      {/* Table header */}
      <div className="grid grid-cols-4 gap-4 mb-4 p-4 rounded-lg shadow-md text-sm font-medium text-gray-500 px-4">
        <div>Order ID</div>
        <div>Customer Name</div>
        <div>Order Date</div>
        <div>Amount</div>
      </div>
      {/* Table body */}
      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
          >
            <div className="text-blue-600">{order.id}</div>
            <div>{order.customerName}</div>
            <div>{order.orderDate}</div>
            <div className="font-medium">{order.amount}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ModernMinimalOrderTable

