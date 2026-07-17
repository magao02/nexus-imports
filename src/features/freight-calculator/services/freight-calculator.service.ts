"use server";
import {
  type FreightCalculatorInput,
  type FreightCalculatorResult,
} from '../types/freight-calculator';

const FRENET_QUOTE_URL = 'http://api.frenet.com.br/shipping/quote';
const FRENET_TOKEN = '9648D07CRC659R4148RB5B8R25BE88CA4131';
const SELLER_CEP = '85851000';

const COMMISSION_RATES = {
  perfume: 0.15,
  eletronico: 0.05,
} as const;
const INVOICE_RATE = 0.05;
const INSURANCE_RATE = 0.03;

// Feature temporária e isolada para facilitar remoção ou substituição por API no futuro.
function normalizeCep(cep: string): string {
  return cep.replace(/\D/g, '');
}

function roundCurrencyValue(value: number): number {
  return Number(value.toFixed(2));
}

function getCommissionRate(category: FreightCalculatorInput['category']): number {
  return COMMISSION_RATES[category];
}

function getShipmentDimensions(weight: number) {
  if (weight <= 5) {
    return {
      Height: 15,
      Width: 20,
      Length: 25,
    };
  }

  if (weight <= 10) {
    return {
      Height: 25,
      Width: 30,
      Length: 45,
    };
  }

  return {
    Height: 30,
    Width: 45,
    Length: 55,
  };
}

interface FrenetQuoteItem {
  ServiceCode?: string;
  ServiceDescription?: string;
  Carrier?: string;
  CarrierCode?: string;
  ShippingPrice?: number | string;
  shippingPrice?: number | string;
  ShippingServicePrice?: number | string;
  shippingServicePrice?: number | string;
  OriginalShippingPrice?: number | string;
  PresentationalPrice?: number | string;
}

interface FrenetQuoteResponse {
  ShippingSevicesArray?: FrenetQuoteItem[];
  ShippingServicesArray?: FrenetQuoteItem[];
}

function parseShippingPrice(item: FrenetQuoteItem): number | null {
  const rawPrice =
    item.ShippingPrice ??
    item.shippingPrice ??
    item.ShippingServicePrice ??
    item.shippingServicePrice ??
    item.OriginalShippingPrice ??
    item.PresentationalPrice;

  if (rawPrice === undefined || rawPrice === null) {
    return null;
  }

  const normalizedPrice = typeof rawPrice === 'string' ? rawPrice.replace(/[^\d,.-]/g, '').replace(',', '.') : rawPrice;
  const price = Number(normalizedPrice);

  return Number.isFinite(price) ? roundCurrencyValue(price) : null;
}

async function quoteFrenetFreight(input: FreightCalculatorInput): Promise<number> {
  const response = await fetch(FRENET_QUOTE_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      token: FRENET_TOKEN,
    },
    body: JSON.stringify({
      SellerCEP: SELLER_CEP,
      RecipientCEP: normalizeCep(input.cep),
      ShipmentInvoiceValue: roundCurrencyValue(input.orderValue),
      ShippingItemArray: [
        {
          Weight: input.approximateWeight,
          ...getShipmentDimensions(input.approximateWeight),
          Quantity: 1,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`A cotação de frete falhou com status ${response.status}.`);
  }

  const data = (await response.json()) as FrenetQuoteResponse;
  console.log(data);
  const shippingItems = data.ShippingSevicesArray ?? data.ShippingServicesArray ?? [];
  const freightValue = shippingItems
    .map(parseShippingPrice)
    .filter((value): value is number => value !== null)
    .sort((first, second) => first - second)[0];

  if (freightValue === undefined) {
    throw new Error('A Frenet não retornou um valor de frete válido.');
  }

  return freightValue;
}

export async function calculateFreightSimulation(
  input: FreightCalculatorInput,
): Promise<FreightCalculatorResult> {
  const commissionRate = getCommissionRate(input.category);
  const commissionValue = roundCurrencyValue(input.orderValue * commissionRate);
  const invoiceValue = input.hasInvoice ? roundCurrencyValue(input.orderValue * INVOICE_RATE) : 0;
  const insuranceValue = input.hasInsurance ? roundCurrencyValue(input.orderValue * INSURANCE_RATE) : 0;
  const freightValue = await quoteFrenetFreight(input);
  const freightDiscountValue = roundCurrencyValue(Math.min(input.orderValue * 0.05, 60));
  const discountedFreightValue = roundCurrencyValue(Math.max(0, freightValue - freightDiscountValue));
  const totalCommissionValue = roundCurrencyValue(
    commissionValue + invoiceValue + insuranceValue + discountedFreightValue,
  );

  return {
    orderValue: roundCurrencyValue(input.orderValue),
    category: input.category,
    commissionValue,
    invoiceValue,
    insuranceValue,
    freightValue: discountedFreightValue,
    totalCommissionValue,
    estimatedTotal: roundCurrencyValue(
      input.orderValue + totalCommissionValue,
    ),
  };
}