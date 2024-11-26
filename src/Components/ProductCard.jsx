import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {selectProducts} from '../Components/productSlice'

const ProductCard = () => {
    const products = useSelector(selectProducts);

    return (
        <div className="flex flex-wrap justify-center p-6 bg-slate-500">
            {products.map((product) => (
                <Link
                    to={`/shopping/${product.id}`}
                    key={product.id}
                    className="group relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-gray-500 m-4 p-2"
                >
                    <div className="overflow-hidden rounded-t-lg h-44">
                        <img
                            src={product.image}
                            alt={product.description}
                            className="w-full h-full object-cover transition-transform transform group-hover:scale-110"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-xl">{product.price}</h3>
                        <p className="text-gray-700">{product.description}</p>
                        {/* <p className="text-gray-500">Available Stock: {product.stock}</p> */}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProductCard;


















