# Dindinho

Breve descrição do projeto: um aplicativo de gerenciamento de finanças pessoais que permite o compartilhamento de contas, ideal para casais, famílias ou qualquer grupo que divida despesas.

## 🚀 Visão Geral do Projeto

Este projeto visa criar uma solução intuitiva e eficiente para o controle financeiro individual e compartilhado, com foco inicial em atender às necessidades dos desenvolvedores como usuários primários (alpha testing) do Dindinho.

## 🛠️ Stack Tecnológico (Planejado)

- **Monorepo**: Yarn Workspaces
- **Frontend**: Vite, React, TypeScript, Shadcn/UI, PWA
- **Backend**: Node.js, Express.js, TypeScript, Prisma ORM
- **Banco de Dados**: Turso (libSQL - SQLite distribuído na nuvem)
- **Hospedagem (Plano MVP)**:
  - Frontend: Vercel
  - Backend: Vercel (Serverless Functions)
  - Banco de Dados: Turso (Tier Gratuito)

## 🗺️ Roadmap MVP

`(Atualizado em 01/Jun/2025)`

**Status Atual**: Backend com autenticação base, seed de dados, e CRUD de Carteiras completo e funcional! APIs de Cartões de Crédito e Categorias são os próximos alvos.

✅ Fase 0: Fundação e Configuração (Concluída)

- [✅] Definição do Escopo do MVP
- [✅] Modelagem Conceitual do Banco de Dados
- [✅] Configuração do Monorepo (Yarn Workspaces)
- [✅] Setup Inicial do Backend (Express.js)
- [✅] Migração Completa do Backend para TypeScript e Módulos ES
- [✅] Configuração do ORM (Prisma)
- [✅] Definição do Schema Completo do Banco de Dados no Prisma (User, Wallet, Category, CreditCard, InstallmentPurchase, RecurringTransactionRule, Transaction, Enums)
- [✅] Configuração e Integração com Banco de Dados na Nuvem (Turso)
- [✅] Criação e Aplicação de Todas as Migrações do Schema no Turso
- [✅] Configuração de Ferramentas de Qualidade de Código na Raiz (ESLint, Prettier)
  - [✅] Integração eslint-config-prettier
  - [✅] Configuração parserOptions.project e tsconfigRootDir para linting de TS no monorepo.
  - [✅] Plugin prettier-plugin-prisma.
- [✅] Configuração de ESLint Específico por Workspace (client e server) herdando da raiz.
- [✅] Configuração de Hooks de Pré-Commit (Husky + lint-staged).
- [✅] Remediação de Vulnerabilidades Iniciais (Jade para Pug, atualização do Express)

⏳ Fase 1: Backend - API Core, Autenticação e Setup de Implantação do Backend

- Autenticação de Usuário:
  - [✅] Implementar hashing de senhas (bcryptjs)
  - [✅] Criar endpoint de Login (POST /api/auth/login)
  - [✅] Implementar gerenciamento de sessão (express-session)
  - [✅] Middleware de proteção de rotas autenticadas (isAuthenticated)
  - [✅] Endpoint de Logout (POST /api/auth/logout)
  - [✅] Endpoint de Status da Autenticação (GET /api/auth/status)
- Seed de Dados Iniciais (via Prisma Seed):
  - [✅] Script Prisma Seed para usuários alpha e categorias de sistema.
- APIs Base (CRUDs):
  - API de Carteiras (Wallets):
    - [✅] POST /api/wallets - Criar
    - [✅] GET /api/wallets - Listar
    - [✅] GET /api/wallets/:id - Detalhar
    - [✅] PUT /api/wallets/:id - Atualizar
    - [✅] DELETE /api/wallets/:id - Deletar
  - API de Cartões de Crédito (CreditCards):
    - \[ ] CRUD completo (Criar, Listar, Detalhar, Atualizar, Deletar). (Nosso próximo foco!)
  - API de Categorias (Categories):
    - \[ ] CRUD para categorias personalizadas (Criar, Listar do usuário + sistema, Atualizar, Deletar).
  - Setup de Implantação do Backend:
    - \[ ] Escolher e configurar plataforma de hospedagem para o Express API.
    - \[ ] Configurar pipeline de implantação contínua para o backend.
    - \[ ] Meta: Ter a API de autenticação e as APIs base implantadas e acessíveis online.
- Refinamentos de Autenticação:
  - \[ ] Implementar `req.session.regenerate()` no fluxo de login para segurança adicional contra fixação de sessão.

