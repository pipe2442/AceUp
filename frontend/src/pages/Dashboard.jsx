import InvoicesTable from "@/components/InvoicesTable";
import InvoiceDialog from "@/components/InvoiceDialog";
import { useInvoices } from "@/hooks/useInvoices";
import { useInvoiceStats } from "@/hooks/useInvoiceStats";
import { Package, DollarSign, Clock } from "lucide-react";

const Dashboard = () => {
  const { invoices, isLoading, isError, actions } = useInvoices();
  const { totalCount, totalRevenue, pendingCount } = useInvoiceStats(invoices);

  if (isLoading) return <div className="p-8 text-center text-slate-500 animate-pulse font-medium">Loading invoices...</div>;
  if (isError) return (
    <div className="p-8 text-center text-red-500 bg-red-50 rounded-xl m-8 border border-red-100 shadow-sm">
      <p className="font-bold">Error loading invoices</p>
      <p className="text-sm mt-1">Please check if the backend server is running.</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage and monitor your business transactions</p>
        </div>
        <InvoiceDialog onSave={actions.create} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard 
          label="Total Invoices" 
          value={totalCount} 
          icon={<Package className="w-5 h-5 text-blue-600" />}
          bgColor="bg-blue-50"
        />
        <StatCard 
          label="Total Revenue" 
          value={`$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} 
          icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
          bgColor="bg-emerald-50"
        />
        <StatCard 
          label="Pending Payments" 
          value={pendingCount} 
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          bgColor="bg-amber-50"
        />
      </div>

      <InvoicesTable 
        orders={invoices} 
        onEditOrder={actions.update} 
        onDeleteOrder={actions.delete}
      />
    </div>
  );
};

const StatCard = ({ label, value, icon, bgColor }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className={`${bgColor} p-2.5 rounded-xl`}>
        {icon}
      </div>
    </div>
    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
    <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

export default Dashboard;
