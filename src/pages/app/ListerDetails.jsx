import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { useNavigate, useLocation, useParams } from "react-router";
import axios from "../../axios"; // Make sure axios is installed
import { warning } from "../../assets/export";
import { SuccessToast } from "../../components/global/Toaster";

const ListerDetails = () => {
  const [activeTab, setActiveTab] = useState("listings");
  const [activeFilter, setActiveFilter] = useState("private");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();
  console.log("Lister ID from params:", userId);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);


  const openDeactivateModal = () => {
    setIsDeactivateModalOpen(true);
  };

  const closeDeactivateModal = () => {
    setIsDeactivateModalOpen(false);
  };

  const { name: stateName, email: stateEmail, profilePicture: stateProfilePicture,isDeactivatedByAdmin } = location.state || {};

  // Fetch Listings based on Filters and Pagination
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `/admin/users/lister/${userId}?type=listing&roomType=${activeFilter}&page=${page}`
        );

        console.log("API Response:", response.data); // Full API response
        console.log("Listings:", response.data?.data?.listings); // Correct path to listings

        // Access listings from the correct path
        if (Array.isArray(response.data?.data?.listings) && response.data?.data?.listings.length > 0) {
          setListings(response.data?.data?.listings);
        } else {
          setListings([]); // If no listings are found
        }
      } catch (err) {
        setError("Failed to load listings.");
        console.error("Error loading listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [userId, activeFilter, page]);




  const handleBack = () => {
    navigate(-1); // Goes back by one step in the history
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Ongoing":
        return "bg-[#FBBC04] text-white"; // Yellow
      case "Upcoming":
        return "bg-[#349DC7] text-white"; // Blue
      case "Canceled":
        return "bg-red-500 text-white"; // Red
      case "Completed":
        return "bg-[#34C759] text-white"; // Green
      case "active":
        return "bg-[#34C759] text-white"; // Green
      default:
        return "bg-gray-400 text-white"; // Default grey
    }
  };



  const ShimmerLoader = () => (
    <div className="bg-white w-[327px] h-[280px] rounded-2xl shadow-sm overflow-hidden relative animate-pulse">
      {/* Shimmer for Status Badge */}
      <div className="absolute top-6 left-6 w-24 h-4 bg-gray-300 rounded-full"></div>

      {/* Shimmer for Image */}
      <div className="flex justify-center mt-3 p-4 pt-0 pb-1">
        <div className="w-full h-[156px] bg-gray-300 rounded-lg"></div>
      </div>

      {/* Shimmer for Info */}
      <div className="px-6 pt-0 pb-4">
        <div className="flex justify-between">
          <div className="w-1/2 h-4 bg-gray-300 rounded-lg"></div>
          <div className="w-12 h-4 bg-gray-300 rounded-lg"></div>
        </div>
        <div className="mt-2">
          <div className="w-full h-3 bg-gray-300 rounded-lg mb-2"></div>
          <div className="w-full h-3 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  const handleDeactivateUser = async () => {
    setIsDeactivating(true);
    try {
      const response = await axios.put(`/admin/toggleUserDeactivation/${userId}`);

      if (response.data.success) {
        setIsDeactivateModalOpen(false);
        // fetchUserDetails(activeTab, activeFilter, 1);
        SuccessToast("Lister status updated successfully");
        navigate(-1);
      } else {
        ErrorToast(response.data.message || "Failed to deactivate user");
      }
    } catch (err) {
      console.error("Deactivate user error:", err);
      ErrorToast("Error deactivating user. Please try again.");
    } finally {
      setIsDeactivating(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Profile Header */}
      <div className="flex items-center space-x-2">
        <button onClick={handleBack} className="pb-1 mr-1 font-bold text-black">
          <FaArrowLeft size={28} />
        </button>
        <h1 className="text-[36px] text-black mb-2 font-bold">Profile</h1>
      </div>

      <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={stateProfilePicture || "https://via.placeholder.com/100"}
            alt={stateName || ""}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{stateName || "-"}</h2>
            <p className="text-gray-500">{stateEmail || "-"}</p>
          </div>
        </div>
        <button onClick={openDeactivateModal} className={`${isDeactivatedByAdmin ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white px-6 py-4 rounded-full font-medium mt-4 md:mt-0`}>
          {isDeactivatedByAdmin ? "Activate" : "Deactivate"}
        </button>
      </div>

      {/* Bookings Section */}
      <div className="mt-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-4 pl-1 bg-white py-1 rounded-xl w-[300px]">
          {["Listings", "Bookings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-10 py-2 rounded-lg font-medium ${activeTab === tab.toLowerCase()
                  ? "bg-sky-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4 ">
          {["private", "multi", "semi-private"].map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setPage(1);
                setActiveFilter(filter.toLowerCase());
              }}
              className={`px-4 py-1.5 rounded-full border text-sm  capitalize ${activeFilter === filter.toLowerCase()
                  ? "button-bg text-white border-sky-500"
                  : "bg-blue-100 border border-[#36C0EF] text-black hover:text-white hover:bg-[#36C0EF]"
                }`}
            >
              {filter}
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            {/* <button className="flex items-center gap-2 px-3 py-2 border rounded-full text-sm bg-white">
              Calendar <IoCalendarOutline />
            </button>
            <button className="px-6 py-1.5 border rounded-full text-sm bg-white">
              All
            </button> */}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl">
          <div className="grid grid-cols-1 pl-8 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#F9FAFA] p-4 pt-4 rounded-2xl">
            {loading ? (
              // Show shimmer loaders when loading
              [...Array(6)].map((_, index) => (
                <ShimmerLoader key={index} />
              ))
            ) : Array.isArray(listings) && listings.length > 0 ? (
              listings.map((listing) => (
                <div
                  key={listing._id}
                  onClick={() => navigate(`/app/roomdetails/${listing._id}`)}
                  className="bg-white w-[327px] h-[280px] rounded-2xl shadow-sm overflow-hidden relative cursor-pointer hover:shadow-md transition-shadow"
                >
                  {/* Status Badge */}
                  <span
                    className={`absolute top-6 left-6 px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(listing.roomStatus)}`}
                  >
                    {listing.roomStatus}
                  </span>

                  {/* Image */}
                  <div className="flex justify-center mt-3 p-4 pt-0 pb-1">
                    <img
                      src={listing.media[0] || "https://via.placeholder.com/300"} // Ensure you are using the first media item
                      alt={listing.address || "No address"}
                      className="w-full h-[156px] object-cover rounded-lg"
                    />
                  </div>

                  {/* Info */}
                  <div className="px-6 pt-0 pb-4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-[16px]">{listing.city}</h3>
                      <div className="flex items-center gap-1 text-[14px] mt-1 ml-auto">
                        <FaStar className="text-yellow-400" />
                        <span>{listing.averageRating || "N/A"}</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">{listing.address || "No address"}</p>
                    <p className="text-sm mt-2 font-medium mb-4">{listing.bedDetails?.[0]?.type || "No bed type"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 p-4">No listings available</p>
            )}
          </div>
        </div>




        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded-lg"
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>

      {/* Deactivate Modal */}
      {isDeactivateModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[471px] h-[347px] flex flex-col items-center">
            <img src={warning} alt="Warning" className="w-[107px] h-[107px] mb-4" />
            <h2 className="text-[24px] font-bold mt-2 mb-4">          {isDeactivatedByAdmin ? "Activate" : "Deactivate"}
</h2>
            <p className="text-center text-[16px] text-gray-700 mb-6">
              Are you sure you want to perform this action?
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
                className={`px-4 py-4 w-[50%] text-white rounded-lg ${isDeactivating
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

export default ListerDetails;
