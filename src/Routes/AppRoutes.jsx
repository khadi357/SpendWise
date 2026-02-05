import { Routes, Route } from "react-router-dom";

import IntroPage from "../pages/IntroPage/IntroPage.jsx";
import Auth from "../pages/Auth/Auth";
import Dashboard from "../pages/Dashboard/Dashboard";
import Wallet from "../pages/Wallet";
import SpendingChart from "../pages/SpendingChart";
import Notification from "../pages/Notification";
import TransactionForm from "../pages/TransactionForm";
import Budget from "../pages/Budget";
import CashflowProjection from "../pages/CashflowProjection";
import RecurringExpenses from "../pages/RecurringExpenses";
import Services from "../pages/Services";
import Data from "../pages/Data";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Intro */}
      <Route path="/" element={<IntroPage />} />

      {/* Auth */}
      <Route path="/auth" element={<Auth />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
      <Route path="/spending-chart" element={<ProtectedRoute><SpendingChart /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notification /></ProtectedRoute>} />
      <Route path="/add-transaction" element={<ProtectedRoute><TransactionForm /></ProtectedRoute>} />
      <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
      <Route path="/cashflow" element={<ProtectedRoute><CashflowProjection /></ProtectedRoute>} />
      <Route path="/recurring" element={<ProtectedRoute><RecurringExpenses /></ProtectedRoute>} />
      <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
      <Route path="/data" element={<ProtectedRoute><Data /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;


