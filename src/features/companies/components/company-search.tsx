'use client';

import { Search } from 'lucide-react';
import { Input } from '@heroui/react';

interface CompanySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function CompanySearch({ value, onChange }: CompanySearchProps) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-default-400"
        aria-hidden="true"
      />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="search"
        placeholder="Buscar empresa"
        variant="bordered"
        className="pl-10"
      />
    </div>
  );
}