import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useTransactions } from "../hooks/useTransactions";
import "./SpendingChart.css";

function SpendingChart() {
  const { transactions } = useTransactions();

  const chartData = useMemo(() => {
    const categoryTotals = {};
    transactions.forEach(txn => {
      if (txn.amount < 0) { // Expenses
        const cat = txn.category;
        categoryTotals[cat] = (categoryTotals[cat] || 0) + Math.abs(txn.amount);
      }
    });
    return Object.entries(categoryTotals).map(([category, amount]) => ({ category, amount }));
  }, [transactions]);

  const pieData = chartData.map((item, index) => ({
    ...item,
    fill: ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00"][index % 5]
  }));

  return (
    <div className="spending-chart-container">
      <div className="spending-chart-content">
        <div className="spending-chart-header">
          <h1>Spending Overview</h1>
        </div>

        <div className="charts-container">
          <div className="chart-section bar-chart">
            <h2 className="chart-header">Spending by Category (Bar Chart)</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-section pie-chart">
            <h2 className="chart-header">Expense Breakdown (Pie Chart)</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} className={`pie-segment-${index % 5}`} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="chart-stats">
          <div className="stat-item">
            <div className="stat-label">Total Categories</div>
            <div className="stat-value">{chartData.length}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Total Spent</div>
            <div className="stat-value">
              ₦{chartData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Avg per Category</div>
            <div className="stat-value">
              ₦{chartData.length > 0
                ? (chartData.reduce((sum, item) => sum + item.amount, 0) / chartData.length).toLocaleString(undefined, {maximumFractionDigits: 0})
                : '0'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpendingChart;