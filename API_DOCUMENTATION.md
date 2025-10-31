# API Documentation - GPlan

API RESTful para o sistema GPlan.

## Base URL

```
http://localhost:8000/api
```

## Autenticação

A API usa JWT (JSON Web Tokens) para autenticação.

### Obter Token

```http
POST /api/auth/token/
Content-Type: application/json

{
  "username": "user",
  "password": "password"
}
```

**Resposta:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Renovar Token

```http
POST /api/auth/token/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Usar Token

Adicione o header em todas as requisições protegidas:

```http
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

---

## Usuários

### Obter Usuário Atual

```http
GET /api/auth/me/
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@example.com",
  "first_name": "Admin",
  "last_name": "User"
}
```

### Listar Usuários

```http
GET /api/auth/users/
Authorization: Bearer {token}
```

---

## Planejamento

### Planos de Produção

#### Listar Planos

```http
GET /api/planning/production/
Authorization: Bearer {token}

# Query parameters (opcionais)
?status=in_progress
?priority=high
?page=1
?page_size=20
```

**Resposta:**
```json
{
  "count": 50,
  "next": "http://localhost:8000/api/planning/production/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Produção Q1 2024",
      "description": "Planejamento de produção primeiro trimestre",
      "product_name": "Widget A",
      "quantity": 1000,
      "unit": "UN",
      "status": "in_progress",
      "priority": "high",
      "start_date": "2024-01-01",
      "end_date": "2024-03-31",
      "estimated_cost": "50000.00",
      "actual_cost": null,
      "responsible": 1,
      "responsible_name": "admin",
      "created_at": "2024-01-01T10:00:00Z",
      "updated_at": "2024-01-15T14:30:00Z"
    }
  ]
}
```

#### Criar Plano

```http
POST /api/planning/production/
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Novo Plano",
  "description": "Descrição do plano",
  "product_name": "Produto X",
  "quantity": 500,
  "unit": "UN",
  "status": "draft",
  "priority": "medium",
  "start_date": "2024-02-01",
  "end_date": "2024-02-28",
  "estimated_cost": "25000.00",
  "responsible": 1
}
```

#### Obter Plano Específico

```http
GET /api/planning/production/{id}/
Authorization: Bearer {token}
```

#### Atualizar Plano

```http
PUT /api/planning/production/{id}/
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Plano Atualizado",
  "status": "in_progress",
  ...
}
```

#### Deletar Plano

```http
DELETE /api/planning/production/{id}/
Authorization: Bearer {token}
```

### Planos Financeiros

Endpoints similares aos de produção:

```http
GET    /api/planning/financial/
POST   /api/planning/financial/
GET    /api/planning/financial/{id}/
PUT    /api/planning/financial/{id}/
DELETE /api/planning/financial/{id}/
```

**Campos:**
```json
{
  "title": "Receita Vendas",
  "description": "Receita prevista de vendas",
  "type": "income",  // income, expense, investment
  "status": "planned",  // planned, executed, cancelled
  "planned_amount": "100000.00",
  "actual_amount": "95000.00",
  "category": "Vendas",
  "date": "2024-01-31",
  "responsible": 1
}
```

### Planos de Qualidade

```http
GET    /api/planning/quality/
POST   /api/planning/quality/
GET    /api/planning/quality/{id}/
PUT    /api/planning/quality/{id}/
DELETE /api/planning/quality/{id}/
```

### Planos Estratégicos

```http
GET    /api/planning/strategic/
POST   /api/planning/strategic/
GET    /api/planning/strategic/{id}/
PUT    /api/planning/strategic/{id}/
DELETE /api/planning/strategic/{id}/
```

---

## Estoque

### Produtos

#### Listar Produtos

```http
GET /api/inventory/products/
Authorization: Bearer {token}

# Query parameters
?type=raw_material
?active=true
?needs_restock=true
```

**Resposta:**
```json
{
  "count": 100,
  "results": [
    {
      "id": 1,
      "code": "PROD001",
      "name": "Produto A",
      "description": "Descrição do produto",
      "type": "raw_material",
      "unit": "KG",
      "current_stock": 50,
      "minimum_stock": 20,
      "maximum_stock": 200,
      "unit_cost": "15.50",
      "location": "Armazém A - Prateleira 1",
      "active": true,
      "needs_restock": false,
      "total_value": "775.00",
      "created_at": "2024-01-01T10:00:00Z",
      "updated_at": "2024-01-15T14:30:00Z"
    }
  ]
}
```

#### Criar Produto

```http
POST /api/inventory/products/
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "PROD002",
  "name": "Novo Produto",
  "description": "Descrição",
  "type": "finished_product",
  "unit": "UN",
  "current_stock": 100,
  "minimum_stock": 30,
  "maximum_stock": 500,
  "unit_cost": "50.00",
  "location": "Armazém B"
}
```

#### Produtos com Estoque Baixo

```http
GET /api/inventory/products/low_stock/
Authorization: Bearer {token}
```

#### Valor Total do Estoque

```http
GET /api/inventory/products/inventory_value/
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "total_inventory_value": "150000.00"
}
```

### Movimentações de Estoque

#### Listar Movimentações

```http
GET /api/inventory/movements/
Authorization: Bearer {token}

# Query parameters
?product=1
?movement_type=in
```

