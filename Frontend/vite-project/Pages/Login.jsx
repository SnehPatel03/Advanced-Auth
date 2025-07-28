import React, { useState } from 'react'
import axios from 'axios'
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { FiUser } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import toast from 'react-hot-toast';


function Login() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigateTo = useNavigate()
  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("https://advanced-auth-6ech.onrender.com/auth/login", {
        email, password
      }, {
        withCredentials: true, headers: {
          "Content-Type": "application/json"
        }
      })
      toast.success(response.message || "User Loggedin Successfully.")
      console.log(response)

      localStorage.setItem("jwt", response.data.token)
      localStorage.setItem("email", email)
      

      setemail("")
      setpassword("")
      navigateTo("/profile")

    } catch (error) {
      toast.error(error.response.data.message)
      console.log("error in Log in Fetching from backend", error)
    }

  }
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='max-w-md   bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-3xl shadow-xl 
        overflow-hidden'
      >
        <div className="w-full md:w-[30vw] h-[65vh] max-w-md bg-white rounded-3xl border border-gray-900 shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
          <form onSubmit={handleRegister} className="space-y-1 mt-13 flex justify-center items-center flex-col font-semibold">
            <div>
              <Input
                icon={MdOutlineMailOutline}
                placeholder="Email"
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
                autoComplete="off"
                className="shadow-sm"
              />
            </div>

            <div>
              <Input
                icon={MdOutlinePassword}
                placeholder="Password"
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                autoComplete="off"
              />
            </div>

            <div className='w-full'>
              <Link to="/forgotPassword" className='text-gray-500 hover:text-gray-700 duration-700 text-sm'>Forgot Password?</Link>
            </div>
            <button
              type="submit"
              className="mt-6 w-full md:w-[27vw] bg-[#374151] text-white py-3 rounded-lg font-bold hover:bg-[#191e25] duration-600 transition shadow-md"
            >
              Login
            </button>

            <div className="mt-10 flex gap-2 items-center justify-center">
              <span className="text-sm text-gray-500">Don't have an account?</span>
              <Link to="/register" className="text-sm text-gray-400 duration-700 hover:text-gray-500 capetalize">
                Signin
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Login