⏩ Fase 2: Backend - API de Transações e Lógica de Negócio Principal (A Fazer)

- APIs de Funcionalidades Centrais:
  - \[ ] API de Compras Parceladas (InstallmentPurchases) - CRUD.
  - \[ ] API de Regras de Transação Recorrente (RecurringTransactionRules) - CRUD.
- Lógica de Negócio:
  - \[ ] Serviço de Geração Automática de Transações Recorrentes.
  - \[ ] API de Transações (Transactions) - CRUD completo, com filtros e lógica para diferentes tipos/status.
  - \[ ] Lógica de Compartilhamento de Conta (MVP - acesso compartilhado para usuários alpha).
- Melhorias de Carteira:
  - \[ ] API para Arquivamento de Carteiras (marcar/desmarcar isArchived).
- Meta: API completa do backend implantada e funcional, pronta para ser consumida pelo frontend.

⏩ Fase 3: Frontend (PWA React/TS + Shadcn/UI) - Estrutura, Autenticação e Implantação Inicial do Frontend (A Fazer)

- \[ ] Configuração inicial do projeto Client (Vite, TS, Shadcn/UI), Manifest PWA.
- \[ ] Setup de Implantação Contínua do Frontend (ex: Vercel).
- \[ ] Layout Principal (Navegação, Header, Sidebar, etc.).
- \[ ] Página e Fluxo de Login (consumindo a API do backend implantada).
- \[ ] Gerenciamento de estado de autenticação no client.
- \[ ] Roteamento protegido.
- Meta: Usuários alpha conseguem fazer login em uma versão online do Dindinho (PWA e API implantadas).

⏩ Fase 4: Frontend (PWA React/TS + Shadcn/UI) - Funcionalidades Principais (A Fazer)

- Telas de Gerenciamento (CRUD):
  - \[ ] Carteiras.
  - \[ ] Cartões de Crédito.
  - \[ ] Categorias personalizadas.
- Registro e Gerenciamento de Transações:
  - \[ ] Formulários para registrar Receitas, Despesas e Transferências.
  - \[ ] Interface para registrar Compras Parceladas.
  - \[ ] Interface para criar e gerenciar Regras de Transações Recorrentes.
  - \[ ] Interface para visualizar e "confirmar/pagar" transações recorrentes.
- Visualização e Análise:
  - \[ ] Dashboard/Visão Geral.
  - \[ ] Listagem detalhada de Transações com filtros.
  - \[ ] Visualizações de Dados (Tabelas e Gráficos básicos).
  - \[ ] Tratamento de Reembolsos (entrada manual de receita).
    Melhorias de Carteira:
  - \[ ] Interface para Arquivar/Desarquivar Carteiras e visualizar carteiras arquivadas.
  - \[ ] Implementar avisos e confirmações robustas no frontend ao deletar carteiras com transações.
    Meta: Todas as funcionalidades do MVP implementadas no frontend e backend, com implantações contínuas para validação.

⏩ Fase 5: Testes Alpha Integrados, Refinamento e Lançamento MVP (A Fazer)

- \[ ] Testes intensivos do MVP completo pelos dois usuários alpha na versão implantada e integrada.
- \[ ] Coleta de feedback contínuo e realização de ajustes finos.
- \[ ] Documentação básica para os usuários alpha (se necessário).
- \[ ] Preparação para o uso "oficial" e contínuo do MVP pelos alpha testers.

## 🌱 Futuro do Projeto (Pós-MVP)

- Cadastro público de usuários e sistema de convites para compartilhamento de contas.
- Permissões granulares para contas compartilhadas.
- Ferramentas de orçamento e definição de metas financeiras.
- Relatórios e visualizações de dados mais avançados.
- Melhorias na gestão de reembolsos (vinculação com despesa original, automação para parcelados).
- Cálculo de média para valores de despesas recorrentes variáveis.
- Notificações (contas a vencer, metas atingidas, etc.).
- Maior customização da interface (ícones, cores para categorias/carteiras).
- Suporte a múltiplas moedas.
- Integração com Open Finance (sonho distante 😄).

## 🧑‍💻 Práticas de Desenvolvimento

- **Commits**: Padrão Conventional Commits.
- **Branches**: Estratégia de Feature Branches (ex: `feat/minha-feature`, `fix/meu-bug`, `docs/minha-doc`).

---
