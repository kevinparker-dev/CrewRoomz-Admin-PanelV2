import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaDollarSign,
  FaCalendarCheck,
  FaClipboardList,
} from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router";
import axios from "../../axios"; // Make sure axios is configured correctly
import moment from "moment";

const DummyHome = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/app/recent-subscription");
  };

  const [stats, setStats] = useState({
    totalListings: 0,
    activeUsers: 0,
    totalBookings: 0,
    revenue: 0,
    reportsPending: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [revenueData, setRevenueData] = useState([]);
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);

  // Fetch Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/admin/getStates");
        if (response.data.success) {
          setStats(response.data.data);
        } else {
          setError("Failed to load stats");
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("An error occurred while fetching the data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  // Fetch Subscriptions
  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/admin/subscriptions?page=${currentPage}`,
        );
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

    fetchSubscriptions();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Line Chart Data
  const lineData = [
    { name: "Jan", Users: 100, Listers: 50 },
    { name: "Feb", Users: 200, Listers: 150 },
    { name: "Mar", Users: 300, Listers: 180 },
    { name: "Apr", Users: 350, Listers: 200 },
    { name: "May", Users: 400, Listers: 250 },
    { name: "Jun", Users: 500, Listers: 300 },
    { name: "Jul", Users: 600, Listers: 400 },
    { name: "Aug", Users: 735, Listers: 500 },
    { name: "Sep", Users: 650, Listers: 480 },
    { name: "Oct", Users: 700, Listers: 520 },
    { name: "Nov", Users: 720, Listers: 540 },
    { name: "Dec", Users: 800, Listers: 600 },
  ];

  // Pie Chart Data (Google Charts format)
  // Fetch Revenue by Plan
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get("/admin/getRevenueByPlan");
        if (response.data.success) {
          const formattedData = [
            ["Plan", "Revenue"],
            ...response.data.data.result.map((plan) => [
              plan.planName,
              plan.revenue,
            ]),
          ];
          setRevenueData(formattedData);
        } else {
          setError("Failed to load revenue data");
        }
      } catch (err) {
        console.error("Error fetching revenue data:", err);
        setError("An error occurred while fetching the revenue data");
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        const response = await axios.get("/admin/monthlyRevenue");
        if (response.data.success) {
          const formattedData = response.data.data.map((item) => ({
            month: item.month,
            revenue: item.revenue,
          }));
          setMonthlyRevenueData(formattedData);
        } else {
          setError("Failed to load monthly revenue data");
        }
      } catch (err) {
        console.error("Error fetching monthly revenue:", err);
        setError("An error occurred while fetching the monthly revenue data");
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyRevenue();
  }, []);

  // Pie chart options
  const pieOptions = {
    title: "Revenue by Subscription",
    titleTextStyle: {
      alignment: "start",
      fontSize: 18,
      bold: true,
      color: "#233238",
    },
    is3D: true,
    pieStartAngle: 100,
    sliceVisibilityThreshold: 0.02,
    backgroundColor: "#F9FAFA",
    legend: {
      position: "top",
      alignment: "start",
      textStyle: {
        color: "#233238",
        fontSize: 14,
      },
    },
    colors: ["#FF8042", "#E040FB", "#0088FE"], // You can modify this if there are more plans
    chartArea: {
      top: 70,
      width: "100%",
      height: "80%",
    },
  };

  // Bookings (for reference, can be used if needed)
  const bookings = [
    {
      id: 1,
      bookingId: "GH465279",
      bookingType: "Monthly",
      bedType: "Bunk Bed",
      location: "Gaular, Norway",
      hostName: "Jackson John",
      userName: "Mike Smith",
      stayDuration: "21 Jul - 08 Aug, 2025",
      status: "Upcoming",
    },
  ];

  const Loader = () => (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-10 h-10 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-[#4A90E2]"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const formatNumber = (num) => {
    if (num === null || num === undefined) return "—";
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="p-6 pt-2 space-y-6 h-screen">
      {/* Heading */}
      <h1 className="text-[36px] mt-4 font-extrabold text-black">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Revenue", value: stats.totalRevenue },
          { label: "Total Listings", value: stats.totalListings },
          {
            label: "Active Users (Listers + Seekers)",
            value: stats.totalActiveUsers,
          },
          { label: "Total Bookings", value: stats.totalBookings },
          // { label: "Revenue", value: `$${formatNumber(stats.totalRevenue)}` },
          { label: "Reports Pending Review", value: stats.pendingReports },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-3xl text-left  h-[112px] overflow-hidden"
          >
            <h3 className="text-gray-500 text-[13px] leading-tight truncate">
              {item.label}
            </h3>
            <p
              className="text-4xl font-semibold mt-3 truncate"
              title={item.value} // show full number on hover
            >
              {item.label === "Total Revenue"
                ? "$" + item.value
                : formatNumber(item.value)}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="bg-white p-4 rounded-xl">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
          {/* Line Chart */}
          <div className="bg-[#F9FAFA] rounded-xl p-4 col-span-2">
            <h3 className="text-lg font-semibold mb-6">
              Revenue by Users (Listers + Seekers)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FF7B17"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 3D Google Pie Chart */}
          <div className="bg-[#F9FAFA] p-6 rounded-xl">
            {revenueData.length > 0 ? (
              <Chart
                chartType="PieChart"
                data={revenueData}
                options={pieOptions}
                width={"100%"}
                height={"350px"}
                backgroundColor={"#F9FAFA"}
              />
            ) : (
              <p>No revenue data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Subscriptions Table */}
      <div className="bg-white p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[24px] font-bold">Recent Subscriptions</h3>
          <button
            onClick={handleViewAll}
            className="text-blue-500 text-sm hover:underline"
          >
            View All
          </button>
        </div>

        {/* Subscriptions Table */}
        <div className="bg-white  rounded-xl overflow-auto">
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
                      {sub.productId.replace(/_/g, " ")}
                    </div>
                    <div className="col-span-1 capitalize">
                      {sub.subscriptionPlan}
                    </div>
                    <div className="col-span-1">
                      ${sub.subscriptionPrice.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {/* <div className="flex justify-center items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-200 text-gray-600 px-4 py-2 mx-2 rounded-md"
            >
              Previous
            </button>

            <span className="text-lg font-semibold">{currentPage} of {totalPages}</span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-200 text-gray-600 px-4 py-2 mx-2 rounded-md"
            >
              Next
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DummyHome;
