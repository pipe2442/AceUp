import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useInvoiceForm } from "@/hooks/useInvoiceForm";

const OrderDialog = ({ onSave, orderData, trigger }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, errors, reset, isEditing } = useInvoiceForm(
    orderData, 
    onSave, 
    setOpen
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) reset();
      }}
    >
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button className="cursor-pointer flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all active:scale-95 px-5 py-6 rounded-xl">
            <PlusCircle className="w-5 h-5" />
            <span className="font-bold">Add New Order</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] rounded-2xl border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {isEditing ? "Edit Order" : "Create New Order"}
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-medium">
              {isEditing 
                ? "Modify the details of the existing invoice below." 
                : "Fill in the information to generate a new invoice record."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-2">
            <div className="grid gap-2">
              <Label htmlFor="invoice" className="text-sm font-bold text-slate-700">
                Invoice Number
              </Label>
              <Input
                id="invoice"
                placeholder="INV-001"
                readOnly={isEditing}
                className={`h-11 border-slate-200 focus:ring-slate-900 rounded-lg ${isEditing ? 'bg-slate-50 cursor-not-allowed opacity-70' : ''} ${
                  errors.invoice ? "border-red-500 focus:ring-red-500" : ""
                }`}
                {...register("invoice", {
                  required: "Invoice number is required",
                })}
              />
              {errors.invoice && (
                <span className="text-[11px] text-red-500 font-bold uppercase tracking-wider mt-1">
                  {errors.invoice.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="method" className="text-sm font-bold text-slate-700">
                Payment Method
              </Label>
              <Input
                id="method"
                placeholder="Credit Card, PayPal, etc."
                className={`h-11 border-slate-200 focus:ring-slate-900 rounded-lg ${
                  errors.method ? "border-red-500 focus:ring-red-500" : ""
                }`}
                {...register("method", {
                  required: "Payment method is required",
                })}
              />
              {errors.method && (
                <span className="text-[11px] text-red-500 font-bold uppercase tracking-wider mt-1">
                  {errors.method.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount" className="text-sm font-bold text-slate-700">
                Total Amount
              </Label>
              <div className="relative">
                <Input
                  id="amount"
                  placeholder="0.00"
                  className={`h-11 border-slate-200 focus:ring-slate-900 pl-8 rounded-lg ${
                    errors.amount ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  {...register("amount", {
                    required: "Amount is required",
                    pattern: {
                      value: /^\d+(\.\d{2})?$/,
                      message: "Use decimal format (e.g. 250.00)",
                    },
                  })}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                  $
                </span>
              </div>
              {errors.amount && (
                <span className="text-[11px] text-red-500 font-bold uppercase tracking-wider mt-1">
                  {errors.amount.message}
                </span>
              )}
            </div>
          </div>

          <DialogFooter className="mt-8 flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 h-11 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-11 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all active:scale-95 font-bold rounded-lg"
            >
              {isEditing ? "Update Invoice" : "Create Invoice"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
