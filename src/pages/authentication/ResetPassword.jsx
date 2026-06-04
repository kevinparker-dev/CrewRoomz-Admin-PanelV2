import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { login, Logo } from "../../assets/export";
import { SuccessToast, ErrorToast } from "../../components/global/Toaster";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const token = location.state?.token;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

const handleUpdatePassword = async () => {
  if (!password || !confirmPassword) {
    ErrorToast("Please fill all fields.");
    return;
  }

  if (password !== confirmPassword) {
    ErrorToast("Passwords do not match.");
    return;
  }

  const email = localStorage.getItem("resetEmail");

  if (!email) {
    ErrorToast("Email not found. Please restart the reset process.");
    return;
  }

  if (!token) {
    ErrorToast("Please retry.");
    navigate("/auth/forgot-password");
    return;
  }

  try {
    setLoading(true);

   await axios.post(
  "https://dev.crewroomz.com/auth/resetPassword",
  {
    // email,
    password,
    confirmPassword,
    // role: "admin",
  },
  {
    headers: {
    devicemodel: navigator.userAgent,
    deviceuniqueid: navigator.userAgent,
    Authorization: `Bearer ${token}`,
    },
  }
);

    SuccessToast("Password updated successfully.");

    // Optional: clean up
    localStorage.removeItem("resetEmail");

    navigate("/");
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to reset password.";
    ErrorToast(message);
  } finally {
    setLoading(false);
  }
};


  return (
<div
  className="w-full h-auto flex flex-col items-center p-6 backdrop-blur-lg md:w-[630px] md:h-[636px] rounded-[19px] bg-cover bg-center"
  style={{
    backgroundImage: `url(${login})`,
  }}
>      <img src={Logo} alt="orange_logo" className="w-[148.4px]" />

      <div className="mt-4 text-center">
        <h2 className="text-[32px] font-bold text-white">Reset Password</h2>
        <p className="text-[18px] text-white">
          Please enter your new password to continue
        </p>
      </div>

      <form className="w-full md:w-[393px] mt-5 flex flex-col gap-4">
        {/* Password */}
        <div className="relative h-[49px] border rounded-[8px] bg-[#F8F8F899]">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="w-[90%] h-full placeholder:text-gray-200  text-white bg-transparent outline-none px-3"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="w-[10%]  absolute right-0 top-0 h-full flex items-center justify-center text-[#959393]"
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="h-[49px] border rounded-[8px] bg-[#F8F8F899] text-white placeholder:text-white">
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full h-full placeholder:text-gray-200 text-white bg-transparent outline-none px-3"
          />
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleUpdatePassword}
          disabled={loading}
          className="w-full h-[49px] rounded-[8px] bg-[#0893F0] text-white font-medium disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
