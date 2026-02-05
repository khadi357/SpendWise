import { useState } from "react";
import "./Data.css"
function Data() {
  const [form, setForm] = useState({
    phoneNumber: "",
    network: "",
    plan: "",
    pin: "",
  });
  const [message, setMessage] = useState("");

  const networks = ["MTN", "GLO", "9mobile", "Airtel"];

  const dataPlans = {
    MTN: [
      { name: "500MB - ₦200", value: "500MB-200" },
      { name: "1GB - ₦500", value: "1GB-500" },
      { name: "2GB - ₦1000", value: "2GB-1000" },
      { name: "5GB - ₦2000", value: "5GB-2000" },
    ],
    GLO: [
      { name: "500MB - ₦150", value: "500MB-150" },
      { name: "1GB - ₦400", value: "1GB-400" },
      { name: "2GB - ₦800", value: "2GB-800" },
      { name: "5GB - ₦1500", value: "5GB-1500" },
    ],
    "9mobile": [
      { name: "500MB - ₦100", value: "500MB-100" },
      { name: "1GB - ₦300", value: "1GB-300" },
      { name: "2GB - ₦600", value: "2GB-600" },
      { name: "5GB - ₦1200", value: "5GB-1200" },
    ],
    Airtel: [
      { name: "500MB - ₦180", value: "500MB-180" },
      { name: "1GB - ₦450", value: "1GB-450" },
      { name: "2GB - ₦900", value: "2GB-900" },
      { name: "5GB - ₦1800", value: "5GB-1800" },
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedPin = localStorage.getItem("transactionPin");
    if (form.pin !== storedPin) {
      setMessage("Incorrect PIN!");
      return;
    }
    if (!form.phoneNumber || !form.network || !form.plan) {
      setMessage("Please fill all fields!");
      return;
    }
    if (form.phoneNumber.length > 12) {
      setMessage("Phone number too long!");
      return;
    }
    // Simulate data purchase
    setMessage(`Data plan ${form.plan} purchased for ${form.phoneNumber} (${form.network})!`);
    setForm({ phoneNumber: "", network: "", plan: "", pin: "" });
  };

  return (
    <div className="data-container">
      <div className="data-content">
        <div className="data-header">
          <h1>Buy Data</h1>
        </div>

        <div className="data-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                className="data-input"
                placeholder="Enter phone number"
                maxLength="12"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Network</label>
              <select
                value={form.network}
                onChange={(e) => setForm({ ...form, network: e.target.value, plan: "" })}
                className="data-select"
                required
              >
                <option value="">Select Network</option>
                {networks.map(net => <option key={net} value={net}>{net}</option>)}
              </select>
            </div>

            {form.network && (
              <div className="form-group">
                <label className="form-label">Data Plan</label>
                <select
                  value={form.plan}
                  onChange={(e) => setForm({ ...form, plan: e.target.value })}
                  className="data-select"
                  required
                >
                  <option value="">Select Plan</option>
                  {dataPlans[form.network].map(plan => (
                    <option key={plan.value} value={plan.value}>{plan.name}</option>
                  ))}
                </select>

                {form.network && (
                  <div className="data-plans-preview">
                    {dataPlans[form.network].map(plan => (
                      <div key={plan.value} className="plan-card">
                        <div className="plan-name">{plan.name.split(' - ')[0]}</div>
                        <div className="plan-price">{plan.name.split(' - ')[1]}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Transaction PIN</label>
              <input
                type="password"
                value={form.pin}
                onChange={(e) => setForm({ ...form, pin: e.target.value })}
                className="data-input"
                placeholder="Enter 4-digit PIN"
                maxLength="4"
                required
              />
            </div>

            <button type="submit" className="data-submit-btn">
              Buy Data
            </button>
          </form>

          {message && (
            <div className={`message-container ${
              message.includes('Incorrect') || message.includes('Please') || message.includes('too long')
                ? 'message-error'
                : message.includes('purchased')
                ? 'message-success'
                : 'message-info'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Data;