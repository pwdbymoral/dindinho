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

## 🎯 Escopo do MVP (Versão Alpha)

Foco inicial em fornecer uma solução funcional e gratuita para os dois usuários alpha testers.

### 1. Gerenciamento de Usuários

- Cadastro restrito aos dois usuários alpha (pré-cadastro via script/seeding).
- Login seguro (permitindo login por username ou email).

### 2. Funcionalidades Financeiras Essenciais

- **Carteiras (Wallets)**:
  - Criação e gerenciamento (ex: dinheiro, conta corrente, poupança).
  - Definição de saldo inicial.
  - Associação ao usuário titular.
- **Cartões de Crédito (Credit Cards)**:
  - Cadastro com nome, limite, dia de vencimento e fechamento da fatura.
  - Associação ao usuário titular.
- **Categorias (Categories)**:
  - Categorias padrão do sistema e personalizadas pelo usuário.
  - Tipos de categoria ('income', 'expense', ou NULO para categorias de sistema).
  - Categoria especial de sistema para "Transferências Internas".
- **Transações (Transactions)**:
  - Registro de receitas, despesas e transferências.
  - Campos para origem (`source_wallet_id`) e destino (`destination_wallet_id`, `credit_card_id`) para clareza nas movimentações.
  - Associação com categorias (obrigatória, usando categoria de sistema para transferências).
  - Status: `PENDING` (ex: conta a pagar, receita a receber), `PAID` (paga/realizada), `CANCELLED`.
  - Suporte a data da transação e data do pagamento/efetivação.
- **Compras Parceladas (Installment Purchases)**:
  - Registro de compras feitas no cartão de crédito de forma parcelada.
  - Definição do valor total, número de parcelas, data da compra.
  - Permite ao usuário definir/ajustar o mês/ano da primeira fatura.
  - Gera transações individuais para cada parcela.
- **Transações Recorrentes (Automáticas para Previsão - Opção A)**:
  - Definição de regras para despesas/receitas recorrentes (Netflix, conta de luz, salário).
  - Indicador se o valor é fixo ou variável (`is_amount_variable`).
  - Para valores variáveis, permite um `default_amount` como estimativa (opcional).
  - Sistema gera automaticamente instâncias futuras de transações (status `PENDING`) com base nas regras, para fins de previsão financeira.
  - Usuário edita o valor (se variável) e marca como `PAID` quando a transação se concretiza.
- **Contas Compartilhadas (MVP Inicial)**:
  - Foco em uma visão totalmente compartilhada entre os dois usuários alpha (toda informação visível para ambos).
  - Atributos de "propriedade" (`user_id`) em carteiras, cartões, regras recorrentes, etc., para identificar o titular/criador principal.
  - Categorias personalizadas criadas por um membro são visíveis/utilizáveis por ambos no contexto compartilhado.
- **Reembolsos (Refunds - Simplificado)**:
  - Registrados como transações de `income`.
  - Para reembolsos parcelados, o usuário registra múltiplas transações de `income` manualmente.

### 3. Visualização de Dados (Básico)

- Listagem de transações com filtros.
- Saldos de carteiras e visão de faturas de cartão (conceitual).
- Gráficos básicos de despesas/receitas por categoria (a ser detalhado).

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
