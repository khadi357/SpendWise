import { useState } from "react";
import "./RecurringExpense.css";

function RecurringExpenses() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Rent", amount: 50000, frequency: "Yearly" },
    { id: 2, name: "Electricity", amount: 15000, frequency: "Monthly" },
    { id: 3, name: "Internet", amount: 10000, frequency: "Weekly" },
    { id: 4, name: "Insurance", amount: 20000, frequency: "Yearly" },
  ]);

  const [newExpense, setNewExpense] = useState({ name: "", amount: "", frequency: "Weekly" });
  const addExpense = () => {
    if (!newExpense.name || !newExpense.amount) return;
    setExpenses([...expenses, { ...newExpense, id: Date.now(), amount: parseFloat(newExpense.amount) }]);
    setNewExpense({ name: "", amount: "", frequency: "Weekly" });
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const totalMonthly = expenses.reduce((sum, exp) => {
    if (exp.frequency === "Monthly") return sum + exp.amount;
    if (exp.frequency === "Yearly") return sum + exp.amount / 12;
    return sum;
  }, 0);

  return (
    <div className="recurring-expenses-container">
      <div className="recurring-expenses-content">
        <div className="recurring-expenses-header">
          <h1>Recurring Expenses</h1>
        </div>

        <div className="add-expense-section">
          <h2>Add New Recurring Expense</h2>
          <div className="add-expense-form">
            <div className="form-group">
              <label className="form-label">Expense Name</label>
              <input
                type="text"
                placeholder="Expense Name"
                value={newExpense.name}
                onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                className="expense-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Amount (₦)</label>
              <input
                type="number"
                placeholder="Amount (₦)"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="expense-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Frequency</label>
              <select
                value={newExpense.frequency}
                onChange={(e) => setNewExpense({ ...newExpense, frequency: e.target.value })}
                className="expense-select"
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <button onClick={addExpense} className="add-expense-btn">
              Add Expense
            </button>
          </div>
        </div>

        <div className="expenses-list-section">
          <h2>Your Recurring Expenses</h2>
          <ul className="expenses-list">
            {expenses.map((exp) => (
              <li key={exp.id} className="expense-item">
                <div className="expense-info">
                  <h3 className="expense-name">{exp.name}</h3>
                  <div className="expense-details">
                    <span className={`expense-frequency ${exp.frequency.toLowerCase()}`}>
                      {exp.frequency}
                    </span>
                  </div>
                </div>
                <div className="expense-amount">
                  ₦{exp.amount.toLocaleString()}
                </div>
                <button
                  onClick={() => removeExpense(exp.id)}
                  className="remove-expense-btn"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="total-expenses-summary">
            <h3>Total Monthly Recurring Expenses</h3>
            <p className="total-amount">₦{totalMonthly.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecurringExpenses;