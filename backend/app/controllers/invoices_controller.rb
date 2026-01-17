class InvoicesController < ApplicationController
  before_action :set_invoice, only: [ :show, :update, :destroy ]

  def index
    @invoices = Invoice.all.order(created_at: :desc)
    render json: @invoices
  end

  def show
    render json: @invoice
  end

  def create
    result = InvoiceService.create_invoice(invoice_params)

    if result[:success]
      render json: result[:invoice], status: :created
    else
      render json: { errors: result[:errors] }, status: :unprocessable_entity
    end
  end

  def update
    result = InvoiceService.update_invoice(@invoice, invoice_params)

    if result[:success]
      render json: result[:invoice]
    else
      render json: { errors: result[:errors] }, status: :unprocessable_entity
    end
  end

  def destroy
    result = InvoiceService.delete_invoice(@invoice)

    if result[:success]
      head :no_content
    else
      render json: { errors: result[:errors] }, status: :unprocessable_entity
    end
  end

  private

  def set_invoice
    @invoice = Invoice.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Invoice not found" }, status: :not_found
  end

  def invoice_params
    params.require(:invoice).permit(:invoice_number, :payment_status, :payment_method, :total_amount)
  end
end
