
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});

    // Input Validation
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.subject) newErrors.subject = "Subject is required";
        if (!formData.message) newErrors.message = "Message is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Submit form logic
            window.alert("Form submitted", formData);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-100">
            <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Contact Form */}
                <div className="w-full md:w-1/2 p-6 bg-gray-50">
                    <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-pink-300 hover:text-black transition-all"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Map */}
                <div className="w-full md:w-1/2">
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3555.602693646775!2d84.83644687512336!3d26.979478357218856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39935169078af677%3A0xf6a13bb171476a89!2sAgrawal%20Enterprises!5e0!3m2!1sen!2sin!4v1728538001688!5m2!1sen!2sin"
                        className="w-full h-full"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

            {/* Contact Info */}
            <div className="flex mt-8 space-x-8">
                <div className="flex flex-col items-center text-center p-4 transition transform hover:shadow-lg hover:-translate-y-1 hover:rotate-12">
                    <FaMapMarkerAlt className="text-2xl text-blue-500 mb-2" />
                    <p className="text-sm font-semibold">Address</p>
                    <p className="text-xs">Kaurihar, Raxaul 845305</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 transition transform hover:shadow-lg hover:-translate-y-1 hover:rotate-12">
                    <FaPhoneAlt className="text-2xl text-blue-500 mb-2" />
                    <p className="text-sm font-semibold">Phone</p>
                    <p className="text-xs">8969350533</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 transition transform hover:shadow-lg hover:-translate-y-1 hover:rotate-12">
                    <FaEnvelope className="text-2xl text-blue-500 mb-2" />
                    <p className="text-sm font-semibold">Email</p>
                    <p className="text-xs">Abbishekagrawal@gmail.com</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 transition transform hover:shadow-lg hover:-translate-y-1 hover:rotate-12">
                    <FaGlobe className="text-2xl text-blue-500 mb-2" />
                    <p className="text-sm font-semibold">Website</p>
                    <p className="text-xs">yoursite.com</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
