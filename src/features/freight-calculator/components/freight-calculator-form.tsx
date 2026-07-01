'use client';

import { useEffect, useId } from 'react';
import {
  Button,
  Card,
  CardContent,
  CheckboxContent,
  CheckboxIndicator,
  CheckboxControl,
  CheckboxRoot,
  Input,
  Radio,
  RadioGroup,
  RadioIndicator,
} from '@heroui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  freightCalculatorSchema,
  type FreightCalculatorSchema,
} from '../schemas/freight-calculator-schema';

interface FreightCalculatorFormProps {
  onSubmit: (data: FreightCalculatorSchema) => Promise<void> | void;
  onClearResult: () => void;
}

// Feature temporária e isolada: a estrutura pode ser removida ou substituída no futuro.
export function FreightCalculatorForm({ onSubmit, onClearResult }: FreightCalculatorFormProps) {
  const orderValueInputId = useId();
  const cepInputId = useId();
  const approximateWeightInputId = useId();
  const categoryGroupId = useId();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof freightCalculatorSchema>, unknown, FreightCalculatorSchema>({
    resolver: zodResolver(freightCalculatorSchema),
    defaultValues: {
      orderValue: '',
      cep: '',
      approximateWeight: '',
      category: 'perfume',
      hasInvoice: false,
      hasInsurance: false,
    },
  });

  const orderValue = watch('orderValue');
  const cep = watch('cep');
  const approximateWeight = watch('approximateWeight');
  const category = watch('category');
  const hasInvoice = watch('hasInvoice');
  const hasInsurance = watch('hasInsurance');

  function hasPositiveValue(value: unknown) {
    return Number(value) > 0;
  }

  useEffect(() => {
    if (
      hasPositiveValue(orderValue) ||
      cep ||
      hasPositiveValue(approximateWeight) ||
      category ||
      hasInvoice ||
      hasInsurance
    ) {
      onClearResult();
    }
  }, [approximateWeight, category, cep, hasInsurance, hasInvoice, onClearResult, orderValue]);

  function handleCategoryChange(value: string) {
    setValue('category', value as FreightCalculatorSchema['category'], { shouldDirty: true });
  }

  function handleInvoiceChange(isSelected: boolean) {
    setValue('hasInvoice', isSelected, { shouldDirty: true });
  }

  function handleInsuranceChange(isSelected: boolean) {
    setValue('hasInsurance', isSelected, { shouldDirty: true });
  }

  return (
    <Card className="border border-white/10 bg-white/5 shadow-sm backdrop-blur">
      <CardContent className="flex flex-col gap-6 p-6 sm:p-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-foreground">Dados da simulação</h2>
          <p className="text-sm text-white/70">Preencha os campos obrigatórios para calcular a estimativa.</p>
        </div>

        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor={orderValueInputId} className="text-sm font-medium text-foreground">
              Valor total do pedido
            </label>
            <Input
              {...register('orderValue')}
              id={orderValueInputId}
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              placeholder="Ex.: R$ 1.500,00"
              variant="secondary"
              fullWidth
              aria-invalid={Boolean(errors.orderValue)}
              aria-describedby={errors.orderValue ? `${orderValueInputId}-error` : undefined}
            />
            {errors.orderValue?.message ? (
              <p id={`${orderValueInputId}-error`} className="text-sm text-red-300">
                {errors.orderValue.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={cepInputId} className="text-sm font-medium text-foreground">
              CEP de destino
            </label>
            <Input
              {...register('cep')}
              id={cepInputId}
              type="text"
              inputMode="numeric"
              placeholder="00000-000"
              variant="secondary"
              fullWidth
              aria-invalid={Boolean(errors.cep)}
              aria-describedby={errors.cep ? `${cepInputId}-error` : undefined}
            />
            {errors.cep?.message ? (
              <p id={`${cepInputId}-error`} className="text-sm text-red-300">
                {errors.cep.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={approximateWeightInputId} className="text-sm font-medium text-foreground">
              Peso aproximado da caixa
            </label>
            <Input
              {...register('approximateWeight')}
              id={approximateWeightInputId}
              type="number"
              min="0"
              step="0.1"
              inputMode="decimal"
              placeholder="Ex.: 8,5 kg"
              variant="secondary"
              fullWidth
              aria-invalid={Boolean(errors.approximateWeight)}
              aria-describedby={errors.approximateWeight ? `${approximateWeightInputId}-error` : undefined}
            />
            {errors.approximateWeight?.message ? (
              <p id={`${approximateWeightInputId}-error`} className="text-sm text-red-300">
                {errors.approximateWeight.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span id={categoryGroupId} className="text-sm font-medium text-foreground">
                Categoria do pedido
              </span>
              <p className="text-sm text-white/70">Selecione se o pedido é de perfume ou eletrônico.</p>
            </div>

            <RadioGroup
              aria-labelledby={categoryGroupId}
              value={category}
              onChange={handleCategoryChange}
              orientation="horizontal"
              className="grid gap-3 sm:grid-cols-2"
            >
              <Radio value="perfume" className="rounded-2xl border border-white/10 bg-black/10 transition data-[selected=true]:border-[#2596be]/40 data-[selected=true]:bg-[#2596be]/10">
                <Radio.Content className="flex items-center gap-3 px-4 py-4 text-left text-sm text-foreground">
                  <Radio.Control className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[#2596be]">
                    <RadioIndicator />
                  </Radio.Control>
                  <span>Perfume - comissão de 15%</span>
                </Radio.Content>
              </Radio>

              <Radio value="eletronico" className="rounded-2xl border border-white/10 bg-black/10 transition data-[selected=true]:border-[#2596be]/40 data-[selected=true]:bg-[#2596be]/10">
                <Radio.Content className="flex items-center gap-3 px-4 py-4 text-left text-sm text-foreground">
                  <Radio.Control className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[#2596be]">
                    <RadioIndicator />
                  </Radio.Control>
                  <span>Eletrônico - comissão de 5%</span>
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <CheckboxRoot
              isSelected={hasInvoice}
              onChange={handleInvoiceChange}
              className="rounded-2xl border border-white/10 bg-black/10 transition data-[selected=true]:border-[#2596be]/40 data-[selected=true]:bg-[#2596be]/10"
            >
              <CheckboxContent className="flex items-center gap-3 px-4 py-4 text-left text-sm text-foreground">
                <CheckboxControl className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-white/20 bg-white/5 text-[#2596be]">
                  <CheckboxIndicator></CheckboxIndicator>
                </CheckboxControl>
                <span>Quer nota fiscal? adiciona 5% sobre o valor do pedido.</span>
              </CheckboxContent>
            </CheckboxRoot>

            <CheckboxRoot
              isSelected={hasInsurance}
              onChange={handleInsuranceChange}
              className="rounded-2xl border border-white/10 bg-black/10 transition data-[selected=true]:border-[#2596be]/40 data-[selected=true]:bg-[#2596be]/10"
            >
              <CheckboxContent className="flex items-center gap-3 px-4 py-4 text-left text-sm text-foreground">
                <CheckboxControl className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-white/20 bg-white/5 text-[#2596be]">
                  <CheckboxIndicator></CheckboxIndicator>
                </CheckboxControl>
                <span>Quer seguro? adiciona 3% sobre o valor do pedido.</span>
              </CheckboxContent>
            </CheckboxRoot>
          </div>

          <Button
            type="submit"
            className="bg-[#2596be] font-medium text-white"
            isDisabled={isSubmitting}
          >
            {isSubmitting ? 'Simulando...' : 'Simular custos'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}