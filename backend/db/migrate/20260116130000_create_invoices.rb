class CreateInvoices < ActiveRecord::Migration[7.2]
  def change
    create_table :invoices do |t|
      t.string :invoice_number, null: false
      t.string :payment_status, null: false, default: 'Pending'
      t.string :payment_method, null: false
      t.decimal :total_amount, precision: 10, scale: 2, null: false

      t.timestamps
    end
    add_index :invoices, :invoice_number, unique: true
  end
end

