# GPlan - Sistema de Gestão Integrado

## Visão Geral

GPlan é um sistema web gerencial integrado para planejamento e controles corporativos. O sistema é modular e atende às necessidades de:

- **Planejamento de Produção**: Criação e gerenciamento de planos e ordens de produção
- **Controle de Estoque**: Gerenciamento de produtos, estoque e movimentações
- **Gestão Comercial**: Pedidos de compras e vendas (estrutura preparada)
- **Controles e Processos**: Auditorias e ocorrências (estrutura preparada)

## Arquitetura

### Backend
- **Linguagem**: TypeScript/Node.js
- **Framework**: Express.js
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Autenticação**: JWT (JSON Web Tokens)

### Frontend
- **Framework**: React 18
- **Linguagem**: TypeScript
- **Build Tool**: Vite
- **Estilização**: Tailwind CSS
- **Gerenciamento de Estado**: Zustand
- **Roteamento**: React Router v6

## Estrutura do Projeto

```
GPlan-1.1/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma       # Schema do banco de dados
│   ├── src/
│   │   ├── config/            # Configurações (DB, ENV)
│   │   ├── controllers/       # Lógica de negócio
│   │   ├── middleware/        # Autenticação, validação
│   │   ├── routes/           # Rotas da API
│   │   ├── app.ts            # Configuração do Express
│   │   └── server.ts         # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # API client
│   │   ├── store/           # State management
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Componente principal
│   └── package.json
└── docs/                     # Documentação
```

## Funcionalidades Implementadas

### Autenticação e Autorização
- Login com JWT
- Controle de acesso baseado em roles (ADMIN, MANAGER, USER, VIEWER)
- Proteção de rotas

### Módulo de Planejamento de Produção
- Criação de planos de produção
- Gerenciamento de ordens de produção
- Controle de prioridades e status
- Visualização de cronograma

### Módulo de Controle de Estoque
- Cadastro de produtos
- Controle de estoque atual, mínimo e máximo
- Movimentações de estoque (entrada, saída, ajuste)
- Alertas de estoque baixo
- Busca e filtragem de produtos

### Dashboard
- Visão geral do sistema
- Estatísticas principais
- Ações rápidas

## Tecnologias e Dependências

### Backend
- `express`: Framework web
- `prisma`: ORM para banco de dados
- `jsonwebtoken`: Autenticação JWT
- `bcryptjs`: Hash de senhas
- `cors`: Controle de CORS
- `helmet`: Segurança HTTP
- `morgan`: Logging de requisições
- `express-validator`: Validação de dados

### Frontend
- `react`: Biblioteca UI
- `react-router-dom`: Roteamento
- `axios`: Cliente HTTP
- `zustand`: State management
- `react-hook-form`: Gerenciamento de formulários
- `date-fns`: Manipulação de datas
- `lucide-react`: Ícones
- `tailwindcss`: Framework CSS

## Segurança

- Autenticação via JWT
- Senhas com hash bcrypt
- CORS configurado
- Helmet para segurança HTTP
- Validação de entrada
- Autorização baseada em roles
- Logs de auditoria (estrutura preparada)

## Escalabilidade

O sistema foi projetado para ser escalável:

- Arquitetura modular
- Separação clara entre frontend e backend
- API RESTful
- Banco de dados relacional com índices
- Estrutura preparada para cache
- Código TypeScript para manutenibilidade

## Próximos Passos

Para expansão futura, o sistema já possui estruturas preparadas para:

1. **Planejamento Financeiro**
2. **Planejamento da Qualidade**
3. **Planejamento Estratégico**
4. **Controle de Engenharia**
5. **Sistema EOS (Engenharia de Operações e Serviços)**
6. **Sistema CRM**
7. **Gestão de Auditorias**
8. **Registro de Ocorrências** (modelo pronto)

## Deployment

O sistema está preparado para implantação em cloud:

- **Backend**: Pode ser implantado em AWS, Azure, GCP ou Heroku
- **Frontend**: Pode ser implantado em Vercel, Netlify ou servido via CDN
- **Banco de Dados**: PostgreSQL gerenciado (AWS RDS, Azure Database, etc.)

## Licença

ISC
