import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchInvoices, createInvoice, updateInvoice, deleteInvoice } from "@/api/invoices";

export const useInvoices = () => {
  const queryClient = useQueryClient();

  const { data: invoices = [], isLoading, isError, error } = useQuery({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
    select: (data) => data.map(invoice => ({
      id: invoice.id,
      invoice: invoice.invoice_number,
      paymentStatus: invoice.payment_status,
      totalAmount: `$${parseFloat(invoice.total_amount).toFixed(2)}`,
      paymentMethod: invoice.payment_method,
    })),
  });

  const invalidateInvoices = () => queryClient.invalidateQueries({ queryKey: ["invoices"] });

  const createMutation = useMutation({
    mutationFn: createInvoice,
    onSuccess: invalidateInvoices,
  });

  const updateMutation = useMutation({
    mutationFn: updateInvoice,
    onSuccess: invalidateInvoices,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: invalidateInvoices,
  });

  return {
    invoices,
    isLoading,
    isError,
    error,
    actions: {
      create: createMutation.mutate,
      update: updateMutation.mutate,
      delete: deleteMutation.mutate,
    },
    isProcessing: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  };
};

