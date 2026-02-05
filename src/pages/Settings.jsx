import { useState, useEffect } from "react";
import "./Setting.css";

function Settings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("appSettings");
    return saved ? JSON.parse(saved) : {
      theme: "light",
      notifications: true,
      emailAlerts: true,
      smsAlerts: false,
      autoLock: true,
      currency: "NGN",
      language: "en"
    };
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [pinForm, setPinForm] = useState({
    currentPin: "",
    newPin: "",
    confirmPin: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Apply theme
    document.body.style.backgroundColor = settings.theme === "dark" ? "#121212" : "#ffffff";
    document.body.style.color = settings.theme === "dark" ? "#ffffff" : "#000000";
  }, [settings.theme]);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("appSettings", JSON.stringify(newSettings));
    setMessage("Settings updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage("New passwords don't match!");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setMessage("Password must be at least 6 characters!");
      return;
    }
    // In a real app, this would make an API call
    setMessage("Password changed successfully!");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setMessage(""), 3000);
  };

  const handlePinChange = (e) => {
    e.preventDefault();
    if (pinForm.newPin !== pinForm.confirmPin) {
      setMessage("New PINs don't match!");
      return;
    }
    if (!/^\d{4}$/.test(pinForm.newPin)) {
      setMessage("PIN must be 4 digits!");
      return;
    }
    const storedPin = localStorage.getItem("transactionPin");
    if (pinForm.currentPin !== storedPin) {
      setMessage("Current PIN is incorrect!");
      return;
    }
    localStorage.setItem("transactionPin", pinForm.newPin);
    setMessage("Transaction PIN changed successfully!");
    setPinForm({ currentPin: "", newPin: "", confirmPin: "" });
    setTimeout(() => setMessage(""), 3000);
  };

  const exportData = () => {
    const data = {
      profile: JSON.parse(localStorage.getItem("userProfile") || "{}"),
      transactions: JSON.parse(localStorage.getItem("transactions") || "[]"),
      settings: settings
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "spendwise-data.json";
    a.click();
    URL.revokeObjectURL(url);
    setMessage("Data exported successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const clearData = () => {
    if (window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      localStorage.clear();
      setMessage("All data cleared!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-content">
        <div className="settings-header">
          <h1>Settings</h1>
        </div>
        {message && (
          <div className={`message-container ${
            message.includes("success") ? "success" :
            message.includes("don't match") || message.includes("incorrect") || message.includes("must be") ? "error" :
            "warning"
          }`}>
            {message}
          </div>
        )}

        {/* Theme Settings */}
        <div className="settings-section appearance">
          <h3 className="section-header">
            <span className="setting-icon"></span>
            Appearance
          </h3>
          <div className="form-group">
            <label>Theme:</label>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange("theme", e.target.value)}
              className="settings-select"
            >
              <option value="light">
                Light Mode
                <span className="theme-preview light"></span>
              </option>
              <option value="dark">
                Dark Mode
                <span className="theme-preview dark"></span>
              </option>
            </select>
          </div>
        </div>

        {/* Security Settings */}
        <div className="settings-section security">
          <h3 className="section-header">
            <span className="setting-icon"></span>
            Security
          </h3>

          {/* Change Password */}
          <div className="subsection">
            <h4>Change Password</h4>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                  className="settings-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  className="settings-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  className="settings-input"
                  required
                />
              </div>
              <button type="submit" className="settings-btn primary">
                Change Password
              </button>
            </form>
          </div>

          {/* Change PIN */}
          <div className="subsection">
            <h4>Change Transaction PIN</h4>
            <form onSubmit={handlePinChange}>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Current PIN"
                  value={pinForm.currentPin}
                  onChange={(e) => setPinForm({...pinForm, currentPin: e.target.value})}
                  maxLength="4"
                  className="settings-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="New PIN (4 digits)"
                  value={pinForm.newPin}
                  onChange={(e) => setPinForm({...pinForm, newPin: e.target.value})}
                  maxLength="4"
                  className="settings-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm New PIN"
                  value={pinForm.confirmPin}
                  onChange={(e) => setPinForm({...pinForm, confirmPin: e.target.value})}
                  maxLength="4"
                  className="settings-input"
                  required
                />
              </div>
              <button type="submit" className="settings-btn success">
                Change PIN
              </button>
            </form>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section notifications">
          <h3 className="section-header">
            <span className="setting-icon"></span>
            Notifications
          </h3>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange("notifications", e.target.checked)}
              />
              Push Notifications
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={(e) => handleSettingChange("emailAlerts", e.target.checked)}
              />
              Email Alerts
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={settings.smsAlerts}
                onChange={(e) => handleSettingChange("smsAlerts", e.target.checked)}
              />
              SMS Alerts
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={settings.autoLock}
                onChange={(e) => handleSettingChange("autoLock", e.target.checked)}
              />
              Auto-lock after inactivity
            </label>
          </div>
        </div>

        {/* Preferences */}
        <div className="settings-section preferences">
          <h3 className="section-header">
            <span className="setting-icon"></span>
            Preferences
          </h3>
          <div className="form-group">
            <label>Currency:</label>
            <select
              value={settings.currency}
              onChange={(e) => handleSettingChange("currency", e.target.value)}
              className="settings-select"
            >
              <option value="NGN">NGN (₦)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Language:</label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange("language", e.target.value)}
              className="settings-select"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        {/* Data Management */}
        <div className="settings-section data-management">
          <h3 className="section-header">
            <span className="setting-icon"></span>
            Data Management
          </h3>
          <div style={{ marginBottom: "1rem" }}>
            <button
              onClick={exportData}
              className="settings-btn info"
            >
              Export Data
            </button>
            <button
              onClick={clearData}
              className="settings-btn danger"
            >
              Clear All Data
            </button>
          </div>
          <p className="data-info">
            Export your data as a JSON file or clear all stored data. Clearing data cannot be undone.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;