class InvoiceMailer < ApplicationMailer
  def new_invoice_email(invoice)
    @invoice = invoice
    mail(to: "admin@aceup.com", subject: "New Invoice: #{@invoice.invoice_number}")
  end
end
