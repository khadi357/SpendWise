import { useTransactions } from "../hooks/useTransactions";
import { useState } from "react";
import "./Budget.css";

function Budget() {
  const { budget, setBudget, spent, savingsGoal, setSavingsGoal, savings } = useTransactions();
  const [autoSaveStatus, setAutoSaveStatus] = useState("");

  const progress = (spent / budget) * 100;
  const remaining = budget - spent;

  const handleBudgetChange = (value) => {
    setBudget(parseFloat(value) || 0);
    setAutoSaveStatus("Saving...");
    setTimeout(() => setAutoSaveStatus("Auto-saved ✓"), 500);
    setTimeout(() => setAutoSaveStatus(""), 2000);
  };

  const handleSavingsGoalChange = (value) => {
    setSavingsGoal(parseFloat(value) || 0);
    setAutoSaveStatus("Saving...");
    setTimeout(() => setAutoSaveStatus("Auto-saved ✓"), 500);
    setTimeout(() => setAutoSaveStatus(""), 2000);
  };

  return (
    <div className="budget-container">
      <div className="budget-content">
        <div className="budget-header">
          <h1>Monthly Budget & Savings</h1>
        </div>
        {autoSaveStatus && (
          <div className="auto-save-notification">
            {autoSaveStatus}
          </div>
        )}
        <div className="budget-inputs-grid">
          <div className="budget-input-card">
            <h3>Budget Settings</h3>
            <div className="input-group">
              <label className="input-label">Set Monthly Budget (₦)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => handleBudgetChange(e.target.value)}
                className="budget-input"
                placeholder="Enter your monthly budget"
              />
            </div>
          </div>
          <div className="budget-input-card">
            <h3>Savings Goal</h3>
            <div className="input-group">
              <label className="input-label">Set Savings Goal (₦)</label>
              <input
                type="number"
                value={savingsGoal}
                onChange={(e) => handleSavingsGoalChange(e.target.value)}
                className="budget-input"
                placeholder="Enter your savings goal"
              />
            </div>
          </div>
        </div>
        <div className="budget-overview-grid">
          <div className="budget-overview-card">
            <h2>Budget Overview</h2>
            <div className="budget-stats">
              <div className="stat-item">
                <div className="stat-label">Total Budget</div>
                <div className="stat-value">₦{budget.toLocaleString()}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Spent</div>
                <div className={`stat-value ${progress > 90 ? 'danger' : progress > 70 ? 'warning' : 'positive'}`}>
                  ₦{spent.toLocaleString()}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Remaining</div>
                <div className={`stat-value ${remaining < 0 ? 'danger' : 'positive'}`}>
                  ₦{remaining.toLocaleString()}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Usage</div>
                <div className={`stat-value ${progress > 90 ? 'danger' : progress > 70 ? 'warning' : 'positive'}`}>
                  {progress.toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="progress-container">
              <div className="progress-bar-bg">
                <div
                  className={`progress-bar-fill ${progress > 90 ? 'danger' : progress > 70 ? 'warning' : 'safe'}`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              <div className="progress-percentage">
                {progress.toFixed(1)}% of budget used
              </div>
            </div>
          </div>
          <div className="budget-overview-card">
            <h2>Savings Progress</h2>
            <div className="savings-stats">
              <div className="savings-stat">
                <div className="savings-stat-label">Current Savings</div>
                <div className="savings-stat-value">₦{savings.toLocaleString()}</div>
              </div>
              <div className="savings-stat">
                <div className="savings-stat-label">Savings Goal</div>
                <div className="savings-stat-value">₦{savingsGoal.toLocaleString()}</div>
              </div>
              <div className="savings-stat">
                <div className="savings-stat-label">Progress</div>
                <div className="savings-stat-value">{((savings / savingsGoal) * 100).toFixed(1)}%</div>
              </div>
            </div>
            <div className="savings-progress">
              <div className="progress-container">
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill safe"
                    style={{ width: `${Math.min((savings / savingsGoal) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="progress-percentage">
                  {((savings / savingsGoal) * 100).toFixed(1)}% of savings goal achieved
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;