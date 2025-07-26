import React, { useState } from 'react'
import axios from 'axios'
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { FiUser } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import toast from 'react-hot-toast';


function Register() {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [loading, setLoading] = useState(false);
    const navigateTo = useNavigate()
    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:4000/auth/register", {
                name, email, password
            }, {
                withCredentials: true, headers: {
                    "Content-Type": "application/json"
                }
            })
            toast.success(response.message || "User Registration Successfully.")
            localStorage.setItem("jwt", response.data.token)
            localStorage.setItem("email",email)
            setname("")
            setemail("")
            setpassword("")
            navigateTo("/verify")

        } catch (error) {
            toast.error(error.response.data.message)
            console.log("error in sign in Fetching from backend", error)
        } finally {
            setLoading(false); 
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

                <div className="w-full md:w-[30vw] h-[80vh] max-w-md bg-white rounded-3xl border border-gray-900 shadow-lg p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
                    <form onSubmit={handleRegister} className="space-y-2 mt-13 flex justify-center items-center flex-col font-semibold">
                        <div>
                            <Input
                                icon={FiUser}
                                placeholder="Full Name"
                                type="text"
                                name="name"
                                required
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                autoComplete="off"
                                className="shadow-sm"
                            />
                        </div>

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

                        <button
                            disabled={loading}
                            type="submit"
                            className={`mt-6 w-full md:w-[27vw] bg-[#374151] text-white py-3 rounded-lg font-bold transition duration-300 shadow-md ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#191e25]'
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
                                'Sign In'
                            )}
                        </button>

                        <div className="mt-10 flex gap-2 items-center justify-center">
                            <span className="text-sm text-gray-500">Already have an account?</span>
                            <Link to="/login" className="text-sm text-gray-400 hover:text-gray-500 capetalize">
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>

    );
}

export default Register