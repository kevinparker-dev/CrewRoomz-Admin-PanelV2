import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import NotificationsModal from "../../components/NotificationsModal";
import { ErrorToast } from "../../components/global/Toaster"; // Import the toast utility
import axios from "../../axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch notifications when the component mounts
  const fetchNotifications = async () => {
    setLoading(true); // Set loading true when fetching data
    try {
      const response = await axios.get("/notifications/adminNotifications");
      if (response.data.success) {
        setNotifications(response.data.data);
      } else {
        ErrorToast("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications", error);
      ErrorToast("Error fetching notifications. Please try again.");
    } finally {
      setLoading(false); // Set loading false once data is fetched
    }
  };

  // Call fetchNotifications when the component mounts and after a new notification is created
  useEffect(() => {
    fetchNotifications();
  }, []); // Only fetch on mount

  // Shimmer Loader Row
  const ShimmerRow = () => (
    <div className="grid grid-cols-6 border-b last:border-none animate-pulse gap-4 space-y-4">
      <div className="py-4 px-4 bg-gray-300 h-4 rounded mt-4"></div>
      <div className="py-4 px-4 bg-gray-300 h-4 rounded"></div>
      <div className="py-4 px-4 col-span-2 bg-gray-300 h-4 rounded"></div>
      <div className="py-4 px-4 bg-gray-300 h-4 rounded"></div>
      <div className="py-4 px-4 bg-gray-300 h-4 rounded"></div>
    
    </div>
  );



 const getDisplayDate = (notification) => {
  if (!notification.isDelivered && notification.scheduledAt) {
    return new Date(notification.scheduledAt);
  }

  if (notification.deliveredAt) {
    return new Date(notification.deliveredAt);
  }

  return new Date(notification.createdAt);
};

  return (
    <div className="p-6 pt-2 min-h-screen">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4">
        <h1 className="text-[36px] font-extrabold text-black mb-4">Notifications</h1>

        {/* Create Button */}
        <div className="flex text-white rounded-lg shadow p-1 mb-4 button-bg">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-1 rounded-lg font-medium flex items-center gap-2"
          >
            <span className="text-2xl">+</span>
            <span>Create</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="overflow-x-auto">
          <div className="text-left text-sm border-b bg-[#F9FAFA] p-2 rounded-lg">
            {/* Table Header */}
            <div className="grid grid-cols-7 text-left bg-[#DEF5FF] font-medium rounded-lg">
              <div className="py-4 px-4">#</div>
              <div className="py-4 px-4">Title</div>
              <div className="py-4 px-4 col-span-2">Description</div>
              <div className="py-4 px-4">Date</div>
              <div className="py-4 px-4">Time</div>
              <div className="py-4 px-4">Status</div>
              {/* <div className="py-4 px-4">Action</div> */}
            </div>

            {/* Table Rows */}
            <div>
              {loading ? (
                // Show shimmer rows while data is loading
                Array(5)
                  .fill(0)
                  .map((_, index) => <ShimmerRow key={index} />)
              ) : notifications.length === 0 ? (
                <div className="text-center py-4">No notifications found.</div>
              ) : (
                notifications.map((notification, index) => (
                  <div
                    key={notification._id}
                    className="grid grid-cols-7 border-b last:border-none font-medium text-sm text-gray-700"
                  >
                    <div className="py-4 px-4">{index + 1}</div>
                    <div className="py-4 px-4 flex items-center gap-2">{notification.title}</div>
                    <div className="py-4 px-4 col-span-2">{notification.description}</div>
                    {/* <div className="py-4 px-4">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </div>
                    <div className="py-4 px-4">
                      {new Date(notification.createdAt).toLocaleTimeString()}
                    </div> */}
                    <div className="py-4 px-4">
  {getDisplayDate(notification).toLocaleDateString()}
</div>
<div className="py-4 px-4">
  {getDisplayDate(notification).toLocaleTimeString()}
</div>
                    <div className="py-4 px-4">
  {!notification.isDelivered && notification.scheduledAt
    ? "Scheduled"
    : notification.isDelivered
    ? "Delivered"
    : "Pending"}
</div>
                    {/* <div className="py-4 px-4 text-red-500">
                      <Trash2 />
                    </div> */}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <NotificationsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshNotifications={fetchNotifications} // Pass refresh function to modal
      />
    </div>
  );
};

export default Notifications;
