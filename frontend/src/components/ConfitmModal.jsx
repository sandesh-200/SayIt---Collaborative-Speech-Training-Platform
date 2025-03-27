import React from 'react';
import { X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    // Modal backdrop with blur
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal container */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden animate-in fade-in duration-300">
        {/* Modal header */}
        <div className="bg-teal-600 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="font-medium text-lg">Confirm Logout</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-teal-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6">
          <p className="text-gray-700">
            Are you sure you want to logout? Any unsaved changes will be lost.
          </p>
        </div>

        {/* Modal footer */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// Example usage
const App = () => {
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const handleLogout = () => {
    console.log('User logged out');
    setShowLogoutModal(false);
    // Add your logout logic here
  };

  return (
    <div>
      {/* Your other components */}
      
      {/* Button to trigger the modal */}
      <button 
        onClick={() => setShowLogoutModal(true)}
        className="flex items-center p-3 rounded-lg hover:bg-teal-500 transition-colors text-white"
      >
        <span>Logout</span>
      </button>
      
      {/* Logout confirmation modal */}
      <LogoutConfirmModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default ConfirmModal;