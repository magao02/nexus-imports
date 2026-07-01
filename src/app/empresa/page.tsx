import { Card, CardContent } from '@heroui/react';

import { CompaniesPage } from '@/features/companies/components/companies-page';

export default function EmpresaPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Card className="border border-white/10 bg-white/5 shadow-sm backdrop-blur">
          <CardContent className="flex flex-col gap-2 p-6 sm:p-8">
            <span className="text-sm font-medium uppercase tracking-[0.24em] text-[#2596be]">
              Companies
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Gestão de empresas
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Cadastre novas empresas, localize registros rapidamente e mantenha a base sempre organizada.
            </p>
          </CardContent>
        </Card>

        <CompaniesPage />
      </div>
    </main>
  );
}