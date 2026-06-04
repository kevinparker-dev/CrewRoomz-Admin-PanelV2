import React, { useEffect, useState } from "react";
import axios from "../../axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RecentSubscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [statsLoading, setStatsLoading] = useState(false);
  const [stats, setStats] = useState({
    subscriptionDay: 0,
    subscriptionMonth: 0,
    platformDay: 0,
    platformMonth: 0,
  });

  // 📅 Date filters
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // ---------- 📊 FETCH STATS ----------
  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const [subDay, subMonth, platDay, platMonth] = await Promise.all([
        axios.get("/admin/subscriptionRevenue?filter=day"),
        axios.get("/admin/subscriptionRevenue?filter=month"),
        axios.get("/admin/platformRevenue?filter=day"),
        axios.get("/admin/platformRevenue?filter=month"),
      ]);

      setStats({
        subscriptionDay: subDay.data?.data?.totalRevenue || 0,
        subscriptionMonth: subMonth.data?.data?.totalRevenue || 0,
        platformDay: platDay.data?.data?.totalRevenue || 0,
        platformMonth: platMonth.data?.data?.totalRevenue || 0,
      });
    } catch (error) {
      console.error("Error fetching revenue stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  // ---------- 💳 FETCH SUBSCRIPTIONS ----------
  const fetchSubscriptions = async (page = 1) => {
    setLoading(true);
    try {
      let query = `/admin/subscriptions?page=${page}`;
      if (startDate)
        query += `&startDate=${startDate.toISOString().split("T")[0]}`;
      if (endDate)
        query += `&endDate=${endDate.toISOString().split("T")[0]}`;

      const response = await axios.get(query);
      if (response.data.success) {
        setSubscriptions(response.data.data.subscriptions);
        setTotalPages(response.data.data.pagination.totalPages);
      } else {
        setError("Failed to fetch subscriptions.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching subscriptions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions(currentPage);
    fetchStats();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // ---------- 📆 FILTER HANDLERS ----------
  const handleApplyFilter = () => {
    setCurrentPage(1);
    fetchSubscriptions(1);
  };

  const handleClearFilter = () => {
    // setStartDate(null);
    // setEndDate(null);
    // setCurrentPage(1);
    // fetchSubscriptions(1);
    window.location.reload();
  };

  // ---------- 🧮 FORMAT NUMBER ----------
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "—";
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="p-6 pt-2 min-h-screen">
      <h3 className="text-[36px] font-bold pb-4 pt-4">
        Recent Subscriptions
      </h3>

      {/* ---------- 💹 Revenue Stats Section ---------- */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        {statsLoading
          ? Array(4)
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
          : [
              { label: "Subscription Revenue (Day)", value: stats.subscriptionDay },
              { label: "Subscription Revenue (Month)", value: stats.subscriptionMonth },
              { label: "Platform Revenue (Day)", value: stats.platformDay },
              { label: "Platform Revenue (Month)", value: stats.platformMonth },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-3xl text-left w-auto h-[112px] overflow-hidden"
              >
                <h3 className="text-gray-500 text-[13px] leading-tight truncate">
                  {item.label}
                </h3>
                <p
                  className="text-4xl font-semibold mt-3 truncate"
                  title={item.value}
                >
                  ${formatNumber(item.value)}
                </p>
              </div>
            ))}
      </div>

      {/* ---------- 📅 Date Filters ---------- */}
      <div className="flex items-center justify-end space-x-6 mb-6">
        <div className="flex flex-col w-56">
          <label className="text-sm font-semibold text-gray-700 mb-2">
            Start Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            placeholderText="Select start date"
          />
        </div>

        <div className="flex flex-col w-56">
          <label className="text-sm font-semibold text-gray-700 mb-2">
            End Date
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            placeholderText="Select end date"
            minDate={startDate}
          />
        </div>

        <button
          onClick={handleApplyFilter}
          className="px-6 mt-6 py-2 button-bg text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Apply Filter
        </button>

        <button
          onClick={handleClearFilter}
          className="px-6 py-2 mt-6 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400"
        >
          Clear Filter
        </button>
      </div>

      {/* ---------- 📜 Subscription Table ---------- */}
      <div className="bg-white p-6 rounded-xl overflow-auto">
        <div className="w-full bg-[#F9FAFA] rounded-lg p-4">
          {/* Table Headers */}
          <div className="grid grid-cols-7 text-left text-sm border-b bg-[#DEF5FF] py-4 rounded-lg font-semibold">
            <div className="ml-4">#</div>
            <div className="col-span-1">Date</div>
            <div className="col-span-1">Transaction ID</div>
            <div className="col-span-1">Subscriber Name</div>
            <div className="col-span-1">Subscription Plan</div>
            <div className="col-span-1">Plan Duration</div>
            <div className="col-span-1">Amount Paid</div>
          </div>

          {loading ? (
            <p className="p-4 text-sm">Loading...</p>
          ) : error ? (
            <p className="p-4 text-red-500 text-sm">{error}</p>
          ) : (
            <div className="grid gap-y-2">
              {subscriptions.map((sub, idx) => (
                <div
                  key={sub._id}
                  className="grid grid-cols-7 items-center border-b py-6 text-sm"
                >
                  <div className="ml-4 col-span-1">
                    {(currentPage - 1) * 10 + idx + 1}
                  </div>
                  <div className="col-span-1">
                    {moment(sub.createdAt).format("DD, MMM YYYY")}
                  </div>
                  <div className="col-span-1">
                    {sub._id.slice(-8).toUpperCase()}
                  </div>
                  <div className="col-span-1">{sub.user?.name || "N/A"}</div>
                  <div className="col-span-1 capitalize">
                    {sub.productId?.replace(/_/g, " ") || "N/A"}
                  </div>
                  <div className="col-span-1 capitalize">
                    {sub.subscriptionPlan || "N/A"}
                  </div>
                  <div className="col-span-1">
                    ${sub.subscriptionPrice?.toFixed(2) || "0.00"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---------- Pagination Controls ---------- */}
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-600 px-4 py-2 mx-2 rounded-md"
          >
            Previous
          </button>

          <span className="text-lg font-semibold">
            {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 text-gray-600 px-4 py-2 mx-2 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentSubscription;
