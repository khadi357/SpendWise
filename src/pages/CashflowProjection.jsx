import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Cashflow.css"

function CashflowProjection() {
  const [projections] = useState([
    { month: "August", income: 100000, expenses: 80000, net: 20000 },
    { month: "September", income: 120000, expenses: 90000, net: 30000 },
    { month: "October", income: 110000, expenses: 95000, net: 15000 },
    { month: "November", income: 130000, expenses: 100000, net: 30000 },
    { month: "December", income: 125000, expenses: 105000, net: 20000 },
    { month: "January", income: 145555, expenses: 115555, net: 34444 },
  ]);

  return (
    <div className="cashflow-container">
      <div className="cashflow-content">
        <div className="cashflow-header">
          <h1>Cashflow Projection</h1>
          <p className="cashflow-description">Projected income, expenses, and net cashflow for the next 6 months.</p>
        </div>

        <div className="chart-section">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projections}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke={getComputedStyle(document.documentElement).getPropertyValue('--cyan-blue').trim() || "#00ddff"}
                  name="Income"
                  strokeWidth={4}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke={getComputedStyle(document.documentElement).getPropertyValue('--bright-red').trim() || "#ff1d58"}
                  name="Expenses"
                  strokeWidth={4}
                />
                <Line
                  type="monotone"
                  dataKey="net"
                  stroke={getComputedStyle(document.documentElement).getPropertyValue('--yellow-gold').trim() || "#fff685"}
                  name="Net Cashflow"
                  strokeWidth={4}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="projection-details">
          <h2>Projection Details</h2>
          <ul className="projection-list">
            {projections.map((proj, index) => (
              <li key={index} className="projection-item">
                <span className="projection-month">{proj.month}</span>
                <div className="projection-stats">
                  <div className="stat-box">
                    <div className="stat-label">Income</div>
                    <div className="stat-value income">₦{proj.income.toLocaleString()}</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-label">Expenses</div>
                    <div className="stat-value expenses">₦{proj.expenses.toLocaleString()}</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-label">Net</div>
                    <div className="stat-value net">₦{proj.net.toLocaleString()}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="projection-summary">
            <div className="summary-card">
              <h3>Average Monthly Income</h3>
              <p className="stat-value income">
                ₦{Math.round(projections.reduce((sum, p) => sum + p.income, 0) / projections.length).toLocaleString()}
              </p>
            </div>
            <div className="summary-card">
              <h3>Average Monthly Expenses</h3>
              <p className="stat-value expenses">
                ₦{Math.round(projections.reduce((sum, p) => sum + p.expenses, 0) / projections.length).toLocaleString()}
              </p>
            </div>
            <div className="summary-card">
              <h3>Average Net Cashflow</h3>
              <p className="stat-value net">
                ₦{Math.round(projections.reduce((sum, p) => sum + p.net, 0) / projections.length).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashflowProjection;