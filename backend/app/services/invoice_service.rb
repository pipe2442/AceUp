class InvoiceService
  def self.create_invoice(params)
    invoice = Invoice.new(params)
    if invoice.save
      SendInvoiceNotificationJob.perform_later(invoice.id)
      { success: true, invoice: invoice }
    else
      { success: false, errors: invoice.errors.full_messages }
    end
  end

  def self.update_invoice(invoice, params)
    if invoice.update(params)
      { success: true, invoice: invoice }
    else
      { success: false, errors: invoice.errors.full_messages }
    end
  end

  def self.delete_invoice(invoice)
    if invoice.destroy
      { success: true }
    else
      { success: false, errors: [ "Failed to delete invoice" ] }
    end
  end
end
