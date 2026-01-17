Invoice.destroy_all

Invoice.create!([
  {
    invoice_number: "INV-001",
    payment_status: "Paid",
    payment_method: "Credit Card",
    total_amount: 250.00
  },
  {
    invoice_number: "INV-002",
    payment_status: "Pending",
    payment_method: "PayPal",
    total_amount: 125.50
  },
  {
    invoice_number: "INV-003",
    payment_status: "Unpaid",
    payment_method: "Bank Transfer",
    total_amount: 450.00
  },
  {
    invoice_number: "INV-004",
    payment_status: "Paid",
    payment_method: "Credit Card",
    total_amount: 50.25
  },
  {
    invoice_number: "INV-005",
    payment_status: "Pending",
    payment_method: "PayPal",
    total_amount: 890.00
  }
])

puts "Seeded #{Invoice.count} invoices."
