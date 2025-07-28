import React, { useState } from 'react'
import { motion } from "framer-motion";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { MdOutlineMailOutline } from 'react-icons/md';
import axios from 'axios';

function ForgotPassword() {


    const [email, setemail] = useState("")
    const navigateTo = useNavigate()
    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("https://advanced-auth-6ech.onrender.com/auth/password/forgot", {
                email
            }, {
                withCredentials: true, headers: {
                    "Content-Type": "application/json"
                }
            })
            toast.success(response.message || "Reset Code mail Sent Successfully")
    
            setemail("")

        } catch (error) {
            alert(error.response.data?.message)
            console.log("error in Log in Fetching from Forget Password", error)
        }

    }





    return (
        <div>
            <div className="min-h-screen bg-white flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='max-w-md   bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-3xl shadow-xl 
        overflow-hidden'
                >
                    <div className="w-full md:w-[30vw] h-[65vh] max-w-md bg-white rounded-3xl border border-gray-900 shadow-lg p-8">
                        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Forgot Password</h2>
                        <div className='flex w-70 md:w-90 justify-center items-center align-middle'>
                        <p className='text-center'>Enter your email address and we'll send you a link to reset your password</p>
                        </div>
                        <form onSubmit={handleRegister} className="space-y-1 mt-13 flex justify-center items-center flex-col font-semibold">
                            <div>
                                <Input
                                    icon={MdOutlineMailOutline}
                                    placeholder="Email Address"
                                    type="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    autoComplete="off"
                                    className="shadow-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-6 w-full md:w-[27vw] bg-[#374151] text-white py-3 rounded-lg font-bold hover:bg-[#191e25] duration-600 transition shadow-md"
                            >
                                Send Reset Link
                            </button>
                        </form>
                        <div className='mt-10 ml-2'> 

                    <span className='font-semibold '>Get back to</span> <Link className='font-medium text-gray-800 hover:text-gray-700' to="/login">Login</Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default ForgotPassword