  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router";
  import axios from "../../axios";

  const Bookings = () => {
    const [activeTab, setActiveTab] = useState("multi");
    const [page, setPage] = useState(1);
    const [bookingStatus, setBookingStatus] = useState("completed");
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
      const [statsLoading, setStatsLoading] = useState(false);


    const navigate = useNavigate();

    // 🆕 State for All Stats
  const [statsData, setStatsData] = useState({
    bookedBedsDay: 0,
    bookedBedsMonth: 0,
    roomListingsDay: 0,
    roomListingsMonth: 0,
    cancellationDay: 0,
    cancellationMonth: 0,
    bookedSeekersDay: 0,
    totalSeekersDay: 0,
    bookedSeekersMonth: 0,
    totalSeekersMonth: 0,
  });


   const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const [
        bedDay,
        bedMonth,
        roomDay,
        roomMonth,
        cancelDay,
        cancelMonth,
        bookingUserDay,
        bookingUserMonth,
      ] = await Promise.all([
        axios.get("/admin/bedBookingStats?filter=day"),
        axios.get("/admin/bedBookingStats?filter=month"),
        axios.get("/admin/roomListingStats?filter=day"),
        axios.get("/admin/roomListingStats?filter=month"),
        axios.get("/admin/cancellationPercentage?filter=day"),
        axios.get("/admin/cancellationPercentage?filter=month"),
        axios.get("/admin/bookingUserStats?filter=day"),
        axios.get("/admin/bookingUserStats?filter=month"),
      ]);

      setStatsData({
        bookedBedsDay: bedDay?.data?.data?.totalBookings || 0,
        bookedBedsMonth: bedMonth?.data?.data?.totalBookings || 0,
        roomListingsDay: roomDay?.data?.data?.totalListings || 0,
        roomListingsMonth: roomMonth?.data?.data?.totalListings || 0,
        cancellationDay: cancelDay?.data?.data?.cancellationPercentage || 0,
        cancellationMonth: cancelMonth?.data?.data?.cancellationPercentage || 0,
        bookedSeekersDay: bookingUserDay?.data?.data?.bookedSeekers || 0,
        totalSeekersDay: bookingUserDay?.data?.data?.totalSeekers || 0,
        bookedSeekersMonth: bookingUserMonth?.data?.data?.bookedSeekers || 0,
        totalSeekersMonth: bookingUserMonth?.data?.data?.totalSeekers || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      ErrorToast("Failed to fetch booking/listing stats.");
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [activeTab]);

    const handleRowClick = (bookingId) => {
      navigate(`/app/bookingdetails/${bookingId}`);
    };

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/admin/bookings?page=${page}&roomType=${activeTab}&bookingStatus=${bookingStatus}`
        );
        setBookings(response.data?.data || []);
        setPagination(response.data?.pagination || {});
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchBookings();
    }, [activeTab, page, bookingStatus]);

    const handleTabChange = (tab) => {
      setActiveTab(tab);
      setPage(1);
    };

    const handleStatusChange = (e) => {
      setBookingStatus(e.target.value);
      setPage(1);
    };

    const shimmerRow = (
      <div className="grid grid-cols-9 gap-2 animate-pulse border-b py-4">
        {Array(9).fill(0).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        ))}
      </div>
    );


    const stats = {
      totalListings: 5342,
      totalActiveUsers: 24567,
      totalBookings: 11234,
      totalRevenue: 1234567,
      pendingReports: 42,

      // New stats data
      bookedBedsPerDay: 120,
      bookedBedsPerMonth: 3600,

      bookedSeekersPerDay: 50,
      totalSeekersPerDay: 200,
      bookedSeekersPerMonth: 1500,
      totalSeekersPerMonth: 6000,

      // Cancellations
      totalCancellations: 300, // total cancelled bookings in a month
      cancellationPercentage: 300 / 11234 * 100, // calculate the percentage of cancellations

      // Listings added by listers
      bedsListedPerMonth: 450, // Number of beds listed by listers per month
      listingsAddedPerDay: 15, // Number of listings added per day
    };

 const formatNumber = (num) => {
    if (num === null || num === undefined) return "—";
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  

    return (
      <div className="p-6 pt-2 min-h-screen mt-4">
        <h1 className="text-[36px] font-extrabold text-black mb-4">
          Booking Management
        </h1>

        {/* Stats Grid */}
          {/* 📊 Dynamic Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {statsLoading ? (
          Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-3xl h-[112px] animate-pulse"
              >
                <div className="h-4 bg-gray-200 w-1/2 mb-3 rounded"></div>
                <div className="h-6 bg-gray-300 w-1/3 rounded"></div>
              </div>
            ))
        ) : (
          <>
            {/* 🛏 Bed Bookings */}
            <div className="bg-white p-4 rounded-3xl">
              <h3 className="text-gray-500 text-[13px]">Booked Beds Per Day</h3>
              <p className="text-4xl font-semibold mt-3">
                {formatNumber(statsData.bookedBedsDay)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-3xl">
              <h3 className="text-gray-500 text-[13px]">Booked Beds Per Month</h3>
              <p className="text-4xl font-semibold mt-3">
                {formatNumber(statsData.bookedBedsMonth)}
              </p>
            </div>

            {/* 🧍‍♀️ Booking User Stats */}
            <div className="bg-white p-4 rounded-3xl">
              <h3 className="text-gray-500 text-[13px]">
                Total Seekers Per Day
              </h3>
              <p className="text-2xl font-semibold mt-3">
                {formatNumber(statsData.bookedSeekersDay)} /{" "}
                {formatNumber(statsData.totalSeekersDay)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-3xl">
              <h3 className="text-gray-500 text-[13px]">
                Total Seekers Per Month
              </h3>
              <p className="text-2xl font-semibold mt-3">
                {formatNumber(statsData.bookedSeekersMonth)} /{" "}
                {formatNumber(statsData.totalSeekersMonth)}
              </p>
            </div>

            {/* 📉 Cancellations */}
            <div className="bg-white p-4 rounded-3xl">
              <h3 className="text-gray-500 text-[13px]">
                Cancellation % (Per Day)
              </h3>
              <p className="text-4xl font-semibold mt-3">
                {statsData.cancellationDay.toFixed(2)}%
              </p>
            </div>
            <div className="bg-white p-4 rounded-3xl">
              <h3 className="text-gray-500 text-[13px]">
                Cancellation % (Per Month)
              </h3>
              <p className="text-4xl font-semibold mt-3">
                {statsData.cancellationMonth.toFixed(2)}%
              </p>
            </div>

            {/* 🏠 Listings */}
            <div className="bg-white p-4 rounded-3xl">
              <h3 className="text-gray-500 text-[13px]">Listings Added Per Day</h3>
              <p className="text-4xl font-semibold mt-3">
                {formatNumber(statsData.roomListingsDay)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-3xl">
              <h3 className="text-gray-500 text-[13px]">
                Listings Added Per Month
              </h3>
              <p className="text-4xl font-semibold mt-3">
                {formatNumber(statsData.roomListingsMonth)}
              </p>
            </div>
          </>
        )}
      </div>
        {/* Filters */}
        <div className="flex justify-between flex-wrap gap-4 items-center mb-4">
          {/* Tabs */}
          <div className="flex bg-white rounded-lg w-full md:w-[464px] p-1">
            {["multi", "semiprivate" ,"private"].map((type) => (
              <button
                key={type}
                onClick={() => handleTabChange(type)}
                className={`flex-1 py-2 rounded-lg font-medium capitalize ${
                  activeTab === type
                    ? "button-bg text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {type.replace("semi", "semi ")}
              </button>
            ))}
          </div>

          {/* Booking Status Dropdown */}
          <div className="flex items-center gap-2 bg-white rounded-lg px-1 py-1">
            <select
              id="status"
              value={bookingStatus}
              onChange={handleStatusChange}
              className="rounded px-4 py-2 button-bg text-sm text-white"
            >
              <option className="text-black" value="completed">Completed</option>
              <option className="text-black" value="cancelled">Cancelled</option>
              <option className="text-black" value="pending">Upcoming</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl p-4">
          <div className="overflow-x-auto">
            {/* Table Header */}
            <div className="grid grid-cols-9 text-left bg-[#DEF5FF] font-medium rounded-lg text-sm">
              <div className="py-4 px-4">#</div>
              <div className="py-4">Booking ID</div>
              <div className="py-4 px-2">Booking Type</div>
              <div className="py-4 px-4">Bed Count</div>
              <div className="py-4 px-4">Location</div>
              <div className="py-4 px-2">Host Name</div>
              <div className="py-4">Seeker Name</div>
              <div className="py-4">Stay Duration</div>
              <div className="py-4 px-4">Status</div>
            </div>

            {/* Loading Shimmer */}
            {loading ? (
              Array(10).fill(0).map((_, i) => <div key={i}>{shimmerRow}</div>)
            ) : bookings.length === 0 ? (
              <p className="p-4 text-gray-500 text-sm text-center">No bookings found.</p>
            ) : (
              bookings.map((booking, index) => (
                <div
                  key={booking._id}
                  className="grid grid-cols-9 border-b last:border-none text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(booking._id)}
                >
                  <div className="py-4 px-4">{index + 1}</div>
                  <div className="py-4 px-2">{booking._id.slice(-6)}</div>
                  <div className="py-4 px-2 capitalize">{booking.roomType}</div>
                  <div className="py-4 px-10">{booking.bed.length}</div>
                  <div className="py-4 px-4">
                    {booking.room.city}, {booking.room.state}
                  </div>
                  <div className="py-4 px-2">{booking.lister.name}</div>
                  <div className="py-4 px-2">{booking.user.name}</div>
                  <div className="py-4 px-2">
                    {new Date(booking.startDate).toLocaleDateString()} -{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </div>
                  <div className="py-4 px-4">
  <span
    className={`px-4 py-1.5 text-xs rounded-full font-medium ${
      booking.bookingStatus === "completed"
        ? "bg-green-500 text-white"
        : booking.bookingStatus === "pending"
        ? "bg-yellow-500 text-white"
        : "bg-red-500 text-white"
    }`}
  >
    {booking.bookingStatus === "pending" ? "upcoming" : booking.bookingStatus}
  </span>
</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="self-center text-sm">
            Page {pagination.currentPage || page} of {pagination.totalPages || 1}
          </span>
          <button
            onClick={() =>
              setPage((prev) =>
                pagination.totalPages && prev < pagination.totalPages
                  ? prev + 1
                  : prev
              )
            }
            disabled={pagination.totalPages && page >= pagination.totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  export default Bookings;
