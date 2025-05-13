'use client';

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];

  lastPage: number;
}

export default function Pagination( { links, lastPage }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter(); 

  const handleClickPage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page > 1) {

      if(page > lastPage) {
        params.set('page', lastPage.toString());
      } else {
        params.set('page', page.toString());
      }
    }else {
      params.delete('page');
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <PaginationComponent>
      <PaginationContent>

        <PaginationItem 
        className={`${links[0].url ? 'cursor-pointer' : 'cursor-auto text-slate-300 hover:text-slate-300'}`}
        onClick={() => { handleClickPage(Number(searchParams.get('page') || 1) - 1) }}>
          <PaginationPrevious />
        </PaginationItem>

        {
          links.map((link, index) => {
            if (link.label.includes('Anterior') || link.label.includes('Próximo')){
              return null;
            }

            if (link.label == '...'){
              return (
                <PaginationItem key={'...'} className="hidden md:inline-flex">
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return (
              <PaginationItem key={index} className='cursor-pointer'>
                <PaginationLink 
                isActive={link.active}
                dangerouslySetInnerHTML={{__html: link.label}}
                onClick={() => { handleClickPage(Number(link.label))}}
                >
                </PaginationLink>
              </PaginationItem>
            );
          })
        }

        <PaginationItem
        className={`${links[links.length - 1].url ? 'cursor-pointer' : 'cursor-auto text-slate-300 hover:text-slate-300'}`}
        onClick={() => { handleClickPage(Number(searchParams.get('page') || 1) + 1) }} >
          <PaginationNext />
        </PaginationItem>

      </PaginationContent>
    </PaginationComponent>
  );
}
