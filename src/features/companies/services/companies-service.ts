import { Company } from '../types/company';

export interface CreateCompanyInput {
  name: string;
  responsibleEmail: string;
}

interface CompanySource {
  listCompanies: () => Promise<Company[]>;
  createCompany: (input: CreateCompanyInput) => Promise<Company>;
}

const initialCompanies: Company[] = [
  {
    id: 'company-1',
    name: 'Nexus Importadora',
    responsibleEmail: 'responsavel@nexus.com',
  },
  {
    id: 'company-2',
    name: 'Atlas Comércio Exterior',
    responsibleEmail: 'contato@atlas.com',
  },
];

function createInMemoryCompanySource(): CompanySource {
  const companies = [...initialCompanies];

  return {
    async listCompanies() {
      return [...companies];
    },
    async createCompany(input) {
      const company: Company = {
        id: crypto.randomUUID(),
        name: input.name,
        responsibleEmail: input.responsibleEmail,
      };

      companies.push(company);

      return company;
    },
  };
}

const companySource: CompanySource = createInMemoryCompanySource();

export function listCompanies(): Promise<Company[]> {
  return companySource.listCompanies();
}

export function createCompany(input: CreateCompanyInput): Promise<Company> {
  return companySource.createCompany(input);
}
