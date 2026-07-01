import { Card, CardContent } from '@heroui/react';

import { formatCurrency } from '../utils/format-currency';
import { type FreightCalculatorResult } from '../types/freight-calculator';

function getCategoryLabel(category: FreightCalculatorResult['category']): string {
  return category === 'perfume' ? 'Perfume' : 'Eletrônico';
}

interface FreightCalculatorResultCardProps {
  result: FreightCalculatorResult;
}

export function FreightCalculatorResultCard({ result }: FreightCalculatorResultCardProps) {
  const resultItems = [
    {
      label: 'Categoria do pedido',
      value: getCategoryLabel(result.category),
    },
    {
      label: 'Valor do pedido',
      value: formatCurrency(result.orderValue),
    },
    {
      label: 'Comissão calculada',
      value: formatCurrency(result.commissionValue),
    },
    {
      label: 'Nota fiscal',
      value: formatCurrency(result.invoiceValue),
    },
    {
      label: 'Seguro',
      value: formatCurrency(result.insuranceValue),
    },
    {
      label: 'Valor do frete',
      value: formatCurrency(result.freightValue),
    },
    {
      label: 'Total comissão',
      value: formatCurrency(result.totalCommissionValue),
      emphasized: true,
    },
    {
      label: 'Valor total estimado',
      value: formatCurrency(result.estimatedTotal),
      emphasized: true,
    },
  ];

  return (
    <Card className="border border-white/10 bg-white/5 shadow-sm backdrop-blur">
      <CardContent className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-foreground">Resultado da simulação</h2>
          <p className="text-sm text-white/70">Valores calculados em memória com base nos dados informados.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {resultItems.map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl border px-4 py-4 ${
                item.emphasized ? 'border-[#2596be]/40 bg-[#2596be]/10' : 'border-white/10 bg-black/10'
              }`}
            >
              <span className="block text-xs uppercase tracking-[0.18em] text-white/50">{item.label}</span>
              <strong className={`mt-2 block text-lg ${item.emphasized ? 'text-[#2596be]' : 'text-foreground'}`}>
                {item.value}
              </strong>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}