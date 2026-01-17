class Invoice < ApplicationRecord
  validates :invoice_number, presence: true, uniqueness: true
  validates :payment_status, presence: true
  validates :payment_method, presence: true
  validates :total_amount, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
