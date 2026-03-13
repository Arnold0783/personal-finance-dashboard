interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "Income" | "Expense";
  date: string;
}

const transactions: Transaction[] = [
  { id: 1, description: "Salary", amount: 4200, type: "Income", date: "2026-03-01" },
  { id: 2, description: "Groceries", amount: 300, type: "Expense", date: "2026-03-02" },
  { id: 3, description: "Freelance", amount: 500, type: "Income", date: "2026-03-03" },
  { id: 4, description: "Rent", amount: 1200, type: "Expense", date: "2026-03-04" },
];

function Transactions() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>

      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Date</th>
            <th className="p-2">Description</th>
            <th className="p-2">Type</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id} className="border-b">
              <td className="p-2">{tx.date}</td>
              <td className="p-2">{tx.description}</td>
              <td className={`p-2 font-bold ${tx.type === "Income" ? "text-green-500" : "text-red-500"}`}>
                {tx.type}
              </td>
              <td className="p-2">${tx.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;