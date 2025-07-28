import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from "framer-motion";


function Verify() {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("email");

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 5) {
      toast.error("Please enter the 5-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://advanced-auth-6ech.onrender.com/auth/verify", {
        email,
        otp: otpCode
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("Verification response:", response);
      toast.success("Verification successful!");


      setOtp(["", "", "", "", ""]);
      navigateTo("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Verification failed.");
      console.error("Verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">


      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='max-w-md   bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-3xl shadow-xl 
                    overflow-hidden'
      >

        <div className="w-full max-w-md bg-white border border-gray-900 rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Enter Verification Code</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-3 px-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#374151] text-white py-3 rounded-lg font-bold transition duration-300 shadow-md ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#191e25]"
                }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                "Verify"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Verify;
