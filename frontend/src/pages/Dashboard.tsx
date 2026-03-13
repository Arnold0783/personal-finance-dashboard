import React from "react";
import DashboardCards from "../components/DashboardCards";
import TransactionsTable from "../components/TransactionsTable";
import AddTransactionForm from "../components/AddTransactionForm";

export default function DashboardPage() {
  const [refresh, setRefresh] = React.useState(false);
  const handleRefresh = () => setRefresh(prev => !prev);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <DashboardCards key={refresh ? 1 : 0} />
      <AddTransactionForm onAdd={handleRefresh} />
      
    </div>
  );
}