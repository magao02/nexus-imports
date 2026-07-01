import { z } from 'zod';

export const freightCalculatorSchema = z.object({
  orderValue: z
    .coerce.number({ error: 'Informe um valor numérico válido.' })
    .positive('O valor total do pedido deve ser maior que zero.'),
  cep: z.string({ error: 'O CEP de destino é obrigatório.' }).trim().regex(/^\d{5}-?\d{3}$/, 'Informe um CEP válido.'),
  approximateWeight: z
    .coerce.number({ error: 'Informe um peso numérico válido.' })
    .positive('O peso aproximado da caixa deve ser maior que zero.'),
  category: z.enum(['perfume', 'eletronico']),
  hasInvoice: z.boolean().default(false),
  hasInsurance: z.boolean().default(false),
});

export type FreightCalculatorSchema = z.infer<typeof freightCalculatorSchema>;