**Resposta:**
```json
{
  "results": [
    {
      "id": 1,
      "product": 1,
      "product_name": "Produto A",
      "movement_type": "in",
      "quantity": 100,
      "reason": "Compra de matéria prima",
      "reference": "NF-12345",
      "user": 1,
      "user_name": "admin",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Criar Movimentação

```http
POST /api/inventory/movements/
Authorization: Bearer {token}
Content-Type: application/json

{
  "product": 1,
  "movement_type": "in",  // in, out, adjustment, transfer
  "quantity": 50,
  "reason": "Entrada de estoque",
  "reference": "PO-001"
}
```

**Nota:** A criação de uma movimentação automaticamente atualiza o estoque do produto.

### Ordens de Produção

#### Listar Ordens

```http
GET /api/inventory/production-orders/
Authorization: Bearer {token}

# Query parameters
?status=in_progress
?product=1
```

**Resposta:**
```json
{
  "results": [
    {
      "id": 1,
      "order_number": "OP-2024-001",
      "product": 1,
      "product_name": "Produto A",
      "quantity": 500,
      "status": "in_progress",
      "start_date": "2024-01-10",
      "expected_completion_date": "2024-01-31",
      "actual_completion_date": null,
      "notes": "Produção prioritária",
      "created_by": 1,
      "created_by_name": "admin",
      "created_at": "2024-01-08T10:00:00Z",
      "updated_at": "2024-01-10T09:00:00Z"
    }
  ]
}
```

#### Criar Ordem

```http
POST /api/inventory/production-orders/
Authorization: Bearer {token}
Content-Type: application/json

{
  "order_number": "OP-2024-002",
  "product": 1,
  "quantity": 300,
  "status": "pending",
  "expected_completion_date": "2024-02-15",
  "notes": "Urgente"
}
```

### Listas de Picking

#### Listar Listas

```http
GET /api/inventory/picking-lists/
Authorization: Bearer {token}

# Query parameters
?status=pending
?assigned_to=1
```

#### Criar Lista

```http
POST /api/inventory/picking-lists/
Authorization: Bearer {token}
Content-Type: application/json

{
  "picking_number": "PICK-001",
  "production_order": 1,
  "status": "pending",
  "assigned_to": 2,
  "notes": "Separar até 15h"
}
```

#### Completar Lista

```http
POST /api/inventory/picking-lists/{id}/complete/
Authorization: Bearer {token}
```

### Itens de Picking

#### Listar Itens

```http
GET /api/inventory/picking-items/
Authorization: Bearer {token}

# Query parameters
?picking_list=1
```

#### Criar Item

```http
POST /api/inventory/picking-items/
Authorization: Bearer {token}
Content-Type: application/json

{
  "picking_list": 1,
  "product": 3,
  "quantity_required": 50,
  "quantity_picked": 0
}
```

---

## Códigos de Status HTTP

- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado com sucesso
- `204 No Content` - Recurso deletado com sucesso
- `400 Bad Request` - Dados inválidos
- `401 Unauthorized` - Não autenticado
- `403 Forbidden` - Sem permissão
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erro no servidor

## Paginação

Endpoints que retornam listas usam paginação:

```json
{
  "count": 100,
  "next": "http://localhost:8000/api/resource/?page=2",
  "previous": null,
  "results": [...]
}
```

Use o parâmetro `page` para navegar:
```http
GET /api/resource/?page=2
```

Use `page_size` para controlar o tamanho da página (máx: 100):
```http
GET /api/resource/?page_size=50
```

## Filtros

Muitos endpoints suportam filtros via query parameters:

```http
# Filtrar por status
GET /api/planning/production/?status=in_progress

# Filtrar por prioridade
GET /api/planning/production/?priority=high

# Filtrar por tipo
GET /api/inventory/products/?type=raw_material

# Combinar filtros
GET /api/planning/production/?status=in_progress&priority=high
```

## Ordenação

Use o parâmetro `ordering`:

```http
# Ordenar por data de criação (ascendente)
GET /api/planning/production/?ordering=created_at

# Ordenar por data de criação (descendente)
GET /api/planning/production/?ordering=-created_at
```

## Busca

Alguns endpoints suportam busca:

```http
GET /api/inventory/products/?search=produto
```

## Exemplos com cURL

### Login

```bash
curl -X POST http://localhost:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### Listar Produtos

```bash
curl -X GET http://localhost:8000/api/inventory/products/ \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Criar Plano de Produção

```bash
curl -X POST http://localhost:8000/api/planning/production/ \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Plano Teste",
    "description": "Teste de API",
    "product_name": "Widget",
    "quantity": 100,
    "unit": "UN",
    "status": "draft",
    "priority": "medium",
    "start_date": "2024-02-01",
    "end_date": "2024-02-28",
    "estimated_cost": "5000.00"
  }'
```

## Erros Comuns

### Token Expirado

```json
{
  "detail": "Given token not valid for any token type",
  "code": "token_not_valid"
}
```

**Solução:** Use o endpoint de refresh para obter um novo token.

### Campos Obrigatórios

```json
{
  "name": ["Este campo é obrigatório."],
  "start_date": ["Este campo é obrigatório."]
}
```

### Recurso Não Encontrado

```json
{
  "detail": "Não encontrado."
}
```

## Suporte

Para questões sobre a API, consulte:
- [Documentação do Backend](backend/README.md)
- [README Principal](README.md)
- Issues no GitHub
