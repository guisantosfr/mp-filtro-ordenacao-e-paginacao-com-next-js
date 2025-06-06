'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from './ui/badge';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import { Order } from '@/lib/types';

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter(); 

  const formatAmount = (amount: number) => {
    const amountInR$ = (amount / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return amountInR$;
  };

  const handleClick = (field: string) => {
    const params = new URLSearchParams(searchParams);

    //se já tinha uma ordenação crescente, ela se torna decrescente
    if (params.get('sort') === field) {
      params.set('sort', `-${field}`);
    }
    //se já tinha uma ordenação decrescente, limpa a ordenação
    else if (params.get('sort') === `-${field}`) {
      params.delete('sort');
    } 
    //se não tinha nenhuma ordenação, ela se torna crescente
    else if (field) {
      params.set('sort', field);
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const getSortIcon = (field: string) => {
    if(searchParams.get('sort') === field) {
      return <ChevronDown className="w-4" />
    } else if (searchParams.get('sort') === `-${field}`) {
      return <ChevronUp className="w-4" />
    } 

    return <ChevronsUpDown className="w-4" />
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead 
          className="hidden md:table-cell cursor-pointer justify-end items-center gap-1"
          onClick={() => { handleClick('order_date') }}
          >
            <div className="flex items-center gap-1">
              Data
              { getSortIcon('order_date') }
            </div>
          </TableHead>
          <TableHead
          className="text-right cursor-pointer flex justify-end items-center gap-1"
          onClick={() => { handleClick('amount_in_cents') }}
          >
            Valor
            
            { getSortIcon('amount_in_cents') }
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
