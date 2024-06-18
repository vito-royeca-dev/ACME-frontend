import React, { createContext, useContext, useCallback } from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertContextProps {
  showAlert: (message: string, type?: AlertType, title?: string) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const showAlert = useCallback((message: string, type: AlertType = 'info', title?: string) => {
    const options: ToastOptions = {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    const content = (
      <div>
        {title && <strong>{title}</strong>}
        <div>{message}</div>
      </div>
    );

    switch (type) {
      case 'success':
        toast.success(content, options);
        break;
      case 'error':
        toast.error(content, options);
        break;
      case 'info':
        toast.info(content, options);
        break;
      case 'warning':
        toast.warn(content, options);
        break;
      default:
        toast(content, options);
        break;
    }
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <ToastContainer />
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
