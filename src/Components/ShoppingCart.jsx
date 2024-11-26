import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { selectProducts, addToCart } from './productSlice'; // Import addToCart action
import { FaShoppingCart, FaBolt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const ShoppingCart = () => {
    const { productId } = useParams();
    const products = useSelector(selectProducts);
    const dispatch = useDispatch(); // Initialize dispatch
    const navigate = useNavigate(); // Initialize useNavigate

    // Convert productId to number for comparison
    const productIdNum = Number(productId);
    console.log("Product ID from URL:", productIdNum);
    console.log("Products Array:", products); // Log the products array

    const product = products.find((item) => item.id === productIdNum);
    console.log("Found Product:", product); // Log the found product

    // Check if the product is found
    if (!product) {
        console.error("Product not found for ID:", productIdNum); // Log if product is not found
        return <p className="text-center mt-10">Product not found.</p>;
    }

    // Handler to add product to the cart
    const handleAddToCart = () => {
        dispatch(addToCart({ productId: product.id }));
        toast.success(`${product.description} has been added to your cart!`); // Show success notification
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-100 min-h-screen">
            <ToastContainer /> {/* Add ToastContainer for notifications */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end p-4">
                <img
                    src={product.image}
                    alt={product.description}
                    className="w-full h-96 object-cover rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col p-4 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">{product.description}</h2>
                <p className="text-gray-600">Price: <span className="text-lg font-semibold">${product.price}</span></p>
                {/* <p className="text-gray-500">Available Stock: {product.stock}</p> */}
                <div className="flex space-x-4 mt-6">
                    <button
                        className="flex items-center justify-center w-full p-3 bg-blue-600 text-white rounded-lg transition-transform transform duration-300 hover:bg-blue-700 hover:scale-105 shadow-lg"
                        onClick={handleAddToCart} // Call handleAddToCart on click
                    >
                        <FaShoppingCart className="mr-2" />
                        Add to Cart
                    </button>
                    <button
                        className="flex items-center justify-center w-full p-3 bg-green-600 text-white rounded-lg transition-transform transform duration-300 hover:bg-green-700 hover:scale-105 shadow-lg"
                        onClick={() => navigate('/login')} // Redirect to login form
                    >
                        <FaBolt className="mr-2" />
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;












// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { selectProducts } from './productSlice';
// import { FaShoppingCart, FaBolt } from 'react-icons/fa';

// const ShoppingCart = () => {
//     const { productId } = useParams();
//     const products = useSelector(selectProducts);
//     const navigate = useNavigate(); // Initialize useNavigate

//     // Convert productId to number for comparison
//     const productIdNum = Number(productId);
//     console.log("Product ID from URL:", productIdNum);
//     console.log("Products Array:", products); // Log the products array

//     const product = products.find((item) => item.id === productIdNum);
//     console.log("Found Product:", product); // Log the found product

//     // Check if the product is found
//     if (!product) {
//         console.error("Product not found for ID:", productIdNum); // Log if product is not found
//         return <p className="text-center mt-10">Product not found.</p>;
//     }

//     return (
//         <div className="flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-100 min-h-screen">
//             <div className="w-full lg:w-1/2 flex justify-center lg:justify-end p-4">
//                 <img
//                     src={product.image}
//                     alt={product.description}
//                     className="w-full h-96 object-cover rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
//                 />
//             </div>
//             <div className="w-full lg:w-1/2 flex flex-col p-4 space-y-4">
//                 <h2 className="text-2xl font-bold text-gray-800">{product.description}</h2>
//                 <p className="text-gray-600">Price: <span className="text-lg font-semibold">{product.price}</span></p>
//                 <p className="text-gray-500">Available Stock: {product.stock}</p>
//                 <div className="flex space-x-4 mt-6">
//                     <button
//                         className="flex items-center justify-center w-full p-3 bg-blue-600 text-white rounded-lg transition-transform transform duration-300 hover:bg-blue-700 hover:scale-105 shadow-lg"
//                     >
//                         <FaShoppingCart className="mr-2" />
//                         Add to Cart
//                     </button>
//                     <button
//                         className="flex items-center justify-center w-full p-3 bg-green-600 text-white rounded-lg transition-transform transform duration-300 hover:bg-green-700 hover:scale-105 shadow-lg"
//                         onClick={() => navigate('/login')} // Redirect to login form
//                     >
//                         <FaBolt className="mr-2" />
//                         Buy Now
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ShoppingCart;
