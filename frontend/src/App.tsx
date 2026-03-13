import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

// Pages
import DashboardPage from "./pages/Dashboard";
import TransactionsPage from "./pages/Transactions";
import BudgetsPage from "./pages/Budgets";
import ReportsPage from "./pages/Reports";
import SettingsPage from "./pages/Settings";

function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <Sidebar />

        <div className="flex-1 p-10 overflow-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/budgets" element={<BudgetsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;