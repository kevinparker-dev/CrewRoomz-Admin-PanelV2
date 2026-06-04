import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { useNavigate, useParams, useLocation } from "react-router";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { warning } from "../../assets/export";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Add styles for date picker

const UserDetails = () => {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { name: stateName, email: stateEmail, profilePicture: stateProfilePicture,isDeactivatedByAdmin } = location.state || {};
 console.log("State data:", location.state);
  const [activeTab, setActiveTab] = useState("private");
  const [activeFilter, setActiveFilter] = useState("all");
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  
  // State for the date-picker and showing the calendar
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const openDeactivateModal = () => {
    setIsDeactivateModalOpen(true);
  };

  const closeDeactivateModal = () => {
    setIsDeactivateModalOpen(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-[#349DC7] text-white";
      case "Canceled":
        return "bg-red-500 text-white";
      case "Completed":
        return "bg-[#34C759] text-white";
      case "Active":
        return "bg-[#34C759] text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const fetchUserDetails = async (roomType = "multi", bookingStatus = "all", page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`/admin/userDetails/${userId}`, {
        params: { roomType, bookingStatus, page },
      });

      if (response.data.success) {
        const data = response.data.data;
        setUser(data.user);
        setBookings(data.bookings || []);
        setPagination(data.pagination || {});
      } else {
        ErrorToast(response.data.message || "Failed to fetch user details");
      }
    } catch (err) {
      console.error("UserDetails fetch error:", err);
      ErrorToast("Error fetching user details. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails(activeTab, activeFilter, 1);
  }, [userId, activeTab, activeFilter]);

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false); // Close the calendar after selection

    // Send the selected date as a parameter to the URL or fetch data with the selected date
    navigate(`/app/user-details/${userId}?date=${date.toISOString()}`);
  };

  const ShimmerBookingCard = () => {
  return (
    <div className="bg-white w-[327px] h-[265px] rounded-2xl overflow-hidden relative animate-pulse">
      {/* Status Badge */}
      <div className="absolute top-6 left-6 px-3 py-1 text-xs font-medium bg-gray-300 w-16 h-4 rounded-sm"></div>

      {/* Image */}
      <div className="flex justify-center mt-3 p-4 pt-0 pb-1">
        <div className="w-full h-[156px] bg-gray-200 rounded-lg"></div>
      </div>

      {/* Info */}
      <div className="px-6 pt-0 pb-4">
        <div className="flex justify-between">
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
          <div className="w-12 h-4 bg-gray-200 rounded"></div>
        </div>

        <p className="text-gray-500 text-sm flex items-center mt-2 w-28 h-4 bg-gray-200 rounded"></p>
        <p className="text-sm mt-2 font-medium w-32 h-4 bg-gray-200 rounded"></p>
      </div>
    </div>
  );
};

