import React, { useState } from "react";
import { useNavigate } from "react-router";
import { login, Logo } from "../../assets/export";
import { SuccessToast, ErrorToast } from "../../components/global/Toaster";
import axios from "../../axios";

const Verification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "",""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const email = localStorage.getItem("resetEmail");
    const otpValue = otp.join("");

    if (!email) {
      ErrorToast("Email not found. Please try again.");
      return;
    }

    if (otpValue.length !== 6) {
      ErrorToast("Please enter a valid OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/auth/verifyForgotOTP", {
        email,
        otp: Number(otpValue),
        role: "admin", // change to "admin" if needed
      });

      SuccessToast("OTP verified successfully.");
      navigate("/auth/reset-password", {state: { token:response?.data?.data?.token }});
    } catch (error) {
      const message =
        error?.response?.data?.message || "Invalid or expired OTP.";
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
>       <div className="w-auto flex flex-col mt-4 justify-center items-center">
        <img src={Logo} alt="orange_logo" className="w-[148.4px]" />
        <h2 className="text-[32px] font-bold text-white mt-4">Verification</h2>
        <p className="text-[18px] text-center text-white">
          Enter the OTP code sent to your email
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex gap-3 mt-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-[80px] h-[70px] border border-gray-300 rounded-lg text-center text-[20px] font-semibold text-blue-500 focus:outline-none focus:border-blue-500"
          />
        ))}
      </div>

      {/* Resend */}
      {/* <p className="text-white mt-6 text-[14px]">
        Didn’t receive OTP code?{" "}
        <button className="text-blue-500 font-medium">
          Resend now
        </button>
      </p> */}

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        disabled={loading}
        className="w-full max-w-sm mt-8 h-[52px] bg-[#0893F0] text-white rounded-lg text-[16px] font-medium disabled:opacity-60"
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
};

export default Verification;
