class SendInvoiceNotificationJob < ApplicationJob
  queue_as :default

  def perform(invoice_id)
    invoice = Invoice.find_by(id: invoice_id)
    InvoiceMailer.new_invoice_email(invoice).deliver_now if invoice
  end
end
