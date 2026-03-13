import { useState } from "react";

interface TransactionFormProps {
  onAdd: () => void; // Callback to refresh data after adding
}

export default function AddTransactionForm({ onAdd }: TransactionFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"Income" | "Expense">("Income");
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: 1, // Replace with actual user ID
          description,
          amount,
          type,
          date,
        }),
      });

      if (!response.ok) throw new Error("Failed to add transaction");

      setDescription("");
      setAmount(0);
      setType("Income");
      setDate("");

      // Call the parent callback to refresh data
      onAdd();
    } catch (err) {
      console.error(err);
      alert("Error adding transaction");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="p-2 border rounded"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "Income" | "Expense")}
          className="p-2 border rounded"
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-900 text-white p-2 rounded font-bold hover:bg-blue-700 md:col-span-1"
        >
          Add
        </button>
      </form>
    </div>
  );
}