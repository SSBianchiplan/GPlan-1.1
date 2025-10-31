# GPlan 1.1 - Sistema de Gestão Integrado

![Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)

Sistema web gerencial integrado para planejamento e controles corporativos, desenvolvido com tecnologias modernas e arquitetura escalável.

## 🚀 Funcionalidades

### ✅ Implementadas
- **Autenticação e Autorização**: Sistema completo com JWT e controle de acesso por roles
- **Planejamento de Produção**: Criação e gerenciamento de planos e ordens de produção
- **Controle de Estoque**: Gestão completa de produtos, estoque e movimentações
- **Dashboard**: Visão geral com métricas e ações rápidas

### 🔜 Estrutura Preparada Para
- Planejamento Financeiro
- Planejamento da Qualidade
- Planejamento Estratégico
- Controle de Engenharia
- Gestão de Auditorias
- Sistema de Ocorrências
- Sistema EOS (Engenharia de Operações)
- CRM (Customer Relationship Management)
- Gestão de Pedidos de Compras e Vendas

## 🛠️ Tecnologias

### Backend
- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados
- **Prisma** - ORM moderno
- **JWT** - Autenticação
- **Bcrypt** - Segurança de senhas

### Frontend
- **React 18** + **TypeScript**
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Estilização
- **Zustand** - State management
- **React Router** - Roteamento
- **Axios** - Cliente HTTP

## 📁 Estrutura do Projeto

```
GPlan-1.1/
├── backend/           # API REST em Node.js/Express
│   ├── prisma/       # Schema e migrações do banco
│   └── src/          # Código fonte
├── frontend/         # Aplicação React
│   └── src/          # Componentes e páginas
└── docs/            # Documentação completa
```

## 🚦 Quick Start

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Instalação Rápida

```bash
# Clone o repositório
git clone https://github.com/SSBianchiplan/GPlan-1.1.git
cd GPlan-1.1

# Configure o backend
cd backend
npm install
cp .env.example .env
# Edite o .env com suas configurações

# Configure o banco de dados
npx prisma migrate dev --name init
npx prisma generate

# Inicie o backend
npm run dev

# Em outro terminal, configure o frontend
cd ../frontend
npm install

# Inicie o frontend
npm run dev
```

Acesse: `http://localhost:5173`

## 📚 Documentação

- [Documentação Completa](./docs/README.md)
- [Guia de Instalação](./docs/SETUP.md)
- [Documentação da API](./docs/API.md)

## 🔐 Segurança

- Autenticação JWT
- Senhas com hash bcrypt
- Rate limiting (proteção contra brute force e DDoS)
- Controle de acesso por roles (ADMIN, MANAGER, USER, VIEWER)
- Proteção CORS
- Headers de segurança com Helmet
- Validação de entrada
- Logs de auditoria

## 🏗️ Arquitetura

Sistema modular com separação clara entre camadas:
- **Apresentação**: React + TypeScript
- **API**: REST com Express
- **Lógica de Negócio**: Controllers e Services
- **Persistência**: Prisma ORM + PostgreSQL

## 📈 Escalabilidade

- Arquitetura modular e desacoplada
- API RESTful stateless
- Banco de dados relacional otimizado
- Código TypeScript para manutenibilidade
- Preparado para deployment em cloud (AWS, Azure, GCP)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
1. Fork o projeto
2. Criar uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abrir um Pull Request

## 📄 Licença

ISC

## 👥 Autores

SSBianchiplan

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no GitHub.

---

**GPlan** - Gestão Integrada, Planejamento Eficiente 🎯
