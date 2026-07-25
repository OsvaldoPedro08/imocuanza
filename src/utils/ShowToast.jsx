import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const ShowToast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastConfig = () => {
    switch (type) {
      case 'error':
        return {
          bg: 'bg-red-50 border-red-200 text-red-900',
          icon: <XCircle className="text-red-600 flex-shrink-0" size={20} />,
          bar: 'bg-red-500'
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-900',
          icon: <AlertTriangle className="text-amber-600 flex-shrink-0" size={20} />,
          bar: 'bg-amber-500'
        };
      case 'info':
        return {
          bg: 'bg-blue-50 border-blue-200 text-blue-900',
          icon: <Info className="text-blue-600 flex-shrink-0" size={20} />,
          bar: 'bg-blue-500'
        };
      case 'success':
      default:
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
          icon: <CheckCircle className="text-emerald-600 flex-shrink-0" size={20} />,
          bar: 'bg-emerald-500'
        };
    }
  };

  const config = getToastConfig();

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border shadow-xl backdrop-blur-md max-w-sm ${config.bg}`}>
        {config.icon}
        <p className="text-sm font-semibold flex-1 pr-2">{message}</p>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-black/5 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ShowToast;