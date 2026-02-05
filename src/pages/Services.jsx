import { useState } from "react";
import { Link } from "react-router-dom";
import "./Service.css";

function Services() {
  const [activeService, setActiveService] = useState("transfer");

  return (
    <div className="services-container">
      <div className="services-content">
        <div className="services-header">
          <h1>Services</h1>
        </div>

        <nav className="services-navigation">
          <button
            onClick={() => setActiveService("transfer")}
            className={`service-nav-btn ${activeService === "transfer" ? "active" : ""}`}
          >
            Transfer
          </button>
          <button
            onClick={() => setActiveService("airtime")}
            className={`service-nav-btn ${activeService === "airtime" ? "active" : ""}`}
          >
            Airtime
          </button>
          <Link to="/data" className="service-nav-btn">
            Buy Data
          </Link>
        </nav>

        <div className="service-form-container">
          {activeService === "transfer" && <TransferForm />}
          {activeService === "airtime" && <AirtimeForm />}
        </div>
      </div>
    </div>
  );
}

function TransferForm() {
  const [form, setForm] = useState({
    accountNumber: "",
    bank: "",
    amount: "",
    pin: "",
  });
  const [message, setMessage] = useState("");

  const banks = [
    "Access Bank", "Citibank Nigeria", "Ecobank Nigeria", "Fidelity Bank", "First Bank of Nigeria",
    "First City Monument Bank (FCMB)", "Globus Bank", "Guaranty Trust Bank (GTBank)", "Heritage Bank",
    "Keystone Bank", "Polaris Bank", "Providus Bank", "Stanbic IBTC Bank", "Standard Chartered Nigeria",
    "Sterling Bank", "SunTrust Bank Nigeria", "Union Bank of Nigeria", "United Bank for Africa (UBA)",
    "Unity Bank", "Wema Bank", "Zenith Bank",
    // Microfinance Banks
    "Jaiz Bank", "NIRSAL Microfinance Bank", "VFD Microfinance Bank", "Moniepoint Microfinance Bank",
    "Rubies Microfinance Bank", "Eyowo Microfinance Bank", "Accion Microfinance Bank", "LAPO Microfinance Bank",
    "FINCA Microfinance Bank",
    // Digital Banks
    "Kuda Bank", "Carbon Bank", "FairMoney Microfinance Bank", "Mint Finex MFB", "New Prudential Bank",
    "Titan Trust Bank"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedPin = localStorage.getItem("transactionPin");
    if (form.pin !== storedPin) {
      setMessage("Incorrect PIN!");
      return;
    }
    if (!form.accountNumber || !form.bank || !form.amount) {
      setMessage("Please fill all fields!");
      return;
    }
    // Simulate transfer
    setMessage(`Transfer of ₦${form.amount} to ${form.accountNumber} (${form.bank}) successful!`);
    setForm({ accountNumber: "", bank: "", amount: "", pin: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="service-form transfer-form">
      <div className="service-form-header">
        <h2>Transfer Money</h2>
      </div>

      <div className="form-group">
        <label className="form-label">Receiver Account Number</label>
        <input
          type="text"
          value={form.accountNumber}
          onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
          className="service-input"
          maxLength="10"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Bank</label>
        <select
          value={form.bank}
          onChange={(e) => setForm({ ...form, bank: e.target.value })}
          className="service-select"
          required
        >
          <option value="">Select Bank</option>
          {banks.map(bank => <option key={bank} value={bank}>{bank}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Amount (₦)</label>
        <input
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="service-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Transaction PIN</label>
        <input
          type="password"
          value={form.pin}
          onChange={(e) => setForm({ ...form, pin: e.target.value })}
          className="service-input"
          maxLength="4"
          required
        />
      </div>

      <button type="submit" className="service-submit-btn">
        Transfer
      </button>

      {message && (
        <div className={`message-container ${
          message.includes('successful') ? 'success' : 'error'
        }`}>
          {message}
        </div>
      )}
    </form>
  );
}

function AirtimeForm() {
  const [form, setForm] = useState({
    phoneNumber: "",
    network: "",
    pin: "",
  });
  const [message, setMessage] = useState("");

  const networks = ["MTN", "GLO", "9mobile", "Airtel"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedPin = localStorage.getItem("transactionPin");
    if (form.pin !== storedPin) {
      setMessage("Incorrect PIN!");
      return;
    }
    if (!form.phoneNumber || !form.network) {
      setMessage("Please fill all fields!");
      return;
    }
    if (form.phoneNumber.length > 12) {
      setMessage("Phone number too long!");
      return;
    }
    // Simulate airtime purchase
    setMessage(`Airtime purchased for ${form.phoneNumber} (${form.network})!`);
    setForm({ phoneNumber: "", network: "", pin: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="service-form airtime-form">
      <div className="service-form-header">
        <h2>Buy Airtime</h2>
      </div>

      <div className="form-group">
        <label className="form-label">Phone Number</label>
        <input
          type="text"
          value={form.phoneNumber}
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          className="service-input"
          maxLength="12"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Network</label>
        <select
          value={form.network}
          onChange={(e) => setForm({ ...form, network: e.target.value })}
          className="service-select"
          required
        >
          <option value="">Select Network</option>
          {networks.map(net => (
            <option key={net} value={net}>
              <span className={`network-icon network-${net.toLowerCase()}`}></span>
              {net}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Amount (₦)</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={form.amount || ""}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="service-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Transaction PIN</label>
        <input
          type="password"
          value={form.pin}
          onChange={(e) => setForm({ ...form, pin: e.target.value })}
          className="service-input"
          maxLength="4"
          required
        />
      </div>

      <button type="submit" className="service-submit-btn">
        Buy Airtime
      </button>

      {message && (
        <div className={`message-container ${
          message.includes('purchased') ? 'success' : 'error'
        }`}>
          {message}
        </div>
      )}
    </form>
  );
}

export default Services;