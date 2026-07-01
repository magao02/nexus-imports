'use client';

import { Card, CardContent } from '@heroui/react';

import { type Company } from '@/features/companies/types/company';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="w-full border border-white/10 bg-white/5">
      <CardContent className="flex flex-col gap-1 p-4">
        <h3 className="text-base font-semibold text-foreground">{company.name}</h3>
        <p className="text-sm text-white/70">{company.responsibleEmail}</p>
      </CardContent>
    </Card>
  );
}