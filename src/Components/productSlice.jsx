import { createSlice } from '@reduxjs/toolkit';
import productImage1 from '../assets/bed.jpg';
import productImage2 from '../assets/GlassChair.jpg';
import productImage3 from '../assets/Table.jpg';
import productImage4 from '../assets/FB_IMG_1724496890962.jpg'
import productImage5 from '../assets/FB_IMG_1724496903455.jpg'
import productImage6 from '../assets/FB_IMG_1724496936939.jpg'
import productImage7 from '../assets/FB_IMG_1724496938853.jpg'
import productImage8 from '../assets/FB_IMG_1724496945435.jpg'
import productImage10 from '../assets/table1.jpg'
import productImage11 from '../assets/table2.jpg'
import productImage12 from '../assets/table3.jpg'
import productImage13 from '../assets/table4.jpg'
import productImage14 from '../assets/table5.jpg'
import productImage15 from '../assets/table6.jpg'




const initialState = {
    products: [
        { id: 1, image: productImage1, price: 29.99, description: 'High-quality product that meets your needs.', stock: 10 },
        { id: 2, image: productImage2, price: 39.99, description: 'Durable and reliable for everyday use.', stock: 5 },
        { id: 3, image: productImage3, price: 19.99, description: 'Affordable and stylish choice.', stock: 16 },
        
        { id: 4, image: productImage4, price: 29.99, description: 'High-quality product that meets your needs.', stock: 10 },
        { id: 5, image: productImage5, price: 39.99, description: 'Durable and reliable for everyday use.', stock: 5 },
        { id: 6, image: productImage6, price: 19.99, description: 'Affordable and stylish choice.', stock: 16 },
        
        { id: 7, image: productImage7, price: 29.99, description: 'High-quality product that meets your needs.', stock: 10 },
        { id: 8, image: productImage8, price: 39.99, description: 'Durable and reliable for everyday use.', stock: 5 },
        { id: 9, image: productImage10, price: 19.99, description: 'Affordable and stylish choice.', stock: 16 },
        
        { id: 10, image: productImage10, price: 29.99, description: 'High-quality product that meets your needs.', stock: 10 },
        { id: 11, image: productImage11, price: 39.99, description: 'Durable and reliable for everyday use.', stock: 5 },
        { id: 12, image: productImage12, price: 19.99, description: 'Affordable and stylish choice.', stock: 16 },
        
        { id: 13, image: productImage13, price: 29.99, description: 'High-quality product that meets your needs.', stock: 10 },
        { id: 14, image: productImage14, price: 39.99, description: 'Durable and reliable for everyday use.', stock: 5 },
        { id: 15, image: productImage15, price: 19.99, description: 'Affordable and stylish choice.', stock: 16 },
        { id: 16, image: productImage3, price: 19.99, description: 'Affordable and stylish choice.', stock: 16 },
    ],
    user: {
        isRegistered: false,
        userInfo: null,
    },
    cart: {
        items: [],
        totalAmount: 0,
    },
    error: null, // State to hold error messages
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Action to add product to cart
        addToCart: (state, action) => {
            const { productId } = action.payload;
            const product = state.products.find((item) => item.id === productId);
            
            if (product) {
                const cartItem = state.cart.items.find(item => item.id === productId);

                if (cartItem) {
                    // Check stock before incrementing quantity
                    if (cartItem.quantity < product.stock) {
                        cartItem.quantity += 1;
                        state.cart.totalAmount += product.price;
                        state.error = null; // Clear error if purchase is successful
                    } else {
                        state.error = 'Out of stock';
                    }
                } else {
                    // Check stock before adding new product to cart
                    if (product.stock > 0) {
                        state.cart.items.push({
                            id: product.id,
                            description: product.description,
                            price: product.price,
                            image: product.image,
                            quantity: 1,
                        });
                        state.cart.totalAmount += product.price;
                        state.error = null; // Clear error if purchase is successful
                    } else {
                        state.error = 'Out of stock';
                    }
                }
            }
        },
        // Action to remove product from cart
        removeFromCart: (state, action) => {
            const productId = action.payload; // Directly use action.payload
            const cartItem = state.cart.items.find(item => item.id === productId);

            if (cartItem) {
                // Deduct the total amount
                state.cart.totalAmount -= cartItem.price * cartItem.quantity;
                
                // Remove item from cart
                state.cart.items = state.cart.items.filter(item => item.id !== productId);
            }
        },
        // Action to increment product quantity in the cart
        incrementQuantity: (state, action) => {
            const { productId } = action.payload;
            const cartItem = state.cart.items.find(item => item.id === productId);
            const product = state.products.find(item => item.id === productId);

            if (cartItem && product) {
                if (cartItem.quantity < product.stock) {
                    cartItem.quantity += 1;
                    state.cart.totalAmount += cartItem.price;
                    state.error = null; // Clear error if purchase is successful
                } else {
                    state.error = 'Out of stock';
                }
            }
        },
        // Action to decrement product quantity in the cart
        decrementQuantity: (state, action) => {
            const { productId } = action.payload;
            const cartItem = state.cart.items.find(item => item.id === productId);

            if (cartItem && cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                state.cart.totalAmount -= cartItem.price;
            }
        },
        // Action to handle product purchase and decrement stock
        purchaseProduct: (state, action) => {
            const { productId } = action.payload;
            const product = state.products.find((product) => product.id === productId);
            const cartItem = state.cart.items.find(item => item.id === productId);

            if (product && product.stock > 0 && cartItem && cartItem.quantity <= product.stock) {
                product.stock -= cartItem.quantity; // Decrement stock by the quantity in the cart
                // Clear the cart after purchase if needed
                state.cart.items = [];
                state.cart.totalAmount = 0;
                state.error = null; // Clear error on successful purchase
            } else {
                state.error = 'Cannot purchase more than available stock';
            }
        },
        // Action to register user
        registerUser: (state, action) => {
            state.user.isRegistered = true;
            state.user.userInfo = action.payload;
        },
        // Action to clear the cart
        clearCart: (state) => {
            state.cart.items = [];
            state.cart.totalAmount = 0;
        },
        // Action to reset error message
        resetError: (state) => {
            state.error = null;
        },
    },
});

// Export actions
export const { 
    addToCart, 
    removeFromCart, 
    incrementQuantity, 
    decrementQuantity, 
    purchaseProduct, 
    registerUser, 
    clearCart,
    resetError 
} = productSlice.actions;

// Selectors to access products and user information from the Redux store
export const selectProducts = (state) => state.products.products;
export const selectCart = (state) => state.products.cart;
export const selectUser = (state) => state.products.user;
export const selectError = (state) => state.products.error; // Selector for error messages

// Export reducer  
export default productSlice.reducer;
