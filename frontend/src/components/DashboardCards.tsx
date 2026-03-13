// DashboardCards.tsx
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

interface Transaction {
  id: number;
  amount: number | string;
  type: "Income" | "Expense";
}

export default function DashboardCards() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const [showIncome, setShowIncome] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:5000/transactions/1");
        const data: Transaction[] = await response.json();
        const cleanData = data.map(tx => ({
          ...tx,
          amount: typeof tx.amount === "string" ? parseFloat(tx.amount) : tx.amount,
        }));
        setTransactions(cleanData);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };
    fetchTransactions();
  }, []);

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expenses;

  const formatNumber = (num: number) =>
    num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Dynamic font size based on length
  const getFontSize = (num: number) => {
    const length = formatNumber(num).length;
    if (length <= 6) return "text-2xl";
    if (length <= 9) return "text-xl";
    if (length <= 12) return "text-lg";
    return "text-base";
  };

  const cards = [
    { title: "Income", value: income, color: "text-green-500", show: showIncome, toggle: () => setShowIncome(prev => !prev) },
    { title: "Expenses", value: expenses, color: "text-red-500", show: showExpenses, toggle: () => setShowExpenses(prev => !prev) },
    { title: "Balance", value: balance, color: "text-blue-900", show: showBalance, toggle: () => setShowBalance(prev => !prev) },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {cards.map(card => (
        <div
          key={card.title}
          className="bg-white p-6 rounded-lg shadow flex flex-col justify-center items-center"
        >
          <h3 className="font-bold text-gray-600 mb-2">{card.title}</h3>

          <div className="flex items-center space-x-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={card.title + (card.show ? "-shown" : "-hidden")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`${card.color} font-bold ${getFontSize(card.value)}`}
              >
                {card.show ? `$${formatNumber(card.value)}` : "••••"}
              </motion.p>
            </AnimatePresence>

            <button
              onClick={card.toggle}
              className="p-1 hover:bg-gray-200 rounded"
            >
              {card.show ? (
                <EyeSlashIcon className="w-6 h-6 text-gray-500" />
              ) : (
                <EyeIcon className="w-6 h-6 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}