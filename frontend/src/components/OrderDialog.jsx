import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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

const OrderDialog = ({ onSave, orderData, trigger }) => {
  const [open, setOpen] = useState(false);
  const isEditing = !!orderData;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEditing && open) {
      setValue("invoice", orderData.invoice);
      setValue("method", orderData.paymentMethod);
      const amount = orderData.totalAmount.replace(/[^0-9.]/g, "");
      setValue("amount", amount);
    }
  }, [isEditing, orderData, open, setValue]);

  const onSubmit = (data) => {
    if (onSave) {
      // Si estamos editando, incluimos el ID original para el backend
      const payload = isEditing ? { ...data, id: orderData.id } : data;
      onSave(payload);
    }
    setOpen(false);
    reset();
  };

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
          <Button className="cursor-pointer flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all active:scale-95">
            <PlusCircle className="w-4 h-4" />
            Add New Order
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] rounded-xl border-slate-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {isEditing ? "Edit Order" : "Create Order"}
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              {isEditing 
                ? "Update the details for this invoice." 
                : "Enter the details for the new invoice."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <div className="grid gap-2">
              <Label htmlFor="invoice" className="text-sm font-semibold text-slate-700">
                Invoice Number
              </Label>
              <Input
                id="invoice"
                placeholder="INV-001"
                readOnly={isEditing}
                className={`border-slate-200 focus:ring-slate-900 ${isEditing ? 'bg-slate-50 cursor-not-allowed' : ''} ${
                  errors.invoice ? "border-red-500" : ""
                }`}
                {...register("invoice", {
                  required: "Invoice number is required",
                })}
              />
              {errors.invoice && (
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                  {errors.invoice.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="method" className="text-sm font-semibold text-slate-700">
                Payment Method
              </Label>
              <Input
                id="method"
                placeholder="Credit Card, PayPal..."
                className={`border-slate-200 focus:ring-slate-900 ${
                  errors.method ? "border-red-500" : ""
                }`}
                {...register("method", {
                  required: "Payment method is required",
                })}
              />
              {errors.method && (
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                  {errors.method.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount" className="text-sm font-semibold text-slate-700">
                Amount
              </Label>
              <div className="relative">
                <Input
                  id="amount"
                  placeholder="250.00"
                  className={`border-slate-200 focus:ring-slate-900 pl-8 ${
                    errors.amount ? "border-red-500" : ""
                  }`}
                  {...register("amount", {
                    required: "Amount is required",
                    pattern: {
                      value: /^\d+(\.\d{2})?$/,
                      message: "Use decimal format (e.g. 250.00)",
                    },
                  })}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  $
                </span>
              </div>
              {errors.amount && (
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                  {errors.amount.message}
                </span>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6 flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all active:scale-95 px-8"
            >
              {isEditing ? "Update Order" : "Save Order"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
