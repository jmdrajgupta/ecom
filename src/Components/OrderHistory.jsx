import React, { useState } from 'react';
import { FaSearch, FaStar } from 'react-icons/fa';

const OrderHistory = () => {
    const initialOrders = [
        {
            id: 1,
            name: "SKYBAGS SPOTLIGHT 4W EXP STR 58 (E) BLUE",
            color: "Blue",
            price: "₹2,162",
            status: "Cancelled",
            date: "2022-10-14",
        },
        {
            id: 2,
            name: "ZEBRONICS PSPK9 (County) Built-in FM Radio",
            color: "Blue",
            price: "₹552",
            status: "Delivered",
            date: "2023-08-21",
        },
        {
            id: 3,
            name: "Build, Don't Talk",
            author: "Shamani Raj",
            price: "₹228",
            status: "Delivered",
            date: "2023-08-12",
        },
        {
            id: 4,
            name: "Roadster Solid Men Round Neck T-Shirt",
            color: "Pink",
            size: "M",
            price: "₹236",
            status: "Refund Completed",
            date: "2023-08-10",
            reason: "You returned this order because the item was stained/torn.",
        },
    ];

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState([]);
    const [timeFilter, setTimeFilter] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState(initialOrders);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        filterOrders(e.target.value, statusFilter, timeFilter);
    };

    const handleStatusFilter = (status) => {
        const newStatusFilter = statusFilter.includes(status)
            ? statusFilter.filter(s => s !== status)
            : [...statusFilter, status];
        setStatusFilter(newStatusFilter);
        filterOrders(search, newStatusFilter, timeFilter);
    };

    const handleTimeFilter = (time) => {
        const newTimeFilter = timeFilter.includes(time)
            ? timeFilter.filter(t => t !== time)
            : [...timeFilter, time];
        setTimeFilter(newTimeFilter);
        filterOrders(search, statusFilter, newTimeFilter);
    };

    const filterOrders = (searchText, statuses, times) => {
        const currentYear = new Date().getFullYear();
        const filtered = initialOrders.filter(order => {
            const matchSearch = order.name.toLowerCase().includes(searchText.toLowerCase());
            const matchStatus = statuses.length ? statuses.includes(order.status) : true;
            const matchTime = times.length
                ? times.some(time => {
                    if (time === "Last 30 days") {
                        const thirtyDaysAgo = new Date();
                        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                        return new Date(order.date) >= thirtyDaysAgo;
                    } else if (time === String(currentYear)) {
                        return new Date(order.date).getFullYear() === currentYear;
                    }
                    return new Date(order.date).getFullYear() === parseInt(time);
                })
                : true;

            return matchSearch && matchStatus && matchTime;
        });

        setFilteredOrders(filtered);
    };

    return (
        <div className="flex flex-col lg:flex-row p-6 bg-gray-100 min-h-screen space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Filters Sidebar */}
            <aside className="w-full lg:w-1/4 p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-2">ORDER STATUS</h3>
                    {["On the way", "Delivered", "Cancelled", "Refund Completed"].map((status) => (
                        <div key={status} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                className="mr-2"
                                onChange={() => handleStatusFilter(status)}
                                checked={statusFilter.includes(status)}
                            />
                            <label>{status}</label>
                        </div>
                    ))}
                </div>
                <div>
                    <h3 className="text-sm font-semibold mb-2">ORDER TIME</h3>
                    {["Last 30 days", "2023", "2022", "2021", "2020"].map((time) => (
                        <div key={time} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                className="mr-2"
                                onChange={() => handleTimeFilter(time)}
                                checked={timeFilter.includes(time)}
                            />
                            <label>{time}</label>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Order List */}
            <div className="flex-1">
                {/* Search Bar */}
                <div className="flex items-center mb-6">
                    <input
                        type="text"
                        placeholder="Search your orders here"
                        value={search}
                        onChange={handleSearch}
                        className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
                    />
                    <button className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition">
                        <FaSearch />
                    </button>
                </div>

                {/* Order Cards */}
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            className="p-4 bg-white shadow-sm rounded-lg mb-4 hover:shadow-md transition"
                        >
                            <div className="flex items-center">
                                <img
                                    src={`https://via.placeholder.com/80?text=${order.name.charAt(0)}`}
                                    alt={order.name}
                                    className="w-20 h-20 rounded-lg mr-4"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{order.name}</h3>
                                    <p className="text-gray-600">
                                        {order.color && <span>Color: {order.color}</span>}
                                        {order.size && <span> | Size: {order.size}</span>}
                                        {order.author && <span>Author: {order.author}</span>}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">{order.price}</p>
                                    <p
                                        className={`${
                                            order.status === "Delivered"
                                                ? "text-green-500"
                                                : order.status === "Cancelled"
                                                ? "text-red-500"
                                                : "text-yellow-500"
                                        } font-semibold`}
                                    >
                                        {order.status} on {new Date(order.date).toLocaleDateString()}
                                    </p>
                                    {order.reason && <p className="text-sm text-gray-600">{order.reason}</p>}
                                    {order.status === "Delivered" && (
                                        <button className="flex items-center mt-2 text-blue-500 hover:underline">
                                            <FaStar className="mr-1" />
                                            Rate & Review Product
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
