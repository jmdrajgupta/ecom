import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaRegEdit, FaLock } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { auth } from '../firebase/FirebaseConfig'; // Firebase configuration import
import { signOut } from 'firebase/auth'; // Import signOut
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Profile = () => {
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch the current user’s email if logged in
        const user = auth.currentUser;
        if (user) {
            setUserEmail(user.email);
        }
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Error logging out: ', error);
            toast.error('Error logging out! Please try again.'); // Error message
        }
    };

    // Function to handle navigation to Cart
    const handleCartNavigation = () => {
        navigate('/cart'); // Redirect to the Cart component
    };

    return (
        <div className="flex flex-col lg:flex-row p-5 lg:p-2 bg-gray-50 min-h-screen">
            {/* ToastContainer for notifications */}
            <ToastContainer />

            {/* Sidebar */}
            <aside className="w-full lg:w-1/4 p-5 bg-white shadow-md rounded-lg mb-5 lg:mb-0 lg:mr-10">
                <div className="flex items-center space-x-3">
                    <img
                        src="https://via.placeholder.com/80"
                        alt="User"
                        className="w-15 h-15 rounded-full"
                    />
                    <div>
                        <h2 className="text-sm font-semibold">Hello,</h2>
                        <p className="text-sm text-gray-700">{`${userEmail}`}</p>
                    </div>
                </div>
                {/* Sidebar menu items */}
                <ul className="mt-10 space-y-3">
                    <li className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition duration-200 cursor-pointer">
                        <FaUserCircle className="text-blue-500" />
                        <span>My Accounts</span>
                    </li>

                    <li
                        className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition duration-200 cursor-pointer"
                        onClick={handleCartNavigation} // Add onClick handler
                    >
                        <FaUserCircle className="text-blue-500" />
                        <span>Cart</span>
                    </li>

                    {/* Logout Button */}
                    <li
                        className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition duration-200 cursor-pointer"
                        onClick={handleLogout}
                    >
                        <FaLock className="text-red-500" />
                        <span>Logout</span>
                    </li>
                </ul>
            </aside>

            {/* Profile Information */}
            <div className="flex-1 p-5 bg-white shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold">Personal Information</h2>
                    <button className="flex items-center space-x-1 text-blue-600">
                        <FaRegEdit />
                        <span>Change Profile Information</span>
                    </button>
                </div>

                <div className="space-y-5">
                    <div className="flex items-center space-x-3">
                        <label className="w-1/3 text-gray-600">Name</label>
                        <input
                            type="text"
                            value={userEmail || 'Guest User'}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="w-1/3 text-gray-600">Email</label>
                        <div className="flex items-center w-full">
                            <AiOutlineMail className="text-gray-500 mr-2" />
                            <input
                                type="email"
                                value={userEmail || 'Not available'}
                                readOnly
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                            />
                        </div>
                    </div>
                    {/* ... Other profile fields */}
                </div>
            </div>
        </div>
    );
};

export default Profile;
