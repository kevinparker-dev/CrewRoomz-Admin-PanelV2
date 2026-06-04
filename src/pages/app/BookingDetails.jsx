import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { LocationEdit } from "lucide-react";
import {
  BsFilePdf,
} from "react-icons/bs";
import {
  FaWifi,
  FaSnowflake,
  FaSwimmingPool,
  FaCoffee,
} from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import axios from "../../axios";
import { CiLocationOn } from "react-icons/ci";
import {
  acIcon,
  barbQIcon,
  bathIcon,
  chargeIcon,
  cleaningIcon,
  deskIcon,
  dispenserIcon,
  dryerIcon,
  fireAlarmIcon,
  gymIcon,
  ironIcon,
  matleIcon,
  parkingIcon,
  silencerIcon,
  smokeIcon,
  stoveIcon,
  switchIcon,
  teaIcon,
  tvIcon,
  wifiIcon,
  washingIcon,
  towels,
  dishwasher,
  fridge,
  freezer,
  airfryer,
  steamer,
} from '../../assets/export'; // Update the path if necessary




 
  const BookingDetailsSkeleton = () => {
  return (
    <div className="p-6 min-h-screen animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <div className="h-8 w-60 bg-gray-300 rounded-md" />
        </div>
        <div className="h-10 w-24 bg-gray-300 rounded-full" />
      </div>

      {/* Image & Details */}
      <div className="bg-white rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-6 bg-[#F9FAFA] p-6 rounded-2xl">
          {/* Image */}
          <div className="w-full lg:w-[503px]">
            <div className="w-full h-[362px] bg-gray-300 rounded-xl" />
            <div className="flex gap-2 mt-3">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="w-[120px] h-[80px] bg-gray-300 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4 mt-6 lg:mt-0">
            <div className="h-8 w-2/3 bg-gray-300 rounded-md" />
            <div className="h-4 w-1/2 bg-gray-300 rounded-md" />
            <div className="h-4 w-40 bg-gray-300 rounded-md" />

            {/* Amenities */}
            <div className="space-y-2 mt-4">
              <div className="h-4 w-24 bg-gray-300 rounded-md" />
              <div className="flex gap-4 flex-wrap">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="w-[84px] h-[72px] bg-gray-200 rounded-xl" />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 mt-4">
              <div className="h-4 w-32 bg-gray-300 rounded-md" />
              <div className="h-4 w-full bg-gray-200 rounded-md" />
              <div className="h-4 w-5/6 bg-gray-200 rounded-md" />
            </div>

            {/* Rules */}
            <div className="space-y-2 mt-4">
              <div className="h-4 w-24 bg-gray-300 rounded-md" />
              <div className="w-[461px] h-[52px] bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Bed Types, Host, Guest */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-2xl p-6 space-y-3">
          <div className="h-4 w-48 bg-gray-300 rounded-md" />
          {Array(2).fill(0).map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded-xl " />
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 space-y-3">
          <div className="h-4 w-48 bg-gray-300 rounded-md" />
          <div className="h-16 bg-gray-200 rounded-xl" />
          <div className="h-16 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

const BookingDetails = () => {
  const { bookingId } = useParams(); // get ID from URL
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBillingDetailsVisible, setIsBillingDetailsVisible] = useState(false);

  // Function to handle the toggle
    const handleToggleBillingDetails = () => {
    setIsBillingDetailsVisible((prev) => !prev);
  };

  const handleBack = () => navigate(-1);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`/admin/booking/${bookingId}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [bookingId]);

  if (loading) {
    return <BookingDetailsSkeleton />;
  }

  if (!data) {
    return <div className="p-6 text-center text-red-500">Failed to load booking details.</div>;
  }

  const {
    bookingStatus,
    cancellationReason,
    room,
    user,
    bed,
    startDate,
    endDate,
    totalPrice,
    platformFee,
    adminCommissionAmount,
  } = data;



  const totalAmount = parseFloat(platformFee) + parseFloat(adminCommissionAmount) + parseFloat(totalPrice);
  const commissionPercentage = (adminCommissionAmount / totalPrice) * 100;


  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button onClick={handleBack} className="pb-1 mr-1 font-bold text-black">
            <FaArrowLeft size={28} />
          </button>
          <h1 className="text-[36px] text-black mb-2 font-bold">Booking Details</h1>
        </div>
        <span
          className={`text-sm font-semibold px-4 py-3 rounded-full ${
            bookingStatus === "completed"
              ? "bg-green-500 text-white"
              : bookingStatus === "pending"
              ? "bg-yellow-500 text-white"
              : "bg-[#DC1D00] text-white"
          }`}
        >
          {bookingStatus}
        </span>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-6 bg-[#F9FAFA] p-6 rounded-2xl">
          {/* Room Images */}
          <div className="w-full lg:w-[503px]">
            <img
              src={room.media?.[0]}
              alt="Room"
              className="rounded-xl w-full h-[362px] object-cover"
            />
            <div className="flex gap-2 mt-3">
              {room.media?.slice(0, 4).map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`thumb-${idx}`}
                  className="w-[120px] h-[80px] object-cover rounded-lg border cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Room Info */}
          <div className="flex-1">
            <h2 className="text-[32px] font-bold text-gray-800">
              {room.city}, {room.state}
            </h2>
            <p className="text-gray-600 text-sm flex items-center mt-1">
              <CiLocationOn className="text-xl" /> <span className="ml-2">{room.address}</span>
            </p>
            <a
              href={`https://maps.google.com/?q=${room.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm underline flex mt-1"
            >
              <CiLocationOn  className="mr-2 text-xl" />
              Show on Google Maps
            </a>
            <p className="text-sm text-gray-700 mt-2">
              {bed.length} Bed{bed.length > 1 ? "s" : ""},{" "}
              {room.privateBath ? "Private Bath" : "Shared Bath"}
            </p>

            {/* Amenities */}
            <div className="mt-4">
  <div className="flex justify-between items-center">
    <h3 className="font-semibold text-gray-800 text-[16px]">Amenities</h3>
    {/* <h3 className="text-[#36C0EF] hover:underline cursor-pointer">View all</h3> */}
  </div>
  <div className="flex gap-4 mt-2 flex-wrap">
    {room.amenities?.slice(0, 6).map((a, i) => {
      // Map the amenity to its icon
      const getAmenityIcon = (amenity) => {
  switch (amenity) {
    case "Wifi":
      return <img src={wifiIcon} alt="Wifi" className="w-6 h-6" />;
    case "Heating":
      return <img src={acIcon} alt="Heating" className="w-6 h-6" />;
    case "Washer":
      return <img src={washingIcon} alt="Washer" className="w-6 h-6" />;
    case "Iron":
      return <img src={ironIcon} alt="Iron" className="w-6 h-6" />;
    case "Hair dryer":
      return <img src={dryerIcon} alt="Hair Dryer" className="w-6 h-6" />;
    case "EV Charger":
      return <img src={chargeIcon} alt="EV Charger" className="w-6 h-6" />;
    case "Cleaning Service":
      return <img src={cleaningIcon} alt="Cleaning Service" className="w-6 h-6" />;
    case "BBQ Grill":
      return <img src={barbQIcon} alt="BBQ Grill" className="w-6 h-6" />;
    case "Pool":
      return <img src={bathIcon} alt="Pool" className="w-6 h-6" />;
    case "Carbon Monoxide Alarm":
      return <img src={fireAlarmIcon} alt="Carbon Monoxide Alarm" className="w-6 h-6" />;
    case "Smoke Alarm":
      return <img src={smokeIcon} alt="Smoke Alarm" className="w-6 h-6" />;
    case "Hot Tub":
      return <img src={bathIcon} alt="Hot Tub" className="w-6 h-6" />;
    case "Water Dispenser":
      return <img src={dispenserIcon} alt="Water Dispenser" className="w-6 h-6" />;
    case "Dryer":
      return <img src={dryerIcon} alt="Dryer" className="w-6 h-6" />;
    case "Kitchen":
      return <img src={deskIcon} alt="Kitchen" className="w-6 h-6" />;
    case "Air - Conditioning":
      return <img src={acIcon} alt="Air Conditioning" className="w-6 h-6" />;
    case "Gym":
      return <img src={gymIcon} alt="Gym" className="w-6 h-6" />;
    case "Parking":
      return <img src={parkingIcon} alt="Parking" className="w-6 h-6" />;
    case "Matle":
      return <img src={matleIcon} alt="Matle" className="w-6 h-6" />;
    case "Silencer":
      return <img src={silencerIcon} alt="Silencer" className="w-6 h-6" />;
    case "Stove":
      return <img src={stoveIcon} alt="Stove" className="w-6 h-6" />;
    case "Switch":
      return <img src={switchIcon} alt="Switch" className="w-6 h-6" />;
    case "Tea":
      return <img src={teaIcon} alt="Tea" className="w-6 h-6" />;
    case "TV":
      return <img src={tvIcon} alt="TV" className="w-6 h-6" />;
    case "Towels":
      return <img src={towels} alt="Towels" className="w-6 h-6" />; 
    case "Dishwasher":
      return <img src={dishwasher} alt="Dishwasher" className="w-6 h-6" />;
    case "Fridge":
      return <img src={fridge} alt="Fridge" className="w-6 h-6" />;
    case "Freezer":
      return <img src={freezer} alt="Freezer" className="w-6 h-6" />;
    case "Airfryer": 
      return <img src={airfryer} alt="Airfryer" className="w-6 h-6" />;
    case "Steamer":
      return <img src={steamer} alt="Steamer" className="w-6 h-6" />;
    default:
      return <img src={wifiIcon} alt="Default" className="w-6 h-6" />; // Default icon in case the amenity is not recognized
  }
};





 


      return (
        <div
          key={i}
          className="flex flex-col items-center text-sm text-gray-600 w-[84px] rounded-xl bg-white p-4"
        >
          <div className="flex justify-center text-2xl text-[#36C0EF]">
            {getAmenityIcon(a)}
          </div>
          <p className="text-center mt-1 overflow-auto ">{a}</p>
        </div>
      );
    })}
  </div>
</div>


            {/* Description */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800">Description</h3>
              <p className="text-[16px] text-gray-600 mt-1">{room.description}</p>
            </div>

            {/* Rules */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800">Rules to Stay</h3>
              <a
                href={room.rulesDocument}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mt-1 text-sm text-gray-700 bg-white w-[461px] h-[52px] p-4 rounded-lg"
              >
                <BsFilePdf className="text-[#A51600] text-3xl" /> View Rules PDF
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bed Type, Host, Guest, and Cancellation */}
     {/* Bed Type, Host, Guest, and Booking Summary Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
  {/* Left Column */}
  <div className="space-y-6">
    {/* Bed Type and Prices */}
   <div className="bg-white rounded-2xl p-6">
  <h3 className="font-semibold text-gray-800 mb-4">Bed Type And Prices</h3>
  {bed.map((b, i) => (
    <div key={i} className="mb-3">
      {/* Display Bed Type above the blue container */}
      <p className="text-gray-700 font-medium mb-2 capitalize">{b.type}</p>
      
      <div className="flex items-center justify-between bg-[#36C0EF] p-4 rounded-2xl">
        <span className="bg-[#36C0EF] text-white text-sm font-semibold px-4 py-2 rounded-lg">
          Daily
        </span>
        <div className="flex items-center gap-4">
          <span className="text-white font-semibold">${b.price}</span>
        </div>
      </div>
    </div>
  ))}
</div>


    {/* Host and Guest Details */}
    <div className="bg-white rounded-2xl p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Host and Guest Details</h3>

      {/* Host */}
      <div className="flex items-center justify-between bg-[#F9FAFA] p-4 rounded-xl mb-3">
        <div className="flex items-center gap-3">
          <img
            src={room.lister?.profilePicture}
            alt="Host"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">{room.lister?.name}</p>
            <p className="text-sm text-gray-600">Host</p>
          </div>
        </div>
        {/* <button className="bg-[#E5F6FD] text-[#36C0EF] p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button> */}
      </div>

      {/* Guest */}
      <div className="flex items-center justify-between bg-[#F9FAFA] p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <img
            src={user?.profilePicture}
            alt="Guest"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-600">Guest</p>
          </div>
        </div>
        {/* <button className="bg-[#E5F6FD] text-[#36C0EF] p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button> */}
      </div>
    </div>
  </div>

  {/* Right Column - Booking Details */}
  <div className="bg-white rounded-2xl p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Booking Details</h3>

      <div className="border-b border-gray-200 mb-4 flex gap-6">
        <button
          onClick={() => setIsBillingDetailsVisible(false)} // Switch to Summary
          className={`${
            !isBillingDetailsVisible ? 'text-[#36C0EF] border-b-2 border-[#36C0EF]' : 'text-gray-400'
          } pb-2 hover:text-[#36C0EF]`}
        >
          Summary
        </button>
        <button
          onClick={handleToggleBillingDetails} // Switch to Billing Details
          className={`${
            isBillingDetailsVisible ? 'text-[#36C0EF] border-b-2 border-[#36C0EF]' : 'text-gray-400'
          } pb-2 hover:text-[#36C0EF]`}
        >
          Billing Details
        </button>
      </div>

      {/* Booking Summary */}
      {!isBillingDetailsVisible && (
        <div className="space-y-3 text-sm text-gray-700">
          {/* <div className="flex justify-between">
            <p className="text-gray-600">Booking ID:</p>
            <p className="font-semibold text-gray-800">{data._id}</p>
          </div> */}
          <div className="flex justify-between">
            <p className="text-gray-600">Bed Type:</p>
            <p>{bed[0]?.type || "N/A"}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Booking Type:</p>
            <p className="capitalize">{data.bookingType || "N/A"}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Price:</p>
            <p>${totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Stay Duration:</p>
            <p>
              {new Date(startDate).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}{" "}
              -{" "}
              {new Date(endDate).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      )}

      {/* Billing Details */}
     {isBillingDetailsVisible && (
  <div className="bg-white rounded-2xl mt-6">
    <div className="space-y-3 text-sm text-gray-700">
      <div className="flex justify-between">
        <p className="text-gray-600">Platform Fee:</p>
        <p className="font-semibold text-gray-800">${platformFee}</p>
      </div>
      <div className="flex justify-between ">
        <p className="text-gray-600">Admin Commission:</p>
        <p className="font-semibold text-gray-800">${adminCommissionAmount}</p>
      </div>
      <div className="flex justify-between border-b pb-8">
        <p className="text-gray-600">Admin Commission Percentage:</p>
        <p className="font-semibold text-gray-800">
          {totalPrice > 0 ? ((adminCommissionAmount / totalPrice) * 100).toFixed(2) : '0.00'}%
        </p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-600">Total Price:</p>
        <p className="font-semibold text-gray-800">${totalPrice}</p>
      </div>
    </div>
  </div>
)}

    </div>
</div>

    </div>
  );
};

export default BookingDetails;
