import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().trim().min(2, 'O nome da empresa deve ter no mínimo 2 caracteres.'),
  responsibleEmail: z.string().trim().email('Informe um e-mail válido.'),
});

export type CompanySchema = z.infer<typeof companySchema>;