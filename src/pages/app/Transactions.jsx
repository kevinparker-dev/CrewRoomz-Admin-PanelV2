import React, { useState, useEffect } from "react";
import axios from "../../axios";
import RecentSubscriptionTable from "../../components/RecentSubscriptionTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [stats, setStats] = useState({
    booking: 0,
    subscription: 0,
    totalRevenue: 0,
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // ---------- 📊 FETCH STATS ----------
  const fetchStats = async (start = startDate, end = endDate) => {
    setStatsLoading(true);
    try {
      let query = `/admin/getRevenueStats`;

      if (start) query += `?fromDate=${start.toISOString().split("T")[0]}`;
      if (end)
        query += `${start ? "&" : "?"}toDate=${end.toISOString().split("T")[0]}`;

      const response = await axios.get(query);

      if (response.data.success) {
        setStats({
          booking: response.data.data.bookingRevenue || 0,
          subscription: response.data.data.subscriptionRevenue || 0,
          totalRevenue: response.data.data.totalRevenue || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching revenue stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // ---------- 💰 FETCH TRANSACTIONS ----------
  const fetchTransactions = async (
    page = 1,
    start = startDate,
    end = endDate,
  ) => {
    setLoading(true);
    try {
      let query = `/admin/bookingTransactions?page=${page}`;

      if (start) query += `&startDate=${start.toISOString().split("T")[0]}`;
      if (end) query += `&endDate=${end.toISOString().split("T")[0]}`;

      const response = await axios.get(query);

      if (response.data.success) {
        setTransactions(response.data.data.transactions);
        setPagination(response.data.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: newPage,
      }));
    }
  };

  const handleDateChange = () => {
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));
    fetchTransactions(1);
    fetchStats();
  };

  const handleClearDateFilters = () => {
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));

    setStartDate(null);
    setEndDate(null);

    // 👇 pass null explicitly
    fetchTransactions(1, null, null);
    fetchStats(null, null);
  };
  // ---------- 🩶 SHIMMERS ----------
  const ShimmerRow = () => (
    <div className="grid grid-cols-6 border-b last:border-none animate-pulse gap-4 space-y-4">
      <div className="py-4 px-4 bg-gray-300 h-4 rounded mt-4"></div>
      <div className="py-4 px-4 bg-gray-300 h-4 rounded"></div>
      <div className="py-4 px-4 col-span-2 bg-gray-300 h-4 rounded"></div>
      <div className="py-4 px-4 bg-gray-300 h-4 rounded"></div>
      <div className="py-4 px-4 bg-gray-300 h-4 rounded"></div>
    </div>
  );

  // ---------- 🔢 FORMATTER ----------
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "—";
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="p-6 pt-2 min-h-screen">
      <h1 className="text-[36px] font-extrabold text-black mb-4 mt-4">
        Transaction Overview
      </h1>

      {/* ---------- 📆 Date Filters ---------- */}
      <div className="flex items-center justify-start space-x-6 pb-6 w-full">
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
          onClick={handleDateChange}
          className="px-6 mt-6 py-2 button-bg text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Apply Filter
        </button>

        <button
          onClick={handleClearDateFilters}
          className="px-6 py-2 mt-6 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400"
        >
          Clear Filter
        </button>
      </div>

      {/* ---------- 💹 Revenue Stats Section ---------- */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {statsLoading
          ? Array(3)
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
              {
                label: "Total Revenue",
                value: stats.totalRevenue,
              },
              {
                label: "Subscription Revenue",
                value: stats.subscription,
              },
              {
                label: "Platform Revenue",
                value: stats.totalRevenue,
              },
              // {
              //   label: "Subscription Revenue (Day)",
              //   value: stats.subscriptionDay,
              // },
              // {
              //   label: "Subscription Revenue (Month)",
              //   value: stats.subscriptionMonth,
              // },
              // {
              //   label: "Platform Revenue (Day)",
              //   value: stats.platformDay,
              // },
              // {
              //   label: "Platform Revenue (Month)",
              //   value: stats.platformMonth,
              // },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-3xl text-left w-auto h-[112px] overflow-hidden"
              >
                <h3
                  className={`text-gray-500 text-[13px] ${item.label === "Total Revenue" ? "font-semibold" : ""} leading-tight truncate`}
                >
                  {item.label}
                </h3>
                <p
                  className="text-4xl font-semibold mt-3 truncate"
                  title={item.value}
                >
                  ${item.value}
                </p>
              </div>
            ))}
      </div>

      {/* ---------- 📅 Filters and Tabs ---------- */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex bg-white rounded-lg w-72 p-1">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-8 py-2 rounded-lg font-medium ${
              activeTab === "bookings"
                ? "button-bg text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab("subscriptions")}
            className={`px-6 py-2 rounded-lg font-medium ${
              activeTab === "subscriptions"
                ? "button-bg text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Subscriptions
          </button>
        </div>

        {/* {activeTab === "bookings" && ( */}

        {/* )} */}
      </div>

      {/* ---------- 📜 Table Section ---------- */}
      {activeTab === "bookings" && (
        <div className="bg-white rounded-2xl p-4">
          <div className="overflow-x-auto">
            <div className="text-left text-sm border-b bg-[#F9FAFA] p-2 rounded-lg">
              <div className="grid grid-cols-7 text-left bg-[#DEF5FF] rounded-lg font-medium">
                <div className="py-4 px-4">#</div>
                <div className="py-4">Lister Name</div>
                <div className="py-4 px-4">Seeker Name</div>
                <div className="py-4 px-4">Total Price</div>
                <div className="py-4 px-4">Platform Fee</div>
                <div className="py-4 px-4">Admin Commission</div>
                <div className="py-4 px-4">Join Date</div>
              </div>

              {loading
                ? Array(5)
                    .fill(0)
                    .map((_, index) => <ShimmerRow key={index} />)
                : transactions.map((transaction, index) => (
                    <div
                      key={transaction._id}
                      className="grid grid-cols-7 border-b last:border-none text-sm font-medium text-gray-700"
                    >
                      <div className="py-4 px-4">{index + 1}</div>
                      <div className="py-4">{transaction.lister.name}</div>
                      <div className="py-4 px-4">{transaction.user.name}</div>
                      <div className="py-4 px-8">${transaction.totalPrice}</div>
                      <div className="py-4 px-8">
                        ${transaction.platformFee}
                      </div>
                      <div className="py-4 px-8">
                        {transaction.adminCommission}% ($
                        {transaction.adminCommissionAmount})
                      </div>
                      <div className="py-4 px-4">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "subscriptions" && (
        <RecentSubscriptionTable startDate={startDate} endDate={endDate} />
      )}
    </div>
  );
};

export default Transactions;
