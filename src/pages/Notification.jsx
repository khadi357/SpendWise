import { useState, useEffect } from "react";
import { useToasts } from "../hooks/useToasts";
import "./Notification.css";

function Notification() {
  const { addToast } = useToasts();
  const [notifications] = useState([
    { id: 1, message: "You've spent 80% of your daily budget.", type: "warning" },
    { id: 2, message: "Great job! You saved ₦5,000 this week.", type: "success" },
    { id: 3, message: "Reminder: Pay your utility bill by tomorrow.", type: "info" },
  ]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const showBrowserNotification = (message, title = "SpendWise Alert") => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body: message, icon: "/spendwise-logo.png" });
    }
  };

  const testNotification = (type) => {
    const messages = {
      overspend: "Alert: You've exceeded your daily spending limit!",
      budget: "Warning: You've reached 90% of your monthly budget.",
      savings: "Congratulations! You've reached your savings goal."
    };
    addToast(messages[type], type === "savings" ? "success" : "warning");
    showBrowserNotification(messages[type]);
  };

  return (
    <div className="notification-container">
      <div className="notification-content">
        <div className="notification-header">
          <h1>Notifications</h1>
          <p className="notification-description">Manage your alerts and test notifications.</p>
        </div>

        <div className="test-notifications-section">
          <h2>Test Notifications</h2>
          <div className="test-buttons-container">
            <button
              onClick={() => testNotification("overspend")}
              className="test-notification-btn overspend"
            >
              Test Overspend Alert
            </button>
            <button
              onClick={() => testNotification("budget")}
              className="test-notification-btn budget"
            >
              Test Budget Alert
            </button>
            <button
              onClick={() => testNotification("savings")}
              className="test-notification-btn savings"
            >
              Test Savings Alert
            </button>
          </div>
        </div>

        <div className="recent-notifications-section">
          <h2>Recent Notifications</h2>
          <ul className="notifications-list">
            {notifications.map((notif) => (
              <li key={notif.id} className={`notification-item ${notif.type}`}>
                <p className="notification-message">{notif.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Notification;