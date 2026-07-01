export type FreightCalculatorCategory = 'perfume' | 'eletronico';

export interface FreightCalculatorInput {
  orderValue: number;
  cep: string;
  approximateWeight: number;
  hasInvoice: boolean;
  hasInsurance: boolean;
  category: FreightCalculatorCategory;
}

export interface FreightCalculatorResult {
  orderValue: number;
  category: FreightCalculatorCategory;
  commissionValue: number;
  invoiceValue: number;
  insuranceValue: number;
  freightValue: number;
  totalCommissionValue: number;
  estimatedTotal: number;
}