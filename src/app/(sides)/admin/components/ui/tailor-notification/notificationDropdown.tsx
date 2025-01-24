import { BellDot, X } from "lucide-react";

interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
  timestamp: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    message: "New order placed by John Doe.",
    type: "success",
    timestamp: "5 mins ago",
  },
  {
    id: 2,
    message: "Tailor request pending approval.",
    type: "info",
    timestamp: "10 mins ago",
  },
  {
    id: 3,
    message: "Payment for Order #123 failed.",
    type: "error",
    timestamp: "30 mins ago",
  },
  {
    id: 4,
    message: "Outfit delivery delayed.",
    type: "warning",
    timestamp: "1 hour ago",
  },
];

export default function NotificationDropdown() {
  // Status indicator colors
  const statusColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <div className="w-80 max-h-[300px] overflow-y-auto rounded-lg shadow-sm bg-white border border-gray-100 mt-3">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-100">
        <h2 className="text-lg font-Cormorant text-gray-800">Notifications</h2>
        <BellDot size={18} className="text-gray-600" />
      </div>

      {/* Notifications List */}
      <div className="p-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start justify-between p-2 hover:bg-gray-50 rounded-md transition-colors"
          >
            <div className="flex gap-2">
              {/* Status Indicator */}
              <div
                className={`mt-1.5 h-2 w-2 rounded-full ${
                  statusColors[notification.type]
                }`}
              />
              
              {/* Message Content */}
              <div>
                <p className="text-sm text-gray-700">{notification.message}</p>
                <span className="text-xs text-gray-500">
                  {notification.timestamp}
                </span>
              </div>
            </div>

            {/* Dismiss Button */}
            <button 
              className="p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 