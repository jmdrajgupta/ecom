import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/FirebaseConfig'; // Import your Firebase configuration
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;

        if (!email) {
            toast.error('Email is required');
            isValid = false;
        }

        if (!password) {
            toast.error('Password is required');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true); // Set loading state to true
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigate('/account-settings'); // Redirect to your home route
            } catch (error) {
                if (error.code === 'auth/user-not-found') {
                    toast.error('You are not registered with us.');
                    setTimeout(() => navigate('/register'), 3000);
                } else if (error.code === 'auth/wrong-password') {
                    toast.error('Incorrect password. Please try again.');
                } else {
                    toast.error('Login failed. Please try again.');
                }
            } finally {
                setLoading(false); // Set loading state to false
            }
        }
    };

    const handlePasswordReset = async () => {
        if (!email) {
            toast.error('Please enter your email to reset the password');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Password reset email sent. Please check your inbox.');
        } catch (error) {
            toast.error('Failed to send password reset email. Try again.');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <div className="bg-white rounded-lg shadow-lg p-8 flex">
                <form onSubmit={handleSubmit} className="w-80 space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>

                    <div className="relative">
                        <label className="block text-gray-600">Email</label>
                        <AiOutlineUser className="absolute top-10 left-3 text-gray-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-10 py-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-gray-600">Password</label>
                        <AiOutlineLock className="absolute top-10 left-3 text-gray-400" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-10 py-2 border border-gray-300 rounded"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handlePasswordReset}
                        className="text-blue-500 text-sm"
                    >
                        Forgot My Password
                    </button>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="text-sm text-gray-600">
                        New user?{' '}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Create new account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
