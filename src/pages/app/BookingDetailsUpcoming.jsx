import { LocationEdit } from "lucide-react";
import React, { useState } from "react";
import { BsFilePdf } from "react-icons/bs";
import { FaWifi, FaSnowflake, FaSwimmingPool, FaCoffee, FaClipboardList } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

const BookingDetailsUpcoming = () => {

    const [activeTab, setActiveTab] = useState("summary");

  return (
    <div className="p-6 min-h-screen ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[36px] font-extrabold text-gray-800">Booking Detail</h1>
        <span className=" text-sm font-semibold bg-[#DC1D00] text-white px-4 py-3 rounded-full">
          Canceled
        </span>
      </div>

      {/* Main Content */}
      <div className=" rounded-2xl ">
        
        <div className="bg-white rounded-2xl p-6"> 
        {/* Image + Details */}
        <div className="flex flex-col lg:flex-row gap-6 bg-[#F9FAFA] p-6 rounded-2xl">
          {/* Main Image */}
          <div className="w-[503px]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="Room"
              className="rounded-xl w-full h-[362px] object-cover"
            />
            {/* Thumbnails */}
            <div className="flex gap-2 mt-3 ">
              {Array(4)
                .fill("https://images.unsplash.com/photo-1600585154340-be6161a56a0c")
                .map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`thumb-${idx}`}
                    className="w-[120px] h-[80px] object-cover rounded-lg border cursor-pointer"
                  />
                ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 w-[489px]">
            <h2 className="text-[32px] font-bold text-gray-800">Gaular, Norway</h2>
            <p className="text-gray-600 text-sm flex items-center mt-1">
            <LocationEdit/> <span className="ml-2"> 456 Maple Street, Anytown, NY 12345</span> 
            </p>
            <a href="#" className="text-blue-500 text-sm underline flex mt-1">
              <LocationEdit className="mr-2"/> Show on Google Maps
            </a>

            <p className="text-sm text-gray-700 mt-2 ">
              1 King Bed, 1 Private Bath
            </p>

            {/* Amenities */}
            <div className="mt-4">
              <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 text-[16px]">Amenities</h3>
              <h3 className="text-[#36C0EF] hover:underline cursor-pointer">View all</h3>
              </div>
              <div className="flex gap-4 mt-2 flex-wrap">
                <div className="flex flex-col w-[84px] rounded-xl bg-white p-4 items-center text-sm text-gray-600">
                  <FaWifi className="text-xl text-[#24A3FF]" />
                  Wi-Fi
                </div>
                <div className="flex flex-col items-center text-sm text-gray-600  w-[84px] rounded-xl bg-white p-4">
                  <FaSnowflake className="text-xl text-[#24A3FF]" />
                  AC
                </div>
                <div className="flex flex-col items-center text-sm text-gray-600  w-[84px] rounded-xl bg-white p-4">
                  <FaSwimmingPool className="text-xl text-[#24A3FF]" />
                  Pool
                </div>
                <div className="flex flex-col items-center text-sm text-gray-600  w-[84px] rounded-xl bg-white p-4">
                  <FaCoffee className="text-xl text-[#24A3FF]" />
                  Breakfast
                </div>
                  <div className="flex flex-col items-center text-sm text-gray-600  w-[84px] rounded-xl bg-white p-4">
                  <FaSwimmingPool className="text-xl text-[#24A3FF]" />
                  Pool
                </div>
              </div>

            {/* Description */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800">Description</h3>
              <p className="text-[16px] text-gray-600 mt-1">
                Experience flexible and budget-friendly accommodation with our Hot Beds.
                Enjoy fresh linens, secure lockers, and high-speed WiFi in a well-maintained room.
              </p>
            </div>

            {/* Rules */}
            <div className="mt-4  ">
              <h3 className="font-semibold text-gray-800">Rules to Live</h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-700 bg-white w-[461px] h-[52px] p-4   rounded-lg">
                <BsFilePdf className="text-[#A51600] text-3xl" /> Rules
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      

      {/* Bed Type and Prices + Cancellation Reason */}
     <div className="bg-white rounded-2xl mt-8 p-6 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          {/* Bed Type and Prices */}
          <div className="bg-[#F9FAFA] rounded-2xl p-6 shadow-sm">
            <h3 className="text-[16px] font-semibold text-gray-800 mb-4">
              Bed Type And Prices
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 text-sm font-semibold">
                  King Bed
                </span>
              </div>
              <div className="flex items-center justify-between bg-[#EAF6FE] rounded-2xl">
                <div className="flex-1 bg-[#24A3FF] text-white flex justify-between items-center px-5 py-3 rounded-2xl">
                  <span>Daily</span>
                  <span className="font-semibold">$50</span>
                </div>
                <div className="flex-1 bg-white text-gray-700 flex justify-between items-center px-5 py-3 rounded-2xl ml-2">
                  <span>Daily</span>
                  <span className="text-[#24A3FF] font-semibold">$50</span>
                </div>
              </div>
            </div>
          </div>

          {/* Host and Guest Details */}
          <div className="bg-[#F9FAFA] rounded-2xl p-6 shadow-sm">
            <h3 className="text-[16px] font-semibold text-gray-800 mb-4">
              Host and Guest Details
            </h3>

            {/* Host */}
            <div className="flex justify-between items-center bg-[#29ABE20A] p-4 rounded-2xl mb-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/60?img=1"
                  alt="host"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 text-[15px]">
                    Mike Smith
                  </h4>
                  <p className="text-gray-500 text-sm">Host</p>
                </div>
              </div>
              <button className="button-bg text-white text-2xl rounded-md p-2 w-9 h-9 flex items-center justify-center">
                <IoIosArrowForward />

              </button>
            </div>

            {/* Guest */}
            <div className="flex justify-between items-center bg-[#29ABE20A] p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/60?img=2"
                  alt="guest"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 text-[15px]">
                    Mike Smith
                  </h4>
                  <p className="text-gray-500 text-sm">Guest</p>
                </div>
              </div>
              <button className="button-bg text-white text-2xl rounded-md p-2 w-9 h-9 flex items-center justify-center">
                                <IoIosArrowForward />

              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[#F9FAFA] rounded-2xl p-6 shadow-sm">
          <h3 className="text-[16px] font-semibold text-gray-800 mb-4">
            Booking Details
          </h3>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-200 mb-4">
            <button
              className={`pb-2 font-semibold text-sm ${
                activeTab === "summary"
                  ? "text-[#24A3FF] border-b-2 border-[#24A3FF]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("summary")}
            >
              Summary
            </button>
            <button
              className={`pb-2 font-semibold text-sm ${
                activeTab === "billing"
                  ? "text-[#24A3FF] border-b-2 border-[#24A3FF]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("billing")}
            >
              Billing Details
            </button>
          </div>

          {/* Summary Section */}
          {activeTab === "summary" && (
            <div className="text-sm text-gray-700 space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Booking ID:</span>
                <span className="text-gray-600">HFG567890</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Bed Type:</span>
                <span className="text-gray-600">King Bed</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Booking Type:</span>
                <span className="text-gray-600">Monthly</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Price:</span>
                <span className="text-gray-600">$100</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Stay Duration:</span>
                <span className="text-gray-600">
                  21 Jul – 08 Aug, 2025
                </span>
              </div>
            </div>
          )}

          {/* Billing Section */}
          {activeTab === "billing" && (
            <div className="text-sm text-gray-700 space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Total Price:</span>
                <span className="text-gray-600">$100</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Taxes:</span>
                <span className="text-gray-600">$10</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Service Fee:</span>
                <span className="text-gray-600">$5</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2">
                <span className="font-semibold text-gray-800">Grand Total:</span>
                <span className="font-semibold text-gray-800">$115</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

      {/* Host and Guest Details */}
    
    </div>
    </div>
  );
};

export default BookingDetailsUpcoming;
