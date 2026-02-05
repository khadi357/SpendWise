import { createContext, useState, useEffect } from "react";

const TransactionsContext = createContext();

export { TransactionsContext };

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [
      { id: 1, date: "2026-01-01", description: "Grocery", amount: -5000, category: "Food" },
      { id: 2, date: "2026-01-02", description: "Salary", amount: 100000, category: "Income" },
      { id: 3, date: "2026-01-03", description: "Coffee", amount: -500, category: "Food" },
      { id: 4, date: "2026-01-04", description: "Transport", amount: -2000, category: "Transport" },
    ];
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("budget");
    return saved ? parseFloat(saved) : 50000;
  });

  const [savingsGoal, setSavingsGoal] = useState(() => {
    const saved = localStorage.getItem("savingsGoal");
    return saved ? parseFloat(saved) : 100000;
  });

  // Auto-save transactions to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Auto-save budget to localStorage
  useEffect(() => {
    localStorage.setItem("budget", budget.toString());
  }, [budget]);

  // Auto-save savings goal to localStorage
  useEffect(() => {
    localStorage.setItem("savingsGoal", savingsGoal.toString());
  }, [savingsGoal]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const spent = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
  const savings = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0) - spent;

  return (
    <TransactionsContext.Provider value={{
      transactions,
      addTransaction,
      budget,
      setBudget,
      savingsGoal,
      setSavingsGoal,
      spent,
      savings
    }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsContext;