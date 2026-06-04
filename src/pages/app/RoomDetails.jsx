import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { LocationEdit } from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { FaWifi, FaSnowflake, FaSwimmingPool, FaCoffee, FaArrowLeft } from "react-icons/fa";
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
  dishwasher,
  fridge,
  freezer,
  steamer,
  airfryer, towels,
  
} from '../../assets/export';


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
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="w-[120px] h-[80px] bg-gray-300 rounded-lg" />
                ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4 mt-6 lg:mt-0">
            <div className="h-8 w-2/3 bg-gray-300 rounded-md" />
            <div className="h-4 w-1/2 bg-gray-300 rounded-md" />
            <div className="h-4 w-40 bg-gray-300 rounded-md" />

            <div className="space-y-2 mt-4">
              <div className="h-4 w-24 bg-gray-300 rounded-md" />
              <div className="flex gap-4 flex-wrap">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="w-[84px] h-[72px] bg-gray-200 rounded-xl" />
                  ))}
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="h-4 w-32 bg-gray-300 rounded-md" />
              <div className="h-4 w-full bg-gray-200 rounded-md" />
              <div className="h-4 w-5/6 bg-gray-200 rounded-md" />
            </div>

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
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-xl" />
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

// ✅ Review Section Component
const ReviewSection = ({ reviews }) => {
  // Check if there are reviews
  const totalReviews = reviews?.totalReviews || 0;
  const averageRating = reviews?.averageRating || 0;
  const ratingDistribution = reviews?.ratingDistribution || {};

  return (
    <div className="mt-6">
      <div className="bg-[#F9FAFA] rounded-2xl p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800 text-[16px]">
            Review <span className="text-gray-500 text-sm">({totalReviews})</span>
          </h3>
          {totalReviews > 0 && (
            <button className="text-[#24A3FF] text-sm font-medium hover:underline">
              View all
            </button>
          )}
        </div>

        {/* Star Rating */}
        {totalReviews > 0 ? (
          <div className="flex items-center gap-1 mb-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <span
                  key={i}
                  className={`text-xl ${i < averageRating ? "text-yellow-400" : "text-gray-300"}`}
                >
                  ★
                </span>
              ))}
            <span className="text-gray-600 ml-2 text-sm">{averageRating}</span>
          </div>
        ) : (
          <p className="text-sm text-gray-600">No reviews yet</p>
        )}

        {/* Rating Distribution */}
        {totalReviews > 0 && (
          <div className="space-y-2">
            {Object.entries(ratingDistribution)
              .sort(([a], [b]) => b - a)
              .map(([stars, count]) => (
                <div key={stars} className="flex items-center gap-2 text-sm">
                  <span className="w-[50px] text-gray-600">{stars} stars</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full rounded-full"
                      style={{ width: `${(count / totalReviews) * 100}%` }}
                    />
                  </div>
                  <span className="text-gray-600 w-6 text-right">{count}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};


const RoomDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => navigate(-1);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`/admin/room/${bookingId}`);
        setRoomData(response.data.data.room);
      } catch (error) {
        console.error("Failed to fetch room details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [bookingId]);

  if (loading) {
    return <BookingDetailsSkeleton />;
  }

  if (!roomData) {
    return <div className="p-6 text-center text-red-500">Failed to load room details.</div>;
  }

  const amenitiesIcons = {
    "Wi-fi": <FaWifi />,
    "Air - Conditioning": <FaSnowflake />,
    "Pool": <FaSwimmingPool />,
    "Breakfast": <FaCoffee />,
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button onClick={handleBack} className="pb-1 mr-1 font-bold text-black">
            <FaArrowLeft size={28} />
          </button>
          <h1 className="text-[36px] text-black mb-2 font-bold">Property Details</h1>
        </div>
        <span className="text-sm font-semibold px-6 py-3 rounded-full bg-green-500 text-white capitalize">
          {roomData.roomStatus}
        </span>
      </div>

      {/* Main Room Content */}
      <div className="bg-white rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-6 bg-[#F9FAFA] p-6 rounded-2xl">
          {/* Room Images */}
          <div className="w-full lg:w-[503px]">
            <img
              src={roomData.media?.[0]}
              alt="Room"
              className="rounded-xl w-full h-[362px] object-cover"
            />
            <div className="flex gap-2 mt-3">
              {(roomData.media || []).slice(0, 4).map((src, idx) => (
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
              {roomData.city}, {roomData.state}
            </h2>
            <p className="text-gray-600 text-sm flex items-center mt-1">
              <CiLocationOn className="text-xl" /> <span className="ml-2">{roomData.address}</span>
            </p>
            <a
              href={`https://maps.google.com/?q=${roomData.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm underline flex mt-1"
            >
              <CiLocationOn  className="mr-2 text-xl" />
              Show on Google Maps
            </a>

            <p className="text-sm text-gray-700 mt-2">
              {roomData.bedDetails?.length || 0} Bed
              {roomData.bedDetails?.length > 1 ? "s" : ""},{" "}
              {roomData.privateBath ? "Private Bath" : "Shared Bath"}
            </p>

            {/* Amenities */}
                <h3 className="font-semibold text-gray-800 text-[16px] mt-2">Amenities</h3>

            <div className="flex gap-4 mt-2 flex-wrap">
              
               {roomData.amenities?.slice(0, 6).map((a, i) => {
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

            {/* Description */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800">Description</h3>
              <p className="text-[16px] text-gray-600 mt-1">{roomData.description}</p>
            </div>

            {/* Rules */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800">Rules to Stay</h3>
              <a
                href={roomData.rulesDocument}
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

      {/* Bed Type and Host Info */}
      <div className="bg-white rounded-2xl p-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Bed Types */}
          <div className="bg-[#F9FAFA] rounded-2xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Bed Type and Prices</h3>
            {(roomData.bedDetails || []).map((b, i) => (
              <div key={i} className="flex justify-between bg-white p-4 rounded-xl mb-2">
                <span className="text-sm text-gray-700 capitalize">{b.type}</span>
                <span className="text-[#24A3FF] font-semibold">${b.price} / night</span>
              </div>
            ))}
          </div>

          {/* Host Info */}
          <div className="bg-[#F9FAFA] rounded-2xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Host Details</h3>
            <div className="bg-[#29ABE20A] p-4 rounded-xl">
              <div className="flex items-center gap-4">
                <img
                  src={roomData.lister?.profilePicture}
                  alt="Host"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{roomData.lister?.name}</h4>
                  <p className="text-sm text-gray-600">Host</p>
                </div>
              </div>
            </div>
          </div>
        </div>
              <ReviewSection reviews={roomData.reviews} />

      </div>

      {/* ✅ Review Section */}
    </div>
  );
};

export default RoomDetails;
