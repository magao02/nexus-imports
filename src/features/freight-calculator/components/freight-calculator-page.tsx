'use client';

import { useCallback } from 'react';
import { Card, CardContent } from '@heroui/react';

import { FreightCalculatorForm } from './freight-calculator-form';
import { FreightCalculatorHeader } from './freight-calculator-header';
import { FreightCalculatorResultCard } from './freight-calculator-result-card';
import { useFreightCalculator } from '../hooks/use-freight-calculator';
import { type FreightCalculatorSchema } from '../schemas/freight-calculator-schema';

// Feature temporária e isolada: pode ser removida ou trocada por integração real no futuro.
export function FreightCalculatorPage() {
  const { result, error, calculate, clearResult } = useFreightCalculator();

  const handleSubmit = useCallback(
    async (data: FreightCalculatorSchema) => {
      await calculate({
        orderValue: data.orderValue,
        cep: data.cep,
        approximateWeight: data.approximateWeight,
        category: data.category,
        hasInvoice: data.hasInvoice,
        hasInsurance: data.hasInsurance,
      });
    },
    [calculate],
  );

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <FreightCalculatorHeader />

        <Card className="border border-white/10 bg-white/5 shadow-sm backdrop-blur">
          <CardContent className="p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start">
              <FreightCalculatorForm onSubmit={handleSubmit} onClearResult={clearResult} />

              <div className="flex flex-col gap-6">
                {error ? (
                  <Card className="border border-red-500/20 bg-red-500/10">
                    <CardContent className="flex min-h-[220px] items-center justify-center px-6 py-10 text-center">
                      <div className="flex max-w-sm flex-col gap-2">
                        <h2 className="text-lg font-semibold text-red-100">Cotação indisponível</h2>
                        <p className="text-sm text-red-100/80">{error}</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : null}

                {result ? (
                  <FreightCalculatorResultCard result={result} />
                ) : (
                  <Card className="border border-dashed border-white/10 bg-black/10">
                    <CardContent className="flex min-h-[220px] items-center justify-center px-6 py-10 text-center">
                      <div className="flex max-w-sm flex-col gap-2">
                        <h2 className="text-lg font-semibold text-foreground">Nenhum resultado calculado ainda</h2>
                        <p className="text-sm text-white/70">
                          Preencha o formulário para ver a comissão, o frete e o total estimado.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}