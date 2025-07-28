import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"
function ResetPassword() {
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  const { token } = useParams();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `https://advanced-auth-6ech.onrender.com/auth/password/reset/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
console.log("responese",response)
      toast.success(response.data.message || "Password Updated Successfully");
      setconfirmPassword("");
      setpassword("");
      navigateTo("/login");
    } catch (error) {
      console.error("Reset password error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleReset} className="space-y-5">
          <div>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#565656] text-white py-2 rounded-lg hover:bg-gray-800 font-semibold transition duration-700"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
