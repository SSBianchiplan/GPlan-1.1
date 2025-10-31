# Documentação da API - GPlan

## Visão Geral

A API do GPlan é construída com Django REST Framework e segue os princípios REST. Todas as respostas são em formato JSON.

## URL Base

```
http://localhost:8000/api/
```

## Autenticação

A API utiliza autenticação via token.

### Obter Token

**Endpoint**: `POST /api/auth/token/`

**Request**:
```json
{
  "username": "usuario",
  "password": "senha"
}
```

**Response**:
```json
{
  "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b",
  "user_id": 1,
  "email": "usuario@example.com"
}
```

### Usar Token

Incluir o token no header de todas as requisições:

```
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

## Endpoints

### Planejamento Financeiro

#### Listar Dados Financeiros

**Endpoint**: `GET /api/financial/data/`

**Query Parameters**:
- `year` (opcional): Filtrar por ano
- `month` (opcional): Filtrar por mês
- `page` (opcional): Página para paginação
- `page_size` (opcional): Itens por página

**Response**:
```json
{
  "count": 12,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "month": "Jan",
      "year": 2024,
      "planned": 45000,
      "actual": 42000,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-31T23:59:59Z"
    },
    {
      "id": 2,
      "month": "Fev",
      "year": 2024,
      "planned": 48000,
      "actual": 51000,
      "created_at": "2024-02-01T00:00:00Z",
      "updated_at": "2024-02-29T23:59:59Z"
    }
  ]
}
```

#### Criar Dados Financeiros

**Endpoint**: `POST /api/financial/data/`

**Request**:
```json
{
  "month": "Jan",
  "year": 2024,
  "planned": 50000,
  "actual": 48000
}
```

**Response**:
```json
{
  "id": 13,
  "month": "Jan",
  "year": 2024,
  "planned": 50000,
  "actual": 48000,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

#### Atualizar Dados Financeiros

**Endpoint**: `PUT /api/financial/data/{id}/`

**Request**:
```json
{
  "month": "Jan",
  "year": 2024,
  "planned": 50000,
  "actual": 52000
}
```

**Response**: Mesmo formato do POST

#### Deletar Dados Financeiros

**Endpoint**: `DELETE /api/financial/data/{id}/`

**Response**: `204 No Content`

#### Listar Metas Financeiras

**Endpoint**: `GET /api/financial/goals/`

**Response**:
```json
{
  "count": 4,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Receita Trimestral Q4",
      "planned": 213000,
      "actual": 180000,
      "percentage": 84.5,
      "status": "in_progress",
      "deadline": "2024-12-31",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-10-31T23:59:59Z"
    }
  ]
}
```

#### Criar Meta Financeira

**Endpoint**: `POST /api/financial/goals/`

**Request**:
```json
{
  "name": "Receita Anual 2024",
  "planned": 700000,
  "actual": 0,
  "deadline": "2024-12-31"
}
```

#### Relatório Consolidado

**Endpoint**: `GET /api/financial/report/`

**Query Parameters**:
- `year` (obrigatório): Ano do relatório
- `format` (opcional): `json` (default) ou `pdf`

**Response**:
```json
{
  "year": 2024,
  "total_planned": 708000,
  "total_actual": 703000,
  "achievement_rate": 99.3,
  "variance": -5000,
  "monthly_data": [...],
  "goals": [...],
  "summary": {
    "best_month": {
      "month": "Ago",
      "achievement_rate": 104.8
    },
    "worst_month": {
      "month": "Jan",
      "achievement_rate": 93.3
    }
  }
}
```

### Controle de Estoque

*Em desenvolvimento*

#### Listar Produtos

**Endpoint**: `GET /api/inventory/products/`

#### Criar Produto

**Endpoint**: `POST /api/inventory/products/`

#### Movimentação de Estoque

**Endpoint**: `POST /api/inventory/movements/`

### Auditorias

*Em desenvolvimento*

#### Listar Auditorias

**Endpoint**: `GET /api/audits/`

#### Criar Auditoria

**Endpoint**: `POST /api/audits/`

### Gestão de Pedidos

*Em desenvolvimento*

#### Listar Pedidos

**Endpoint**: `GET /api/orders/`

#### Criar Pedido

**Endpoint**: `POST /api/orders/`

## Códigos de Status HTTP

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `204 No Content`: Recurso deletado com sucesso
- `400 Bad Request`: Dados inválidos
- `401 Unauthorized`: Não autenticado
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro no servidor

## Tratamento de Erros

### Formato de Erro

```json
{
  "error": "Descrição do erro",
  "details": {
    "field_name": ["Mensagem de erro específica"]
  },
  "code": "ERROR_CODE"
}
```

### Exemplos de Erros

#### Autenticação Inválida
```json
{
  "error": "Credenciais inválidas",
  "code": "INVALID_CREDENTIALS"
}
```

#### Dados Inválidos
```json
{
  "error": "Dados inválidos",
  "details": {
    "planned": ["Este campo é obrigatório"],
    "month": ["Valor inválido"]
  },
  "code": "VALIDATION_ERROR"
}
```

## Paginação

A API utiliza paginação por padrão:

**Request**:
```
GET /api/financial/data/?page=2&page_size=10
```

**Response**:
```json
{
  "count": 100,
  "next": "http://localhost:8000/api/financial/data/?page=3",
  "previous": "http://localhost:8000/api/financial/data/?page=1",
  "results": [...]
}
```

## Filtros

### Filtro por Data

```
GET /api/financial/data/?year=2024&month=Jan
```

### Filtro por Status

```
GET /api/financial/goals/?status=completed
```

### Ordenação

```
GET /api/financial/data/?ordering=-created_at
```

Use `-` para ordem decrescente.

## Rate Limiting

- 100 requisições por minuto para usuários autenticados
- 20 requisições por minuto para usuários não autenticados

Quando o limite é atingido:

```json
{
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED",
  "retry_after": 60
}
```

## CORS

A API aceita requisições de:
- http://localhost:5173 (desenvolvimento)
- http://localhost:3000 (desenvolvimento)
- Domínios configurados em produção

## Versionamento

A API atual é a versão 1.0. Futuras versões serão acessadas via:

```
/api/v2/endpoint/
```

## WebSocket

*Planejado para versão futura*

Para notificações em tempo real:

```javascript
const ws = new WebSocket('ws://localhost:8000/ws/notifications/');
```

## Exemplos de Uso

### JavaScript/Fetch

```javascript
// Obter dados financeiros
const response = await fetch('http://localhost:8000/api/financial/data/', {
  headers: {
    'Authorization': 'Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
```

### Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Authorization': 'Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b'
  }
});

// GET
const { data } = await api.get('/financial/data/');

// POST
const newData = await api.post('/financial/data/', {
  month: 'Jan',
  year: 2024,
  planned: 50000,
  actual: 48000
});
```

### Python/Requests

```python
import requests

headers = {
    'Authorization': 'Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b',
    'Content-Type': 'application/json'
}

# GET
response = requests.get(
    'http://localhost:8000/api/financial/data/',
    headers=headers
)
data = response.json()

# POST
new_data = requests.post(
    'http://localhost:8000/api/financial/data/',
    headers=headers,
    json={
        'month': 'Jan',
        'year': 2024,
        'planned': 50000,
        'actual': 48000
    }
)
```

## Segurança

### Boas Práticas

1. **Nunca** compartilhe seu token de autenticação
2. Use HTTPS em produção
3. Tokens expiram após 30 dias de inatividade
4. Implemente refresh token para sessões longas
5. Valide dados no lado do cliente antes de enviar

### Headers de Segurança

A API inclui headers de segurança:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## Suporte

Para questões sobre a API:
- Documentação técnica completa em `/docs/`
- Issues no repositório GitHub
- Contato com equipe de desenvolvimento
