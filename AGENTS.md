<!-- BEGIN:nextjs-agent-rules -->

# AGENTS.md

## Projeto

Sistema de Gestão de Importações (SGI).

O objetivo do sistema é permitir que clientes lojistas acompanhem pedidos de importação, criem novas solicitações e consultem informações de envio, enquanto administradores gerenciam clientes, pedidos e integrações logísticas.

---

# Stack

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* ESLint
* Prettier
* lucide react
* zustand
* Heroui
* zod

---

# Objetivos Arquiteturais

* Código simples e legível;
* Organização por domínio (feature-first);
* Baixo acoplamento;
* Alta coesão;
* Facilidade de manutenção;
* Facilidade de testes;
* Preparação para crescimento do sistema.

---

# Estrutura de Diretórios

```text
src
├── app
├── components
├── features
├── hooks
├── lib
├── providers
├── services
├── stores
├── styles
├── types
└── utils
```

---

# Organização por Features

Toda funcionalidade de negócio deve ficar dentro de `features`.

Exemplo:

```text
features
├── auth
├── dashboard
├── orders
├── customers
└── profile
```

Cada feature deverá seguir a seguinte estrutura:

```text
feature-name
├── components
├── hooks
├── schemas
├── services
├── types
└── utils
```

---

# Responsabilidades

## app

Contém rotas, layouts e páginas do App Router.

As páginas devem apenas orquestrar componentes e chamadas de hooks.

Evitar lógica de negócio diretamente em páginas.

---

## components

Componentes reutilizáveis compartilhados entre múltiplas features.

Não colocar regras de negócio.

---

## features

Responsável pela implementação das funcionalidades do sistema.

Toda regra relacionada ao domínio deve ficar dentro de sua respectiva feature.

---

## hooks

Hooks reutilizáveis globais.

---

## services

Serviços compartilhados.

Exemplos:

* Cliente HTTP;
* Manipulação de cookies;
* Serviços de armazenamento.

---

## lib

Inicializações e configurações compartilhadas.

Exemplos:

* axios;
* react-query;
* date utilities;
* form configuration.

---

## stores

Estado global da aplicação.

Evitar armazenar dados de uma única página no estado global.

---

## types

Tipos compartilhados entre features.

---

## utils

Funções utilitárias puras e reutilizáveis.

---

# Convenções

## Componentes

* Utilizar Functional Components.
* Utilizar Named Exports.
* Um componente por arquivo.
* Componentes devem ser pequenos e possuir responsabilidade única.

Exemplo:

```tsx
export function OrderCard() {}
```

---

## Hooks

* Sempre iniciar com `use`.
* Encapsular lógica reutilizável.
* Evitar efeitos colaterais desnecessários.

Exemplo:

```tsx
useAuth();
useOrders();
```

---

## Tipagem

* Preferir `interface` para contratos.
* Preferir `type` para unions e utility types.
* Não utilizar `any`.
* Utilizar tipagem explícita quando necessário.

---

## Imports

Preferir imports absolutos:

```ts
import { OrderCard } from '@/features/orders/components/order-card';
```

Evitar:

```ts
import { OrderCard } from '../../../../components/order-card';
```

---

# Regras para Geração de Código

Ao gerar código:

0. Respeitar a organização por features.
1. Primeiro gerar um plano de execução. 
2. Não criar lógica de negócio em páginas.
3. Não criar componentes excessivamente grandes.
4. Priorizar composição ao invés de duplicação.
5. Criar código tipado.
6. Não utilizar `any`.
7. Não adicionar bibliotecas sem solicitação explícita.
8. Seguir princípios de responsabilidade única e separação de responsabilidades.
9. Manter consistência com a estrutura existente do projeto.
10. Sempre preferir soluções simples e fáceis de manter.
11. usar heroui
12. a cor principal do sistema é #2596be

---


# Convenções de Arquivos

## Nomes de arquivos

- Utilizar kebab-case.

Exemplos:

```text
order-card.tsx
create-order-form.tsx
use-auth.ts
order-service.ts
```

---

## Componentes

- Um componente por arquivo;
- Named exports;
- Não utilizar default export.

Exemplo:

```tsx
export function OrderCard() {}
```

---

## Server e Client Components

Por padrão, utilizar Server Components.

Adicionar `"use client"` apenas quando necessário:

- useState
- useEffect
- Context API
- Event handlers
- Bibliotecas que exigem Client Components

Evitar transformar páginas inteiras em Client Components quando apenas uma pequena parte necessita de interatividade.


# Data Fetching

- Utilizar Server Components para dados iniciais sempre que possível.
- Utilizar Client Components apenas para interações do usuário.
- Toda comunicação com APIs deverá passar pela camada `services`.
- Não realizar chamadas HTTP diretamente em componentes de apresentação.


# Estado Global

- Utilizar Zustand para estado global.
- Utilizar estado global apenas para dados compartilhados entre múltiplas telas ou funcionalidades.
- Não armazenar estados locais de formulário em stores globais.

# Formulários

- Utilizar React Hook Form.
- Utilizar Zod para validação.
- Schemas devem ficar em:

features/<feature>/schemas



As próximas implementações deverão seguir integralmente as diretrizes deste documento.

<!-- END:nextjs-agent-rules -->


