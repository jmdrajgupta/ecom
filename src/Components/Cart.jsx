import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
// import { RiIndianRupeeLine } from 'react-icons/ri'; // Import UPI icon from react-icons
import { removeFromCart, selectCart } from './productSlice'; // Import selectCart and removeFromCart
import { motion } from 'framer-motion';
import Modal from './Modal'; // Import the modal component

const Cart = () => {
    const { items: cartItems, totalAmount } = useSelector(selectCart); // Use selectCart selector to get cart items and totalAmount
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false); // State to control the modal visibility

    const handleUPIClick = () => {
        setShowModal(true); // Show the modal
        setTimeout(() => setShowModal(false), 2000); // Hide the modal after 1 second
    };

    return (
        <div className="flex flex-col items-center  bg-gray-200    p-5">
            {/* Cart header */}
            <div className="w-full flex justify-between items-center mb-5">
                <h2 className="text-3xl font-bold">Your cart</h2>
                <a href="/" className="text-black hover:underline">
                    Continue shopping
                </a>
            </div>

            {/* Cart Table */}
            <div className="w-full max-w-3xl border-b">
                <div className="grid grid-cols-5 text-center p-4 bg-gray-100">
                    <p>Product</p>
                    <p>Description</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total Price</p>
                </div>

                {/* Cart Items */}
                {cartItems.map((item) => (
                    <motion.div
                        key={item.id}
                        className="grid grid-cols-5 items-center text-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src={item.image} alt={item.description} className="w-20" />
                        <div>
                            <p className="font-semibold">{item.description}</p>
                        </div>
                        <p>${item.price.toFixed(2)}</p>
                        <p>{item.quantity}</p>
                        {/* Calculate total price dynamically */}
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                        <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => dispatch(removeFromCart(item.id))} // Ensure item.id is passed directly
                        >
                            <FaTrashAlt />
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Checkout Section */}
            <div className="w-full max-w-3xl flex flex-col items-end mt-5">
                <p className="text-lg">
                    Subtotal <span className="font-bold">${totalAmount.toFixed(2)}</span>
                </p>
                <p className="text-sm text-gray-500">Taxes and shipping calculated at checkout</p>
                <div className="flex flex-col gap-3 w-full max-w-sm mt-3">
                  
                    <button className="p-3 bg-black text-white rounded-lg hover:bg-gray-600 hover:text-black">
                        Shop Now
                    </button>
                    {/* BHIM UPI button with icon */}
                    <button
                        onClick={handleUPIClick}
                        className="p-3 bg-black text-white rounded-lg hover:bg-gray-600  gap-2"
                    >
                        
                        BHIM UPI
                    </button>
                </div>
            </div>

            {/* Email Subscription */}
            <div className="w-full max-w-xl mt-10">
                <h3 className="text-xl font-semibold mb-3">Sign up to our emails</h3>
                <div className="flex">
                    <input
                        type="email"
                        placeholder="Your email"
                        className="p-2 border border-gray-300 rounded-l-lg w-full"
                    />
                    <button className="p-2 bg-gray-700 text-white rounded-r-lg hover:bg-gray-800">
                        Subscribe
                    </button>
                </div>
            </div>

            {/* Modal */}
            <Modal showModal={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
};

export default Cart;
