'use client';

import { CompanyCard } from '@/features/companies/components/company-card';
import { type Company } from '@/features/companies/types/company';

interface CompanyListProps {
  companies: Company[];
}

export function CompanyList({ companies }: CompanyListProps) {
  return (
    <div className="flex flex-col gap-3">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
}