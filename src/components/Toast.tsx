import React, { ReactNode, useEffect } from 'react';

interface ToastProps {
  title?: ReactNode
  message: ReactNode
  duration?: number
  onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({ title, message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  return (
    <div
      className="w-96 fixed top-6 right-6 bg-white px-6 py-5 rounded transition-opacity duration-300 ease-in-out opacity-100"
      style={{ boxShadow: "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)" }}
    >
      {title &&
        <h4 className='text-xl mb-3'>
          {title}
        </h4>}
      <p>
        {message}
      </p>
    </div>
  );
};
