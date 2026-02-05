import { useMemo, useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import "./Wallet.css";

function Wallet() {
  const { transactions } = useTransactions();
  const balance = useMemo(() => transactions.reduce((sum, txn) => sum + txn.amount, 0), [transactions]);
  const [pin, setPin] = useState("");
  const [currentPin, setCurrentPin] = useState(localStorage.getItem("transactionPin") || "");

  // Calculate daily safe-to-spend
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysLeft = daysInMonth - now.getDate() + 1;
  const monthlyIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
  const safeDaily = daysLeft > 0 ? (monthlyIncome - monthlyExpenses) / daysLeft : 0;

  const handleSetPin = () => {
    if (pin.length === 4 && /^\d+$/.test(pin)) {
      localStorage.setItem("transactionPin", pin);
      setCurrentPin(pin);
      setPin("");
      alert("Transaction PIN set successfully!");
    } else {
      alert("PIN must be 4 digits.");
    }
  };

  return (
    <div className="wallet-container">
      <div className="wallet-content">
        <div className="wallet-header">
          <h1>Wallet</h1>
        </div>

        <div className="balance-card">
          <h2>Current Balance</h2>
          <div className="balance-amount">
            ₦{balance.toLocaleString()}
          </div>
          <div className="safe-spend-info">
            <p>Daily Safe-to-Spend: ₦{safeDaily.toFixed(2)}</p>
          </div>
        </div>

        <div className="pin-card">
          <h2>Transaction PIN</h2>
          <div className={`pin-status ${currentPin ? '' : 'unset'}`}>
            {currentPin ? 'PIN is set. Current PIN: ****' : 'No PIN set.'}
          </div>
          <div className="pin-input-group">
            <input
              type="password"
              className="pin-input"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter 4-digit PIN"
              maxLength="4"
            />
            <button className="pin-button" onClick={handleSetPin}>
              Set PIN
            </button>
          </div>
        </div>

        <div className="history-card">
          <h2>Transaction History</h2>
          {transactions.length === 0 ? (
            <div className="empty-transactions">
              <p>No transactions yet. Start by adding your first transaction!</p>
            </div>
          ) : (
            <ul className="transaction-list">
              {transactions.map((txn) => (
                <li key={txn.id} className="transaction-item">
                  <div className="transaction-details">
                    <div className="transaction-date">{txn.date}</div>
                    <div className="transaction-description">{txn.description}</div>
                    <span className="transaction-category">{txn.category}</span>
                  </div>
                  <div className={`transaction-amount ${txn.amount > 0 ? 'positive' : 'negative'}`}>
                    ₦{Math.abs(txn.amount).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wallet;