# Documentação da API - GPlan

## Base URL

```
http://localhost:3000/api
```

## Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Inclua o token no header de todas as requisições autenticadas:

```
Authorization: Bearer {seu-token-jwt}
```

## Endpoints

### Autenticação

#### POST /auth/register
Registra um novo usuário.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "senha123",
  "name": "Nome do Usuário",
  "role": "USER"
}
```

**Roles disponíveis:** `ADMIN`, `MANAGER`, `USER`, `VIEWER`

**Response (201):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "Nome do Usuário",
  "role": "USER",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### POST /auth/login
Faz login e retorna o token JWT.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "Nome do Usuário",
    "role": "USER"
  }
}
```

#### GET /auth/me
Retorna informações do usuário autenticado.

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "Nome do Usuário",
  "role": "USER",
  "active": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

### Planejamento de Produção

#### POST /production/plans
Cria um novo plano de produção.

**Permissões:** `ADMIN`, `MANAGER`

**Body:**
```json
{
  "name": "Plano Q1 2024",
  "description": "Planejamento do primeiro trimestre",
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-03-31T23:59:59Z"
}
```

**Response (201):** Objeto ProductionPlan criado

#### GET /production/plans
Lista planos de produção.

**Query Params:**
- `status`: Filtrar por status (DRAFT, APPROVED, IN_PROGRESS, COMPLETED, CANCELLED)
- `page`: Número da página (padrão: 1)
- `limit`: Items por página (padrão: 10)

**Response (200):**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### GET /production/plans/:id
Retorna detalhes de um plano específico.

**Response (200):** Objeto ProductionPlan com ordens relacionadas

#### PUT /production/plans/:id
Atualiza um plano de produção.

**Permissões:** `ADMIN`, `MANAGER`

**Body:** Campos a atualizar (name, description, startDate, endDate, status)

---

#### POST /production/orders
Cria uma nova ordem de produção.

**Permissões:** `ADMIN`, `MANAGER`, `USER`

**Body:**
```json
{
  "orderNumber": "OP-2024-001",
  "productionPlanId": "uuid",
  "productId": "uuid",
  "quantity": 100,
  "priority": "NORMAL",
  "scheduledDate": "2024-01-15T00:00:00Z"
}
```

**Priority:** `LOW`, `NORMAL`, `HIGH`, `URGENT`

**Response (201):** Objeto ProductionOrder criado

#### GET /production/orders
Lista ordens de produção.

**Query Params:**
- `status`: Filtrar por status
- `priority`: Filtrar por prioridade
- `page`: Número da página
- `limit`: Items por página

**Response (200):** Lista paginada de ordens

#### PATCH /production/orders/:id/status
Atualiza o status de uma ordem.

**Permissões:** `ADMIN`, `MANAGER`, `USER`

**Body:**
```json
{
  "status": "IN_PROGRESS"
}
```

**Status:** `PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`

---

### Controle de Estoque

#### POST /stock/products
Cria um novo produto.

**Permissões:** `ADMIN`, `MANAGER`

**Body:**
```json
{
  "code": "PROD-001",
  "name": "Produto A",
  "description": "Descrição do produto",
  "category": "Categoria A",
  "unit": "UN",
  "minStock": 10,
  "maxStock": 100,
  "unitPrice": 25.50
}
```

**Response (201):** Objeto Product criado

#### GET /stock/products
Lista produtos.

**Query Params:**
- `category`: Filtrar por categoria
- `active`: Filtrar por status (true/false)
- `search`: Buscar por código ou nome
- `page`: Número da página
- `limit`: Items por página

**Response (200):** Lista paginada de produtos

#### GET /stock/products/low-stock
Lista produtos com estoque abaixo do mínimo.

**Response (200):** Array de produtos com estoque baixo

#### GET /stock/products/:id
Retorna detalhes de um produto.

**Response (200):** Objeto Product com últimas movimentações

#### PUT /stock/products/:id
Atualiza um produto.

**Permissões:** `ADMIN`, `MANAGER`

**Body:** Campos a atualizar

---

#### POST /stock/movements
Cria uma movimentação de estoque.

**Permissões:** `ADMIN`, `MANAGER`, `USER`

**Body:**
```json
{
  "productId": "uuid",
  "type": "IN",
  "quantity": 50,
  "reference": "NF-12345",
  "notes": "Entrada de estoque"
}
```

**Type:** `IN`, `OUT`, `ADJUSTMENT`, `TRANSFER`

**Response (201):** Objeto StockMovement criado

#### GET /stock/movements
Lista movimentações de estoque.

**Query Params:**
- `productId`: Filtrar por produto
- `type`: Filtrar por tipo
- `page`: Número da página
- `limit`: Items por página

**Response (200):** Lista paginada de movimentações

---

## Códigos de Status HTTP

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Dados inválidos
- `401 Unauthorized`: Não autenticado
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro no servidor

## Erros

Formato padrão de erro:

```json
{
  "error": "Mensagem de erro"
}
```

## Rate Limiting

Atualmente não há limitação de taxa. Em produção, recomenda-se implementar rate limiting.

## Versionamento

Versão atual: v1 (implícita na URL base)
