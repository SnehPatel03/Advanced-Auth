import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigateTo = useNavigate();
  const name = localStorage.getItem("name")
  const email =localStorage.getItem("email")
  // console.log(name)

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:4000/auth/logout', {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      localStorage.removeItem("jwt");
      toast.success(response.data.message || 'Logged out successfully');
      navigateTo('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(
        error?.response?.data?.message || 'Something went wrong during logout'
      );
    }
  };
  return (
    <div className="min-h-screen bg-white flex flex-col">

      <header className="h-20 w-full bg-[#565656] flex items-center justify-between px-6 shadow-md">
        <h1 className="text-white w-[50vw] text-[5vw] md:text-3xl font-bold">
          Auth Handler Dashboard
        </h1>
        <button
          className="px-4 py-2 rounded-lg text-sm md:text-md text-white font-semibold bg-gray-800 hover:bg-gray-700 transition duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>


      <main className="flex-1 px-6 py-8 space-y-6 max-w-xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
          Username: <span className="font-semibold text-gray-600 capitalize">{name}</span>
        </h2>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
          Email: <span className="font-semibold text-gray-600 ">{email}</span>
        </h2>


        <button
          className="px-5 py-2 rounded-lg text-white font-semibold bg-gray-800 hover:bg-gray-700 transition duration-300"
          onClick={() => navigateTo("/updatePassword")}
        >
          Update Password
        </button>
      </main>
    </div>
  );
}

export default Profile;
