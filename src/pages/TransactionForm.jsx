import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import "./TransactionForm.css";

function TransactionForm() {
  const { AddTransaction } = useTransactions();
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    description: "",
    category: "Food",
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.description) return;

    const transaction = {
      id: Date.now(),
      ...form,
      amount: form.type === "income" ? parseFloat(form.amount) : -parseFloat(form.amount),
    };

    AddTransaction(transaction);
    setForm({
      type: "expense",
      amount: "",
      description: "",
      category: "Food",
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="transaction-form-container">
      <div className="transaction-form-content">
        <div className="transaction-form-header">
          <h1>Add Transaction</h1>
        </div>
        <div className="transaction-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group type-selector">
              <label className="form-label">Type</label>
              <select
                className={`transaction-select ${form.type === 'income' ? 'type-income' : 'type-expense'}`}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <div className={`transaction-type-indicator ${form.type}`}>
                {form.type === 'income' ? '💰 Income' : '💸 Expense'}
              </div>
            </div>

            <div className="form-group amount-input">
              <label className="form-label">Amount</label>
              <input
                type="number"
                className="transaction-input"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="Enter amount"
                required
                min="0"
                step="0.01"
              />
              <div className="quick-amounts">
                <button
                  type="button"
                  className="quick-amount-btn"
                  onClick={() => setForm({ ...form, amount: "1000" })}
                >
                  ₦1,000
                </button>
                <button
                  type="button"
                  className="quick-amount-btn"
                  onClick={() => setForm({ ...form, amount: "5000" })}
                >
                  ₦5,000
                </button>
                <button
                  type="button"
                  className="quick-amount-btn"
                  onClick={() => setForm({ ...form, amount: "10000" })}
                >
                  ₦10,000
                </button>
                <button
                  type="button"
                  className="quick-amount-btn"
                  onClick={() => setForm({ ...form, amount: "50000" })}
                >
                  ₦50,000
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="transaction-input"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Enter description"
                required
                maxLength="100"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="transaction-select category-select"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="Food">🍽️ Food</option>
                <option value="Transport">🚗 Transport</option>
                <option value="Entertainment">🎬 Entertainment</option>
                <option value="Utilities">💡 Utilities</option>
                <option value="Books/Study Materials">📚 Books/Study Materials</option>
                <option value="Health/Medical">🏥 Health/Medical</option>
                <option value="Clothing">👕 Clothing</option>
                <option value="Accommodation">🏠 Accommodation</option>
                <option value="Internet/Data">📱 Internet/Data</option>
                <option value="Stationery">✏️ Stationery</option>
                <option value="Groceries">🛒 Groceries</option>
                <option value="Personal Care">💄 Personal Care</option>
                <option value="Education Fees">🎓 Education Fees</option>
                <option value="Income">💼 Income</option>
                <option value="Other">📦 Other</option>
              </select>
            </div>

            <div className="form-group date-input">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="transaction-input"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <button type="submit" className="transaction-submit-btn">
              Add Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TransactionForm;