const handleDeactivateUser = async () => {
  setIsDeactivating(true);
  try {
    const response = await axios.put(`/admin/toggleUserDeactivation/${userId}`);

    if (response.data.success) {
      setIsDeactivateModalOpen(false);  // Close modal on success
      SuccessToast("User status updated successfully");
      navigate(-1);
    } else {
      ErrorToast(response.data.message || "Failed to deactivate user");
    }
  } catch (err) {
    console.error("Deactivate user error:", err);
    ErrorToast("Error deactivating user. Please try again.");
  } finally {
    setIsDeactivating(false);  // Reset loading state
  }
};


  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center space-x-2">
        <button onClick={handleBack} className="pb-1 mr-1 font-bold text-black ">
          <FaArrowLeft size={28} />
        </button>
        <h1 className="text-[36px] text-black mb-2 font-bold">Profile</h1>
      </div>

      <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={stateProfilePicture || user?.profilePicture || "https://via.placeholder.com/100"}
            alt={stateName || user?.name || ""}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{stateName || user?.name || "-"}</h2>
            <p className="text-gray-500">{stateEmail || user?.email || "-"}</p>
          </div>
        </div>
        <button onClick={openDeactivateModal} className={`${isDeactivatedByAdmin ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white px-6 py-4 rounded-full font-medium mt-4 md:mt-0`}>
         {isDeactivatedByAdmin?"Activate":"Deactivate"} 
        </button>
      </div>

      {/* Calendar Icon and Date Picker */}
      <div className="mt-6">
        {/* <div className="flex flex-wrap gap-2 mb-4">
          <div className="ml-auto flex gap-2">
            <button 
              onClick={() => setIsCalendarOpen((prev) => !prev)} 
              className="flex items-center gap-2 px-3 py-2 border rounded-full text-sm bg-white">
              Calendar <IoCalendarOutline />
            </button>
          </div>
        </div> */}

        {/* Date Picker - only shown when `isCalendarOpen` is true */}
        {/* {isCalendarOpen && (
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            dateFormat="yyyy-MM-dd"
          />
        )} */}
      </div>

      {/* Bookings Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
          <span className="text-gray-500">({bookings?.length || 0})</span>
        </h2>

        {/* Tabs for Room Type */}
        <div className="flex gap-2 mb-4 pl-2 bg-white py-1 rounded-xl w-[450px]">
          {["Private", "Multi", "Semi Private"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-10 py-2 rounded-lg font-medium ${
                activeTab === tab.toLowerCase()
                  ? "bg-sky-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards for Bookings */}
        <div className="bg-white p-6 rounded-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#F9FAFA] p-2 pt-4 rounded-2xl">
            {loading
              ? Array(6).fill(0).map((_, idx) => <ShimmerBookingCard key={idx} />)
              : bookings.length === 0
              ? (
                <div className="col-span-3 text-center text-md font-medium text-gray-500">
                  No Listings Available
                </div>
              )
              : bookings.map((b) => (
                <div
                  key={b.id}
                  onClick={() => navigate(`/app/roomdetails/${b.id}`)}
                  className="bg-white w-[327px] h-[265px] rounded-2xl overflow-hidden relative cursor-pointer hover:shadow-md transition-shadow"
                >
                  {/* Status Badge */}
                  <span className={`absolute top-6 left-6 px-3 py-1 text-xs font-medium ${getStatusColor(b.status)}`}>
                    {b.status}
                  </span>

                  {/* Image */}
                  <div className="flex justify-center mt-3 p-4 pt-0 pb-1">
                    <img
                      src={b.imageUrl || "https://via.placeholder.com/300x150"}
                      alt={b.location}
                      className="w-full h-[156px] object-cover rounded-lg"
                    />
                  </div>

                  {/* Info */}
                  <div className="px-6 pt-0 pb-4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-[16px]">{b.location}</h3>
                      <div className="flex items-center gap-1 text-[14px] mt-1 ml-auto">
                        <FaStar className="text-yellow-400" />
                        <span>{b.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm flex items-center">{b.address || "-"}</p>
                    <p className="text-sm mt-2 font-medium">{b.details || "-"}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

               {/* Deactivate Modal */}
          {isDeactivateModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[471px] h-[347px] flex flex-col items-center">
                <img src={warning} alt="Warning" className="w-[107px] h-[107px] mb-4" />
                <h2 className="text-[24px] font-bold mt-2 mb-4">         {isDeactivatedByAdmin?"Activate":"Deactivate"} 
</h2>
                <p className="text-center text-[16px] text-gray-700 mb-6">
                  Are you sure you want to perform this account?
                </p>
          
                <div className="mt-4 flex justify-end w-full">
                  <button
                    onClick={closeDeactivateModal}
                    className="px-4 py-4 bg-gray-300 w-[50%] rounded-lg mr-2"
                  >
                    No
                  </button>
                  <button
            onClick={handleDeactivateUser}
            disabled={isDeactivating}
            className={`px-4 py-4 w-[50%] text-white rounded-lg ${
              isDeactivating
                ? "bg-gray-400 cursor-not-allowed"
                : "button-bg hover:opacity-90"
            }`}
          >
            {isDeactivating ? "Updating..." : "Yes"}
          </button>
          
                </div>
              </div>
            </div>
          )}
    </div>
  );
};

export default UserDetails;
