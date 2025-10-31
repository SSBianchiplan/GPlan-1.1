# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.1.0] - 2024-10-31

### Adicionado

#### Backend
- API RESTful completa com Express.js e TypeScript
- Sistema de autenticação JWT com bcrypt
- Prisma ORM para gerenciamento de banco de dados PostgreSQL
- Controllers para autenticação, produção e estoque
- Middleware de autenticação e autorização por roles
- Error handling centralizado
- Logging com Morgan
- Segurança HTTP com Helmet
- Configuração CORS

#### Frontend
- Aplicação React 18 com TypeScript
- Vite como build tool
- Tailwind CSS para estilização moderna e responsiva
- Zustand para gerenciamento de estado
- React Router v6 para navegação
- Axios para chamadas HTTP com interceptors
- Layout responsivo com sidebar
- Página de Login com validação
- Dashboard com métricas e ações rápidas
- Módulo de Planejamento de Produção
- Módulo de Controle de Estoque
- Componentes reutilizáveis

#### Database
- Schema Prisma completo com todos os modelos
- Modelo de usuários com roles (ADMIN, MANAGER, USER, VIEWER)
- Modelos para planejamento de produção
- Modelos para controle de estoque
- Modelos para gestão comercial (estrutura)
- Modelos para ocorrências e auditorias (estrutura)
- Seed script com dados de exemplo
- Suporte a migrações

#### Documentação
- README principal abrangente
- Guia de instalação detalhado (SETUP.md)
- Documentação completa da API (API.md)
- Guia de deployment para múltiplas plataformas (DEPLOYMENT.md)
- Guia do usuário completo (USER_GUIDE.md)
- Guia de contribuição (CONTRIBUTING.md)
- Documentação técnica (docs/README.md)

#### Infraestrutura
- Docker Compose para desenvolvimento
- Dockerfiles para backend e frontend
- Script de validação do projeto
- Configuração ESLint
- .gitignore apropriado
- Variáveis de ambiente configuráveis

#### Funcionalidades

##### Autenticação
- Registro de usuários
- Login com JWT
- Verificação de token
- Controle de acesso por roles
- Logout

##### Planejamento de Produção
- Criação de planos de produção
- Listagem de planos com paginação
- Filtros por status
- Criação de ordens de produção
- Listagem de ordens com paginação
- Filtros por status e prioridade
- Atualização de status de ordens
- Associação com produtos
- Prioridades (LOW, NORMAL, HIGH, URGENT)

##### Controle de Estoque
- Cadastro de produtos
- Listagem de produtos com paginação
- Busca por código ou nome
- Filtros por categoria e status
- Alertas de estoque baixo
- Movimentações de estoque (IN, OUT, ADJUSTMENT, TRANSFER)
- Atualização automática de estoque
- Controle de estoque mínimo e máximo
- Rastreabilidade de movimentações

##### Dashboard
- Métricas principais do sistema
- Total de produtos
- Alertas de estoque baixo
- Ordens de produção ativas
- Indicador de performance
- Ações rápidas para funcionalidades principais

### Estrutura Preparada Para

- Planejamento Financeiro
- Planejamento da Qualidade
- Planejamento Estratégico
- Controle de Engenharia
- Sistema EOS (Engenharia de Operações e Serviços)
- Gestão de Auditorias
- Registro e Gestão de Ocorrências
- CRM (Customer Relationship Management)
- Gestão de Pedidos de Compras
- Gestão de Pedidos de Vendas

### Segurança

- Autenticação JWT
- Hash de senhas com bcrypt
- Rate limiting por IP (proteção contra brute force e DDoS)
  - 5 tentativas de login a cada 15 minutos
  - 10 operações de criação por minuto
  - 100 requisições gerais a cada 15 minutos
- Validação de entrada
- Proteção CORS
- Headers de segurança
- Middleware de autorização
- Logs de auditoria (estrutura)

### Tecnologias Utilizadas

#### Backend
- Node.js 18+
- TypeScript 5.2
- Express.js 4.18
- Prisma 5.5
- PostgreSQL
- JWT
- Bcrypt

#### Frontend
- React 18.2
- TypeScript 5.2
- Vite 5.0
- Tailwind CSS 3.3
- Zustand 4.4
- React Router 6.18
- Axios 1.6

## [1.0.0] - 2024-10-31

### Adicionado
- Inicialização do projeto
- README básico
- Estrutura de repositório

---

## Tipos de Mudanças

- **Adicionado** para novas funcionalidades
- **Modificado** para mudanças em funcionalidades existentes
- **Depreciado** para funcionalidades que serão removidas
- **Removido** para funcionalidades removidas
- **Corrigido** para correções de bugs
- **Segurança** para vulnerabilidades

## Links

- [GitHub](https://github.com/SSBianchiplan/GPlan-1.1)
- [Documentação](./docs/README.md)
- [Issues](https://github.com/SSBianchiplan/GPlan-1.1/issues)
