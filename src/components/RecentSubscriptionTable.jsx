import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from "../axios";

const RecentSubscriptionTable = ({ startDate, endDate }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch subscriptions with date filters
  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      try {
        let query = `/admin/subscriptions?page=${currentPage}`;
        if (startDate)
          query += `&startDate=${startDate.toISOString().split("T")[0]}`;
        if (endDate)
          query += `&endDate=${endDate.toISOString().split("T")[0]}`;

        const response = await axios.get(query);

        if (response.data.success) {
          setSubscriptions(response.data.data.subscriptions);
          setTotalPages(response.data.data.pagination.totalPages);
        } else {
          setError('Failed to fetch subscriptions.');
        }
      } catch (err) {
        console.error(err);
        setError('Something went wrong while fetching subscriptions.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [currentPage, startDate, endDate]); // re-fetch when filters or page change

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const ShimmerRow = () => (
    <div className="grid grid-cols-6 border-b last:border-none animate-pulse gap-4 space-y-4">
      <div className="py-4 px-4 bg-gray-300 h-4 rounded mt-4"></div>
      <div className="py-4 px-4 bg-gray-300 h-4 rounded"></div>
      <div className="py-4 px-4 col-span-2 bg-gray-300 h-4 rounded"></div>
      <div className="py-4 px-4 bg-gray-300 h-4 rounded"></div>
      <div className="py-4 px-4 bg-gray-300 h-4 rounded"></div>
    </div>
  );

  return (
    <div className="pt-2 min-h-screen">
      <div className="bg-white p-6 rounded-xl overflow-auto">
        <div className="w-full bg-[#F9FAFA] rounded-lg p-4">
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
            Array(5)
              .fill(0)
              .map((_, index) => <ShimmerRow key={index} />)
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
                    {moment(sub.createdAt).format('DD, MMM YYYY')}
                  </div>
                  <div className="col-span-1">
                    {sub._id.slice(-8).toUpperCase()}
                  </div>
                  <div className="col-span-1">{sub.user?.name || 'N/A'}</div>
                  <div className="col-span-1 capitalize">
                    {sub.productId.replace(/_/g, ' ')}
                  </div>
                  <div className="col-span-1">{sub.subscriptionPlan}</div>
                  <div className="col-span-1">
                    ${sub.subscriptionPrice.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
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

export default RecentSubscriptionTable;
