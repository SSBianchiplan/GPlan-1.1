# Guia de Instalação e Configuração - GPlan

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **PostgreSQL** (versão 14 ou superior)
- **Git**

## Instalação

### 1. Clone o Repositório

```bash
git clone https://github.com/SSBianchiplan/GPlan-1.1.git
cd GPlan-1.1
```

### 2. Configuração do Backend

#### 2.1. Instalar Dependências

```bash
cd backend
npm install
```

#### 2.2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
PORT=3000
NODE_ENV=development

# Configure sua conexão com PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/gplan_db?schema=public"

# Gere uma chave secreta segura para JWT
JWT_SECRET=sua-chave-secreta-aqui
JWT_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:5173
```

#### 2.3. Configurar Banco de Dados

Crie o banco de dados no PostgreSQL:

```bash
# Acesse o PostgreSQL
psql -U postgres

# Crie o banco de dados
CREATE DATABASE gplan_db;

# Saia do PostgreSQL
\q
```

Execute as migrações do Prisma:

```bash
# Gerar o cliente Prisma
npm run prisma:generate

# Executar migrações
npx prisma migrate dev --name init
```

#### 2.4. Criar Usuário Administrador (Opcional)

Você pode usar o Prisma Studio para criar o primeiro usuário:

```bash
npx prisma studio
```

Ou criar via API após iniciar o servidor usando o endpoint `/api/auth/register`.

**Dados de exemplo para teste:**
- Email: admin@gplan.com
- Senha: admin123
- Nome: Administrador
- Role: ADMIN

### 3. Configuração do Frontend

#### 3.1. Instalar Dependências

```bash
cd ../frontend
npm install
```

#### 3.2. Configurar Variáveis de Ambiente (Opcional)

Crie um arquivo `.env` se necessário:

```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Iniciar os Serviços

#### 4.1. Iniciar o Backend

Em um terminal, execute:

```bash
cd backend
npm run dev
```

O backend estará disponível em `http://localhost:3000`

#### 4.2. Iniciar o Frontend

Em outro terminal, execute:

```bash
cd frontend
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## Testes

### Criar Usuário de Teste via API

Use um cliente HTTP (Postman, Insomnia, curl) para criar um usuário:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gplan.com",
    "password": "admin123",
    "name": "Administrador",
    "role": "ADMIN"
  }'
```

### Fazer Login

Acesse `http://localhost:5173/login` e use as credenciais criadas.

## Build para Produção

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

Os arquivos de produção estarão na pasta `dist/`.

## Estrutura de Dados de Exemplo

### Produto de Exemplo

```json
{
  "code": "PROD-001",
  "name": "Componente A",
  "description": "Descrição do componente",
  "category": "Eletrônicos",
  "unit": "UN",
  "minStock": 10,
  "maxStock": 100,
  "unitPrice": 25.50
}
```

### Ordem de Produção de Exemplo

```json
{
  "orderNumber": "OP-2024-001",
  "productId": "uuid-do-produto",
  "quantity": 50,
  "priority": "NORMAL",
  "scheduledDate": "2024-12-01T00:00:00Z"
}
```

## Troubleshooting

### Erro de Conexão com Banco de Dados

Verifique se:
- O PostgreSQL está rodando
- As credenciais no `.env` estão corretas
- O banco de dados foi criado
- As migrações foram executadas

### Erro de CORS

Verifique se:
- A variável `CORS_ORIGIN` no backend está configurada corretamente
- O frontend está rodando na porta especificada

### Token JWT Inválido

- Limpe o localStorage do navegador
- Faça login novamente
- Verifique se o `JWT_SECRET` é o mesmo entre requisições

## Comandos Úteis

### Backend

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start

# Prisma Studio (Interface visual do DB)
npx prisma studio

# Resetar banco de dados
npx prisma migrate reset
```

### Frontend

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

## Suporte

Para problemas ou dúvidas, abra uma issue no repositório GitHub.
