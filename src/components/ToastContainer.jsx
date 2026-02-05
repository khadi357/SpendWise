import { useToasts } from "../hooks/useToasts";

function ToastContainer() {
  const { toasts, removeToast } = useToasts();

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      zIndex: 1000,
      maxWidth: "400px"
    }}>
      {toasts.map(toast => (
        <div key={toast.id} style={{
          backgroundColor: toast.type === "warning" ? "#fff3cd" : toast.type === "success" ? "#d4edda" : "#d1ecf1",
          border: `1px solid ${toast.type === "warning" ? "#ffeaa7" : toast.type === "success" ? "#c3e6cb" : "#bee5eb"}`,
          color: toast.type === "warning" ? "#856404" : toast.type === "success" ? "#155724" : "#0c5460",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span>{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} style={{
            background: "none",
            border: "none",
            fontSize: "16px",
            cursor: "pointer"
          }}>×</button>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;