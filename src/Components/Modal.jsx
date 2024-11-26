import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaPhone } from 'react-icons/fa'; // Import the phone icon

const Modal = ({ showModal, onClose }) => {
  return (
    <motion.div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: showModal ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center"
        initial={{ scale: 0 }}
        animate={{ scale: showModal ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaExclamationTriangle className="text-yellow-500 text-5xl mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Sorry for your inconvenience</h3>
        <p className="text-lg text-gray-500">We are working on it. Please check back soon!</p>
        <div className="flex items-center justify-center space-x-2 mt-4">
          <p className="text-lg text-gray-500">Kindly! Call Us for your order.</p>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaPhone className="text-black text-2xl" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;




































// // Modal.js
// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaExclamationTriangle } from 'react-icons/fa';

// const Modal = ({ showModal, onClose }) => {
//   return (
//     <motion.div
//       className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: showModal ? 1 : 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <motion.div
//         className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center"
//         initial={{ scale: 0 }}
//         animate={{ scale: showModal ? 1 : 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <FaExclamationTriangle className="text-yellow-500 text-5xl mb-4" />
//         <h3 className="text-2xl font-semibold mb-2">Sorry for your inconvenience</h3>
//         <p className="text-lg text-gray-500">We are working on it. Please check back soon!</p>
//         <p className="text-lg text-gray-500">Kindly! Call Us for your order.   </p>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Modal;
