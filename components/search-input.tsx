'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@/lib/use-debounce';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SearchInput({ defaultValue = '' }: { defaultValue?: string }) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [search, setSearch] = useState(defaultValue);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    } else {
      params.delete('search');
    }

    replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearch]);
  
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Busque por nome..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  );
}
