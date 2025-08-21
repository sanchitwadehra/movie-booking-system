import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';



function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 isolate flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop with negative z-index relative to modal content */}
      <div 
        className="fixed inset-0 -z-10 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      {/* Modal Content using isolation instead of z-index */}
      <div className="relative isolate bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4 shadow-xl max-h-[90vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:text-red-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        
        {/* Modal children content with overflow handling */}
        <div className="overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('portal-root')
  );
}

export default Modal; 