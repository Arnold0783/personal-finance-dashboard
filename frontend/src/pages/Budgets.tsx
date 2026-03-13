import { motion } from "framer-motion";

export default function BudgetsPage() {
  const budgets = [
    { category: "Food", limit: 500, spent: 350 },
    { category: "Entertainment", limit: 200, spent: 120 },
    { category: "Transport", limit: 150, spent: 75 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Budgets</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {budgets.map((b) => {
          const percentage = Math.min((b.spent / b.limit) * 100, 100);
          return (
            <motion.div
              key={b.category}
              className="bg-white p-6 rounded-lg shadow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-bold mb-2">{b.category}</h3>
              <p className="text-gray-600 mb-2">
                ${b.spent} / ${b.limit}
              </p>
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className={`h-3 rounded-full ${
                    percentage < 70 ? "bg-green-500" : percentage < 100 ? "bg-yellow-400" : "bg-red-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}