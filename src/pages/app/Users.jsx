import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "../../axios"; // Your axios instance
import { ErrorToast } from "../../components/global/Toaster"; // Your toast for errors
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Users = () => {
  const [activeTab, setActiveTab] = useState("listers");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);


  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    totalListers: 0,
    total: 0,
  });

  const fetchStats = async () => {
    setStatsLoading(true);

    try {
      // Day stats
      const dayRes = await axios.get("/admin/userRegistrationStats?filter=day");
      // Month stats
      const monthRes = await axios.get("/admin/userRegistrationStats?filter=month");

      if (dayRes.data.success && monthRes.data.success) {
        setStatsData({
          dailyUsers: dayRes.data.data.totalUsers,
          dailyListers: dayRes.data.data.totalListers,
          monthlyUsers: monthRes.data.data.totalUsers,
          monthlyListers: monthRes.data.data.totalListers,
        });
      } else {
        ErrorToast("Failed to fetch user/lister stats");
      }
    } catch (error) {
      console.error("Stats fetch error:", error);
      ErrorToast("Error fetching stats. Please try again.");
    }
    finally {
      setStatsLoading(false);
    }
  };

  // Fetch stats when tab changes
  useEffect(() => {
    fetchStats();
  }, [activeTab]);

  // 🧮 Helper function to format large numbers
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "—";
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };


  const UserShimmerRow = () => (
    <div className="grid grid-cols-10 border-b last:border-none animate-pulse">
      <div className="py-4 px-4">
        <div className="h-4 bg-gray-300 rounded w-4"></div>
      </div>
      <div className="py-4 col-span-2 flex items-center gap-2">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>
      <div className="py-4 px-4">
        <div className="h-4 bg-gray-300 rounded w-32"></div>
      </div>
      <div className="py-4 px-28 col-span-2">
        <div className="h-4 bg-gray-300 rounded w-10"></div>
      </div>
      <div className="py-4 px-4">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </div>
      <div className="py-4 px-4">
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </div>
      <div className="py-4 px-4">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </div>
      <div className="py-4 px-4">
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </div>
    </div>
  );

  // Fetch users/listers from API
  const fetchUsers = async (
    role = "lister",
    pageNumber = 1,
    search = "",
    startDateParam = null,
    endDateParam = null
  ) => {
    setLoading(true);
    try {
      const params = { role, page: pageNumber, search };
      if (startDateParam) params.startDate = startDateParam;
      if (endDateParam) params.endDate = endDateParam;

      const response = await axios.get(`/admin/users`, { params });

      if (response.data.success) {
        setUsers(response.data.data.users);
      } else {
        ErrorToast(response.data.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Fetch users error:", error);
      ErrorToast("Error fetching users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch users when activeTab, page, searchTerm, or date changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const start = startDate ? startDate.toISOString().split("T")[0] : null;
      const end = endDate ? endDate.toISOString().split("T")[0] : null;

      if (activeTab === "listers") {
        fetchUsers("lister", page, searchTerm, start, end);
      } else if (activeTab === "users") {
        fetchUsers("user", page, searchTerm, start, end);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [activeTab, page, searchTerm, startDate, endDate]);

  const handleRowClick = (user) => {
    const { _id, name, email, profilePicture, isDeactivatedByAdmin } = user;
    console.log("Row clicked for user:", user);
    if (activeTab === "listers") {
      navigate(`/app/lister-details/${_id}`, {
        state: { userId: _id, name, email, profilePicture, isDeactivatedByAdmin },
      });
    } else if (activeTab === "users") {
      navigate(`/app/user-details/${_id}`, {
        state: { userId: _id, name, email, profilePicture, isDeactivatedByAdmin },
      });
    }
  };

  const getGridCols = () => {
    return activeTab === "listers" ? "grid-cols-8" : "grid-cols-6";
  };

  const stats = {
    totalListings: 5342,
    totalActiveUsers: 24567,
    totalBookings: 11234,
    totalRevenue: 1234567,
    pendingReports: 42,
  };

  // Format number function
  // const formatNumber = (num) => {
  //   if (num === null || num === undefined) return "—";
  //   if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  //   if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  //   if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  //   return num.toString();
  // };

  return (
    <div className="p-6 pt-2 min-h-screen">
      <h1 className="text-[36px] font-extrabold text-black mb-4">
        User Management
      </h1>

      {/* 🆕 Dynamic Stats Cards */}
      {/* 🆕 Dynamic Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        {statsLoading ? (
          Array(2)
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
        ) : activeTab === "listers" ? (
          <>
            <div className="bg-white p-4 rounded-3xl text-left w-auto h-[112px]">
              <h3 className="text-gray-500 text-[13px]">New Lister signup today</h3>
              <p className="text-4xl font-semibold mt-3">
                {formatNumber(statsData.dailyListers)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-3xl text-left w-auto h-[112px]">
              <h3 className="text-gray-500 text-[13px]">New Lister signup this month</h3>
              <p className="text-4xl font-semibold mt-3">
                {formatNumber(statsData.monthlyListers)}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-4 rounded-3xl text-left w-auto h-[112px]">
              <h3 className="text-gray-500 text-[13px]">New User signup per day</h3>
              <p className="text-4xl font-semibold mt-3">
                {formatNumber(statsData.dailyUsers)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-3xl text-left w-auto h-[112px]">
              <h3 className="text-gray-500 text-[13px]">New User signup per month</h3>
              <p className="text-4xl font-semibold mt-3">
                {formatNumber(statsData.monthlyUsers)}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col mt-4 md:flex-row md:justify-end md:items-end">
        {/* Tabs */}
        <div className="flex bg-white rounded-lg p-1 mb-4">
          <button
            onClick={() => setActiveTab("listers")}
            className={`px-14 py-2 rounded-lg font-medium ${activeTab === "listers" ? "button-bg text-white" : "text-gray-600 hover:bg-gray-100"}`}
          >
            Listers
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-14 py-2 rounded-lg font-medium ${activeTab === "users" ? "button-bg text-white" : "text-gray-600 hover:bg-gray-100"}`}
          >
            Seekers
          </button>
        </div>
      </div>

      {/* Search & Date Filter */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-4 gap-4">
        <div className="flex flex-col w-full md:w-[350px]">
          <label className="text-sm font-semibold text-gray-700 mb-2">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        {/* Date Filter for both tabs */}
        <div className="flex items-center justify-end space-x-6 w-full">
          {/* Start Date */}
          <div className="flex flex-col w-56">
            <label className="text-sm font-semibold text-gray-700 mb-2">Start Date</label>
            <DatePicker
              selected={tempStartDate}
              onChange={(date) => setTempStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              placeholderText="Select start date"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col w-56">
            <label className="text-sm font-semibold text-gray-700 mb-2">End Date</label>
            <DatePicker
              selected={tempEndDate}
              onChange={(date) => setTempEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              placeholderText="Select end date"
              minDate={tempStartDate}
            />
          </div>

          {/* Apply Button */}
          <button
            onClick={() => {
              setStartDate(tempStartDate);
              setEndDate(tempEndDate);
              setPage(1); // reset to first page
            }}
            className="px-6 mt-6 py-2 button-bg text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Apply Filter
          </button>

          {/* Clear Filter Button */}
          <button
            onClick={() => {
              setTempStartDate(null);
              setTempEndDate(null);
              setStartDate(null);
              setEndDate(null);
              setPage(1); // reset to first page
            }}
            className="px-6 mt-6 py-2 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Clear Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl p-4">
        <div className="overflow-x-auto">
          <div className="text-left text-sm border-b bg-[#F9FAFA] p-2 rounded-lg font-normal">
            {/* Table Header */}
            <div className={`grid ${getGridCols()} font-medium text-left bg-[#DEF5FF] rounded-lg`}>
              <div className="py-4 px-4">#</div>
             

              {activeTab === "listers" && (
                <>
                   <div className="py-4 col-span-2">Lister Name</div>
              <div className="py-4 px-4">Email</div>
                  <div className="py-4 px-16 col-span-2">Total Properties</div>
                  <div className="py-4 px-4">{`Subscription Plan`}</div>
                  <div className="py-4 px-4">Status</div>
                </>
              )}
              {activeTab === "users" && (
                <>
                   <div className="py-4 col-span-2">Seeker Name</div>
              <div className="py-4 px-4">Email</div>
                  <div className="py-4 px-4">Join Date</div>
                  <div className="py-4 px-4">Status</div>
                </>
              )}
            </div>

            {/* Table Rows */}
            <div>
              {loading ? (
                Array(10)
                  .fill(0)
                  .map((_, index) => <UserShimmerRow key={index} />)
              ) : users.length === 0 ? (
                <div className="text-center p-4">No users found.</div>
              ) : (
                users.map((user, index) => (
                  <div
                    key={user._id}
                    className={`grid ${getGridCols()} border-b last:border-none text-sm text-gray-700 cursor-pointer`}
                    onClick={() => handleRowClick(user)}
                  >
                    <div className="py-4 px-4">{index + 1}</div>
                    <div className="py-4 col-span-2 flex items-center gap-2">
                      <img
                        src={user.profilePicture || "https://via.placeholder.com/40?text=No+Image"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {user.name}
                    </div>
                    <div className="py-4 truncate">{user.email}</div>

                    {activeTab === "listers" && (
                      <>
                        <div className="py-4 px-28 col-span-2">{user.totalListings}</div>
                        <div className="py-4 px-4">{user.activeSubscriptionPlan || "Freemium"}</div>
                        <div className="py-4 px-4">
                          <span
                            className={`px-4 py-1.5 text-xs rounded-full font-medium ${user.isDeactivatedByAdmin ? "bg-red-500 text-white" : "bg-green-500 text-white"
                              }`}
                          >
                            {user.isDeactivatedByAdmin ? "Inactive" : "Active"}
                          </span>
                        </div>
                      </>
                    )}
                    {activeTab === "users" && (
                      <>
                        <div className="py-4 px-4">{new Date(user.createdAt).toLocaleDateString()}</div>
                        <div className="py-4 px-4">
                          <span
                            className={`px-4 py-1.5 text-xs rounded-full font-medium ${user.isDeactivatedByAdmin ? "bg-red-500 text-white" : "bg-green-500 text-white"
                              }`}
                          >
                            {user.isDeactivatedByAdmin ? "Inactive" : "Active"}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-6 gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded bg-blue-500 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
