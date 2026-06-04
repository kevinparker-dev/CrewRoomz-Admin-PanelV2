import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "../../axios";
import { FiLoader } from "react-icons/fi";
import { login, Logo } from "../../assets/export";
import { SuccessToast, ErrorToast } from "../../components/global/Toaster";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      ErrorToast("Email is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/auth/forgot", { email,
    role: "admin", });

      SuccessToast("OTP sent to your email.");
      
      // Optional: Store email in localStorage or context if needed
      localStorage.setItem("resetEmail", email);

      navigate("/auth/verification");
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to send OTP.";
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
      
      <div className="w-auto flex flex-col mt-4 justify-center items-center">
        <h2 className="text-[32px] mt-8  font-bold leading-[48px] text-white">Forgot Password</h2>
        <p className="text-[18px] font-normal text-center leading-[27px] text-white">
          Please enter your email to continue
        </p>
      </div>

      <form className="w-full md:w-[393px] mt-5 flex flex-col justify-start items-start gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="w-full flex flex-col gap-1">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[49px] border-[0.8px] bg-[#F8F8F899] text-white outline-none rounded-[8px] placeholder:text-gray-200 px-3 text-[16px] font-normal leading-[20.4px] border-[#D9D9D9]"
            placeholder="Email Address"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full h-[49px] rounded-[8px] flex gap-2 items-center justify-center text-md font-medium transition duration-300 ${
            loading
              ? "bg-blue-300 text-white cursor-not-allowed"
              : "bg-[#0893F0] hover:bg-[#0078d4] text-white"
          }`}
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin text-lg" />
              <span>Sending...</span>
            </>
          ) : (
            <span>Next</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
