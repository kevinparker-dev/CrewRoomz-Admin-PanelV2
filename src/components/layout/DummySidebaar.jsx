import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import axios from "../../axios";
import { ErrorToast } from "../global/Toaster";
import { sidebarData } from "../../static/Sidebar";
import { LogOut } from "lucide-react";
import { Logo, sidebar } from "../../assets/export";

const DummySidebar = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await axios.post("/auth/logout");

      // ✅ Clear all cookies after successful server logout
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // ✅ Clear localStorage and sessionStorage
      localStorage.clear();
      sessionStorage.clear();

      setShowLogoutModal(false);
      navigate("/auth/login");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Network error. Please try again.";
      ErrorToast(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-72 h-full border-r overflow-y-auto pl-4 px-8 py-6 flex flex-col gap-4"
      style={{
        backgroundImage: `url(${sidebar})`, // Apply the background image from assets
        backgroundSize: "cover", // Ensure the image covers the entire sidebar
        backgroundPosition: "center", // Center the background image
      }}
    >
      <img
        src={Logo}
        loading="lazy"
        alt="logo-organization"
        className="h-20 w-20 cursor-pointer mb-6"
      />
      {sidebarData?.map((sidebar) => (
        <NavLink
          key={sidebar?.link}
          className={({ isActive }) =>
            isActive
              ? "text-[14px] font-bold flex items-center gap-4 px-6 py-3 rounded-full bg-white text-[#0893F0] hover:bg-white transition-all duration-200 ease-in-out"
              : "text-[14px]  font-bold flex items-center gap-4 px-6 py-3 rounded-full text-white hover:bg-gray-100 hover:text-[#0893F0] transition-all duration-200 ease-in-out"
          }
          to={sidebar?.link}
        >
          <div
            className={({ isActive }) =>
              isActive ? " text-md text-white" : "w-6 h-6 text-xl text-gray-800"
            }
          >
            {sidebar?.icon}
          </div>
          <span className="font-medium">{sidebar?.title}</span>
        </NavLink>
      ))}

      {/* ✅ Logout Button */}
      <button
        onClick={() => setShowLogoutModal(true)}
        className="text-sm font-bold  flex items-center mt-16 gap-4 font-semibold px-4 py-3 rounded-full text-white hover:bg-gray-100 hover:text-[#0893F0] transition-all duration-200 ease-in-out"
      >
        <LogOut className="inline-block mr-2 ml-3" /> Logout
      </button>

      {/* ✅ Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded"
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DummySidebar;
