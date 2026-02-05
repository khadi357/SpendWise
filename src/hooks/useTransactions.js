import { useContext } from "react";
import { TransactionsContext } from "../context/TransactionsContext";

export const useTransactions = () => useContext(TransactionsContext);