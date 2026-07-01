import { Card, CardContent } from '@heroui/react';

export function FreightCalculatorHeader() {
  return (
    <Card className="border border-white/10 bg-white/5 shadow-sm backdrop-blur">
      <CardContent className="flex flex-col gap-2 p-6 sm:p-8">
        <span className="text-sm font-medium uppercase tracking-[0.24em] text-[#2596be]">
          Simulador temporário
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Simulador de Comissão e Frete
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
          Ferramenta temporária para simulação de custos de importação.
        </p>
      </CardContent>
    </Card>
  );
}