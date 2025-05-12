import axios from 'axios';
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

interface Props {
  searchParams: {
    search?: string;
    status?: string;
    sort?: string;
  };
}

export default async function Component({ searchParams }: Props) {
  const response = await axios.get(`${process.env.API_URL}/orders-api/orders`, {
    params: {
      search: searchParams?.search,
      status: searchParams?.status,
      sort: searchParams?.sort,
    },
  })

  const orders = response.data.data;

  return (
    <main className="container px-1 py-10 md:p-10">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Pedidos</CardTitle>
          <CardDescription>
            Uma listagem de pedidos do seu negócio.
          </CardDescription>
          <div className="flex pt-10 gap-4">
            <SearchInput />
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
