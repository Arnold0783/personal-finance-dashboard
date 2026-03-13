// TransactionsTable.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "Income" | "Expense";
  date: string;
}

interface TransactionsTableProps {
  onRefresh: () => void;
}

export default function TransactionsTable({ onRefresh }: TransactionsTableProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5000/transactions/1");
      const data: Transaction[] = await response.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Delete transaction
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this transaction?");
    if (!confirmed) return;

    try {
      await fetch(`http://localhost:5000/transactions/${id}`, {
        method: "DELETE",
      });

      fetchTransactions();
      onRefresh();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete transaction");
    }
  };

  // Edit transaction
  const handleEdit = async (tx: Transaction) => {
    const description = prompt("Description:", tx.description);
    const amountStr = prompt("Amount:", tx.amount.toString());
    const type = prompt("Type (Income/Expense):", tx.type);
    const date = prompt("Date (YYYY-MM-DD):", tx.date);

    if (!description || !amountStr || !type || !date) return;

    const amount = Number(amountStr);

    try {
      await fetch(`http://localhost:5000/transactions/${tx.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          amount,
          type,
          date,
        }),
      });

      fetchTransactions();
      onRefresh();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update transaction");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg mt-8"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Recent Transactions
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-left">
              <th className="p-3">Date</th>
              <th className="p-3">Description</th>
              <th className="p-3">Type</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-6 text-gray-400"
                >
                  No transactions yet
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <motion.tr
                  key={tx.id}
                  whileHover={{ scale: 1.01 }}
                  className="border-b"
                >
                  <td className="p-3">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>

                  <td className="p-3 font-medium">
                    {tx.description}
                  </td>

                  <td
                    className={`p-3 font-semibold ${
                      tx.type === "Income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {tx.type}
                  </td>

                  <td className="p-3 font-bold">
                    ${tx.amount.toLocaleString()}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => handleEdit(tx)}
                      className="text-blue-600 font-semibold mr-3 hover:text-blue-800"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(tx.id)}
                      className="text-red-600 font-semibold hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}