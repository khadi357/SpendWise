import { HashRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import { TransactionsProvider } from "./context/TransactionsContext";
import { ToastsProvider } from "./context/ToastsContext";
import ToastContainer from "./components/ToastContainer";

function App() {
  return (
    <TransactionsProvider>
      <ToastsProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
        <ToastContainer />
      </ToastsProvider>
    </TransactionsProvider>
  );
}

export default App;


