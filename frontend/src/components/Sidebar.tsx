import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Sidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // check login status

  const menuItem = "block py-2 px-3 rounded-lg transition-colors hover:bg-blue-700";
  const activeItem = "bg-blue-700";

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove auth token
    navigate("/login"); // redirect to login page
  };

  // If no token, don't render sidebar
  if (!token) return null;

  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-6 flex flex-col justify-between">
      {/* Logo */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold mb-10"
      >
        FinanceApp
      </motion.h2>

      {/* Navigation */}
      <ul className="space-y-3">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => `${menuItem} ${isActive ? activeItem : ""}`}
          >
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/transactions"
            className={({ isActive }) => `${menuItem} ${isActive ? activeItem : ""}`}
          >
            Transactions
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/budgets"
            className={({ isActive }) => `${menuItem} ${isActive ? activeItem : ""}`}
          >
            Budgets
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/reports"
            className={({ isActive }) => `${menuItem} ${isActive ? activeItem : ""}`}
          >
            Reports
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) => `${menuItem} ${isActive ? activeItem : ""}`}
          >
            Settings
          </NavLink>
        </li>
      </ul>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;