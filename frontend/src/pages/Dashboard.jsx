import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import OrdersTable from "@/components/OrdersTable";
import OrderDialog from "@/components/OrderDialog";
import { fetchInvoices, createInvoice, updateInvoice, deleteInvoice } from "@/api/invoices";

const Dashboard = () => {
  const queryClient = useQueryClient();

  // Fetching data
  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: updateInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });

  const handleAddOrder = (newOrder) => {
    createMutation.mutate(newOrder);
  };

  const handleUpdateOrder = (updatedOrder) => {
    updateMutation.mutate(updatedOrder);
  };

  const handleDeleteOrder = (id) => {
    // Confirmation is now handled in the OrdersTable component with AlertDialog
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500 animate-pulse">Loading invoices...</div>;
  if (isError) return <div className="p-8 text-center text-red-500 bg-red-50 rounded-lg m-8">Error loading invoices. Is the backend running?</div>;

  // Transform backend data to frontend format
  const formattedOrders = orders.map(order => ({
    id: order.id,
    invoice: order.invoice_number,
    paymentStatus: order.payment_status,
    totalAmount: `$${parseFloat(order.total_amount).toFixed(2)}`,
    paymentMethod: order.payment_method,
  }));

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Overview of your business performance</p>
        </div>
        <OrderDialog onSave={handleAddOrder} />
      </div>
      <OrdersTable 
        orders={formattedOrders} 
        onEditOrder={handleUpdateOrder} 
        onDeleteOrder={handleDeleteOrder}
      />
    </div>
  );
};

export default Dashboard;
