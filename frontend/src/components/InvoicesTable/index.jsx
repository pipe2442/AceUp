import {
  Table,
  TableBody,
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
import InvoiceDialog from "../InvoiceDialog.jsx";

const InvoicesTable = ({ orders, onEditOrder, onDeleteOrder }) => {
  const totalRevenue = orders.reduce((acc, order) => {
    const amount = parseFloat(order.totalAmount.replace(/[^0-9.-]+/g, ""));
    return acc + amount;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto p-0 antialiased">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Recent Invoices
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Review and manage your latest billing history.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <Table className="w-full">
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[120px] font-bold text-slate-700 py-4 pl-6">
                Invoice
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Status
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Method
              </TableHead>
              <TableHead className="text-right font-bold text-slate-700 pr-8">
                Amount
              </TableHead>
              <TableHead className="w-[80px] font-bold text-slate-700 text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-slate-500 font-medium">
                  No invoices found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="group hover:bg-slate-50/80 transition-colors duration-200"
                >
                  <TableCell className="font-bold text-slate-900 py-4 pl-6">
                    {order.invoice}
                  </TableCell>
                  <TableCell>
                    <OrderBadge status={order.paymentStatus} />
                  </TableCell>
                  <TableCell className="text-slate-600 font-medium">
                    {order.paymentMethod}
                  </TableCell>
                  <TableCell className="text-right font-bold text-slate-900 pr-8">
                    {order.totalAmount}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-9 w-9 p-0 cursor-pointer rounded-full hover:bg-slate-200">
                          <MoreHorizontal className="h-5 w-5 text-slate-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px] rounded-xl shadow-xl border-slate-200">
                        <DropdownMenuLabel className="text-xs uppercase text-slate-400 font-bold tracking-widest px-3 py-2">Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <InvoiceDialog 
                          orderData={order} 
                          onSave={onEditOrder}
                          trigger={
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer py-2.5 font-medium">
                              <Pencil className="mr-2 h-4 w-4 text-slate-500" />
                              Edit Invoice
                            </DropdownMenuItem>
                          }
                        />
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem 
                              onSelect={(e) => e.preventDefault()} 
                              className="text-red-600 cursor-pointer py-2.5 font-bold"
                            >
                              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                              Delete Invoice
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-2xl border-slate-200 shadow-2xl">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-2xl font-bold text-slate-900">
                                Delete Invoice?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-slate-500 font-medium text-base">
                                Are you sure you want to delete <span className="text-slate-900 font-bold">{order.invoice}</span>? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="gap-3 mt-4">
                              <AlertDialogCancel className="border-slate-200 text-slate-600 hover:bg-slate-50 font-bold rounded-lg h-11">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => onDeleteOrder(order.id)}
                                className="bg-red-600 hover:bg-red-700 text-white shadow-md font-bold rounded-lg h-11 px-6"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter className="bg-slate-50/80 border-t border-slate-200">
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={3}
                className="font-bold text-slate-700 py-6 pl-6"
              >
                Estimated Total Revenue
              </TableCell>
              <TableCell className="text-right font-black text-slate-900 text-xl pr-8">
                ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default InvoicesTable;
