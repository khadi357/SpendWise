import { useMemo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import LogoutButton from "../../components/LogoutButton";
import { useTransactions } from "../../hooks/useTransactions";
import { useToasts } from "../../hooks/useToasts";
import "./Dashboard.css";

function Dashboard() {
  const { transactions, budget, spent, savings, savingsGoal } = useTransactions();
  const { addToast } = useToasts();
  const balance = useMemo(() => transactions.reduce((sum, txn) => sum + txn.amount, 0), [transactions]);
  const prevSpent = useRef(spent);
  const prevSavings = useRef(savings);
  const [showBalance, setShowBalance] = useState(true);

  const showBrowserNotification = (message) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("SpendWise Alert", { body: message, icon: "/spendwise-logo.png" });
    }
  };

  useEffect(() => {
    // Overspending alert
    if (spent > budget * 0.9 && prevSpent.current <= budget * 0.9) {
      addToast("Warning: You've exceeded 90% of your monthly budget!", "warning");
      showBrowserNotification("You've exceeded 90% of your monthly budget!");
    }

    // Savings goal alert
    if (savings >= savingsGoal && prevSavings.current < savingsGoal) {
      addToast("Congratulations! You've reached your savings goal!", "success");
      showBrowserNotification("You've reached your savings goal!");
    }

    prevSpent.current = spent;
    prevSavings.current = savings;
  }, [spent, savings, budget, savingsGoal, addToast]);

  // Mock data for chart
  const data = [
    { name: "Oct", spending: 40000, savings: 10000 },
    { name: "Nov", spending: 30000, savings: 20000 },
    { name: "Dec", spending: 50000, savings: 15000 },
    { name: "Jan", spending: 28000, savings: 30000 },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <LogoutButton />
        </div>
        <nav className="dashboard-nav">
          <div className="nav-groups">
            {/* Wallet & Services Group */}
            <div className="nav-group">
              <div className="nav-group-label">Wallet & Services</div>
              <div className="nav-links">
                <Link to="/wallet" className="nav-link nav-link-wallet">Wallet</Link>
                <Link to="/services" className="nav-link nav-link-services">Services</Link>
              </div>
            </div>

            {/* Budget, Add Transaction & Cashflow Group */}
            <div className="nav-group">
              <div className="nav-group-label">Budget & Transactions</div>
              <div className="nav-links">
                <Link to="/budget" className="nav-link nav-link-budget">Budget</Link>
                <Link to="/add-transaction" className="nav-link nav-link-transaction">Add Transaction</Link>
                <Link to="/cashflow" className="nav-link nav-link-cashflow">Cashflow</Link>
              </div>
            </div>

            {/* Recurring Expenses, Spending Chart & Notifications Group */}
            <div className="nav-group">
              <div className="nav-group-label">Analytics & Alerts</div>
              <div className="nav-links">
                <Link to="/recurring" className="nav-link nav-link-recurring">Recurring Expenses</Link>
                <Link to="/spending-chart" className="nav-link nav-link-chart">Spending Chart</Link>
                <Link to="/notifications" className="nav-link nav-link-notifications">Notifications</Link>
              </div>
            </div>

            {/* Account & Settings Group */}
            <div className="nav-group">
              <div className="nav-group-label">Account & Settings</div>
              <div className="nav-links">
                <Link to="/profile" className="nav-link nav-link-profile">Profile</Link>
                <Link to="/settings" className="nav-link nav-link-settings">Settings</Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="dashboard-main">
          <div className="dashboard-card">
            <h2>Wallet Balance</h2>
            <div className="balance-display">
              ₦{showBalance ? balance : "****"}
            </div>
            <button onClick={() => setShowBalance(!showBalance)} className="balance-toggle">
              {showBalance ? "👁️" : "🙈"}
            </button>
            <Link to="/wallet" className="view-details-link">View Details</Link>
          </div>
          <div className="dashboard-card">
            <h2>Spending Overview</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="spending" stroke="#0049b7" strokeWidth={3} />
                  <Line type="monotone" dataKey="savings" stroke="#f75990" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <Link to="/spending-chart" className="view-details-link">View Full Chart</Link>
          </div>
        </div>
        <div className="notifications-section">
          <h2>Notifications</h2>
          <div className="notification-item">
            <p>You've spent 80% of your daily budget.</p>
          </div>
          <Link to="/notifications" className="view-all-link">View All</Link>
        </div>
      </div>
    </div>

    
  );
}

export default Dashboard;
