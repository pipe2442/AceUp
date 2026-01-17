import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import OrderBadge from "./OrderBadge";
import OrderDialog from "../OrderDialog";

const OrdersTable = ({ orders, onEditOrder, onDeleteOrder }) => {
  const totalRevenue = orders.reduce((acc, order) => {
    const amount = parseFloat(order.totalAmount.replace(/[^0-9.-]+/g, ""));
    return acc + amount;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto p-8 antialiased">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Recent Orders
        </h2>
        <p className="text-slate-500 mt-1">
          Manage and review your latest transaction history.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <Table className="w-full">
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="w-[120px] font-semibold text-slate-700 py-4">
                Invoice
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Status
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Method
              </TableHead>
              <TableHead className="text-right font-semibold text-slate-700 pr-6">
                Amount
              </TableHead>
              <TableHead className="w-[80px] font-semibold text-slate-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id || order.invoice}
                className="group hover:bg-slate-50/80 transition-colors duration-200"
              >
                <TableCell className="font-medium text-slate-900 py-4">
                  {order.invoice}
                </TableCell>
                <TableCell>
                  <OrderBadge status={order.paymentStatus} />
                </TableCell>
                <TableCell className="text-slate-600">
                  {order.paymentMethod}
                </TableCell>
                <TableCell className="text-right font-medium text-slate-900 pr-6">
                  {order.totalAmount}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <OrderDialog 
                        orderData={order} 
                        onSave={onEditOrder}
                        trigger={
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Order
                          </DropdownMenuItem>
                        }
                      />
                      
                      {/* AlertDialog for deletion confirmation */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem 
                            onSelect={(e) => e.preventDefault()} 
                            className="text-red-600 cursor-pointer"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Order
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-xl border-slate-200">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl font-bold text-slate-900">
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-500">
                              This action cannot be undone. This will permanently delete invoice 
                              <span className="font-bold text-slate-900"> {order.invoice}</span> and all associated data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="gap-2">
                            <AlertDialogCancel className="border-slate-200 text-slate-600 hover:bg-slate-50">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => onDeleteOrder(order.id)}
                              className="bg-red-600 hover:bg-red-700 text-white shadow-sm"
                            >
                              Delete Invoice
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-slate-50/80 border-t border-slate-200">
            <TableRow>
              <TableCell
                colSpan={3}
                className="font-semibold text-slate-700 py-4"
              >
                Total Revenue
              </TableCell>
              <TableCell className="text-right font-bold text-slate-900 text-lg pr-6">
                ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <p className="text-center text-slate-400 text-sm mt-6 italic">
        A list of your recent invoices and their current payment status.
      </p>
    </div>
  );
};

export default OrdersTable;
