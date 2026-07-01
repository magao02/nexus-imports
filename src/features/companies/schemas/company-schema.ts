import { z } from 'zod';

export const companySchema = z.object({
  name: z
    .string({ required_error: 'O nome da empresa é obrigatório.' })
    .trim()
    .min(2, 'O nome da empresa deve ter no mínimo 2 caracteres.'),
  responsibleEmail: z
    .string({ required_error: 'O e-mail do responsável é obrigatório.' })
    .trim()
    .email('Informe um e-mail válido.'),
});

export type CompanySchema = z.infer<typeof companySchema>;