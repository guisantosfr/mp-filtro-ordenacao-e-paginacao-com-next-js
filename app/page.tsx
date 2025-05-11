import FilterDropdown from '@/components/filter-dropdown';
import OrdersTable from '@/components/orders-table';
import Pagination from '@/components/pagination';
import SearchInput from '@/components/search-input';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { notFound } from 'next/navigation';

interface Props {
  searchParams: {
    search?: string;
  };
}

export default async function Component({ searchParams }: Props) {
  const search = searchParams.search || '';

  const endpoint = search.length > 0
  ? `${process.env.API_URL}/orders-api/orders?search=${encodeURIComponent(search)}`
  : `${process.env.API_URL}/orders-api/orders`;

  const data = await fetch(endpoint);

  if (!data.ok) return notFound();

  const json = await data.json();
  const orders = json.data;

  return (
    <main className="container px-1 py-10 md:p-10">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Pedidos</CardTitle>
          <CardDescription>
            Uma listagem de pedidos do seu negócio.
          </CardDescription>
          <div className="flex pt-10 gap-4">
            <SearchInput defaultValue={search} />
            <FilterDropdown />
          </div>
        </CardHeader>
        <CardContent>
          <OrdersTable orders={orders} />
          <div className="mt-8">
            <Pagination />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
