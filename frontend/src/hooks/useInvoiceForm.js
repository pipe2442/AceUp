import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const useInvoiceForm = (orderData, onSave, setOpen) => {
  const isEditing = !!orderData;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEditing && orderData) {
      setValue("invoice", orderData.invoice);
      setValue("method", orderData.paymentMethod);
      
      const amount = orderData.totalAmount?.replace(/[^0-9.]/g, "") || "";
      setValue("amount", amount);
    }
  }, [isEditing, orderData, setValue]);

  const onSubmit = (data) => {
    if (onSave) {
      const payload = isEditing ? { ...data, id: orderData.id } : data;
      onSave(payload);
    }
    if (setOpen) setOpen(false);
    reset();
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    reset,
    isEditing
  };
};

