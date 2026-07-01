'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button, Card, CardContent } from '@heroui/react';

import { CompanyList } from '@/features/companies/components/company-list';
import { CompanySearch } from '@/features/companies/components/company-search';
import { CreateCompanyModal } from '@/features/companies/components/create-company-modal';
import { createCompany, listCompanies } from '@/features/companies/services/companies-service';
import { type CompanySchema } from '@/features/companies/schemas/company-schema';
import { type Company } from '@/features/companies/types/company';

export function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    async function loadCompanies() {
      const initialCompanies = await listCompanies();
      setCompanies(initialCompanies);
    }

    loadCompanies();
  }, []);

  const filteredCompanies = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    if (!normalizedSearch) {
      return companies;
    }

    return companies.filter((company) => company.name.toLowerCase().includes(normalizedSearch));
  }, [companies, searchValue]);

  async function handleCreateCompany(data: CompanySchema) {
    const company = await createCompany(data);
    setCompanies((currentCompanies) => [...currentCompanies, company]);
  }

  return (
    <>
      <Card className="border border-white/10 bg-white/5 shadow-sm backdrop-blur">
        <CardContent className="flex flex-col gap-6 p-6 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <Button
              variant="primary"
              className="bg-[#2596be] font-medium text-white"
              onPress={() => setIsCreateModalOpen(true)}
            >
              Nova Empresa
            </Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-center">
            <CompanySearch value={searchValue} onChange={setSearchValue} />
            <div className="flex justify-start lg:justify-end">
              <span className="rounded-full bg-[#2596be]/10 px-4 py-2 text-sm font-medium text-[#2596be]">
                {filteredCompanies.length} empresa{filteredCompanies.length === 1 ? '' : 's'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="pb-8">
        {filteredCompanies.length > 0 ? (
          <CompanyList companies={filteredCompanies} />
        ) : (
          <Card className="border border-dashed border-white/10 bg-white/5">
            <CardContent className="flex items-center justify-center px-6 py-16 text-center">
              <div className="flex max-w-md flex-col gap-2">
                <h2 className="text-lg font-semibold text-foreground">Nenhuma empresa encontrada</h2>
                <p className="text-sm text-white/70">
                  Ajuste a pesquisa ou cadastre uma nova empresa para começar a lista.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      <CreateCompanyModal
        isOpen={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmit={handleCreateCompany}
      />
    </>
  );
}