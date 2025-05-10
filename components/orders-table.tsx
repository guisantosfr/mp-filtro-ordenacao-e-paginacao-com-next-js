import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from './ui/badge';
import { ChevronsUpDown } from 'lucide-react';
import { Order } from '@/lib/types';

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const formatAmount = (amount: number) => {
    const amountInR$ = (amount / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return amountInR$;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell cursor-pointer justify-end items-center gap-1">
            <div className="flex items-center gap-1">
              Data
              <ChevronsUpDown className="w-4" />
            </div>
          </TableHead>
          <TableHead className="text-right cursor-pointer flex justify-end items-center gap-1">
            Valor
            <ChevronsUpDown className="w-4" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          orders.map((order: Order) => {
            return (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-medium">{order.customer_name}</div>
                  <div className="hidden md:inline text-sm text-muted-foreground">
                    {order.customer_email}
                  </div>
                </TableCell>

                <TableCell>
                  <Badge className={`text-xs`} variant="outline">
                    {order.status === 'completed' ? 'Completo' : 'Pendente'}
                  </Badge>
                </TableCell>

                <TableCell className="hidden md:table-cell">{order.order_date.toString()}</TableCell>

                <TableCell className="text-right">{ formatAmount(order.amount_in_cents)}</TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  );
}
