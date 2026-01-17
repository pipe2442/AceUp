import { useMemo } from "react";

export const useInvoiceStats = (invoices = []) => {
  return useMemo(() => {
    const stats = {
      totalCount: invoices.length,
      totalRevenue: 0,
      paidCount: 0,
      pendingCount: 0,
      unpaidCount: 0,
    };

    invoices.forEach((invoice) => {
      const amount = parseFloat(invoice.totalAmount?.replace(/[^0-9.-]+/g, "") || 0);
      stats.totalRevenue += isNaN(amount) ? 0 : amount;

      const status = invoice.paymentStatus?.toLowerCase();
      if (status === "paid") stats.paidCount++;
      else if (status === "pending") stats.pendingCount++;
      else stats.unpaidCount++;
    });

    return stats;
  }, [invoices]);
};

