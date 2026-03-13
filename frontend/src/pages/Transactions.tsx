import React from "react";
import TransactionsTable from "../components/TransactionsTable";

export default function TransactionsPage() {
  const [refresh, setRefresh] = React.useState(false);
  const handleRefresh = () => setRefresh(prev => !prev);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>
      <TransactionsTable key={refresh ? 1 : 0} onRefresh={handleRefresh} />
    </div>
  );
}