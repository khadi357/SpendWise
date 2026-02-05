import { createContext, useState, useRef } from "react";

const ToastsContext = createContext();

export { ToastsContext };

export const ToastsProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const addToast = (message, type = "info") => {
    const id = ++idRef.current;
    setToasts([...toasts, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000); // Auto remove after 5s
  };

  const removeToast = (id) => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastsContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastsContext.Provider>
  );
};
export default ToastsContext;