import { motion } from "framer-motion";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>

      <motion.div
        className="bg-white p-6 rounded-lg shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4">Monthly Report</h2>
        <p className="text-gray-600">
          See your spending patterns, top categories, and trends over time.
        </p>
        {/* TODO: You can later add charts with chart.js or recharts */}
      </motion.div>

      <motion.div
        className="bg-white p-6 rounded-lg shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-4">Annual Report</h2>
        <p className="text-gray-600">
          Track your income and expenses throughout the year.
        </p>
      </motion.div>
    </div>
  );
}