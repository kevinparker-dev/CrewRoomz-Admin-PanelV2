import { X } from "lucide-react";
import { calendar } from "../assets/export";
import React, { useState, useRef } from "react";
import { SuccessToast, ErrorToast } from "../components/global/Toaster"; // Toaster functions for success/error messages
import axios from "../axios";

const NotificationsModal = ({ isOpen, onClose, refreshNotifications }) => {
  if (!isOpen) return null;

  // State for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledDate, setScheduledDate] = useState(""); // Date
  const [scheduledTime, setScheduledTime] = useState(""); // Time
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const dateInputRef = useRef(null);

  // Handle icon click to open the date picker
  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const notificationData = {
      title,
      description,
    };

    // If a date and time is selected, include scheduledAt
    if (scheduledDate && scheduledTime) {
      notificationData.scheduledAt = `${scheduledDate}T${scheduledTime}:00Z`;
    }

    // Set loading to true when submission starts
    setIsLoading(true);

    try {
      const response = await axios.post("/notifications", notificationData);
      if (response.data.success) {
        SuccessToast("Notification created successfully!");
        refreshNotifications(); // Refresh the notifications list
        onClose(); // Close the modal
      } else {
        ErrorToast("Failed to create notification.");
      }
    } catch (error) {
      ErrorToast("An error occurred while creating the notification.");
      console.error(error);
    } finally {
      // Set loading to false after submission (success or failure)
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-lg w-96 p-6 z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Create New Notification</h2>
          <button
            onClick={onClose}
            className="text-[#36C0EF] bg-[#36C0EF]/20 rounded-full p-1 "
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="w-full">
            <label className="block text-sm mb-1">Date</label>
            <div className="relative w-full">
              <input
                ref={dateInputRef}
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full pr-10 py-2 pl-3 border rounded-lg appearance-none focus:outline-none focus:ring focus:ring-blue-300"
              />
              <img
                src={calendar}
                alt="Calendar Icon"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-7 h-7 cursor-pointer"
                onClick={handleIconClick}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Time</label>
            <input
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full ${isLoading ? "bg-gray-400" : "button-bg"} text-white py-2 rounded-lg hover:bg-blue-600 flex justify-center items-center`}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0"
                ></path>
              </svg>
            ) : (
              "Create Now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotificationsModal;
