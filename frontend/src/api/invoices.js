const API_URL = "http://localhost:3000/invoices";

export const fetchInvoices = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error fetching invoices");
  return response.json();
};

export const createInvoice = async (data) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      invoice: {
        invoice_number: data.invoice,
        payment_method: data.method,
        total_amount: data.amount,
        payment_status: "Pending", // Default for new invoices
      },
    }),
  });
  if (!response.ok) throw new Error("Error creating invoice");
  return response.json();
};

export const updateInvoice = async (data) => {
  // Note: data.id must be present for backend update
  const response = await fetch(`${API_URL}/${data.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      invoice: {
        payment_method: data.method,
        total_amount: data.amount,
      },
    }),
  });
  if (!response.ok) throw new Error("Error updating invoice");
  return response.json();
};

export const deleteInvoice = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting invoice");
  return true;
};

