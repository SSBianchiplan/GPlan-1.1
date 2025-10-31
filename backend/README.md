# GPlan Backend

Backend do sistema GPlan desenvolvido com Django/Djongo e MongoDB.

## Estrutura

```
backend/
├── gplan_project/
│   ├── gplan_project/          # Configurações do projeto
│   │   ├── settings.py         # Configurações principais
│   │   ├── urls.py             # Rotas principais
│   │   ├── wsgi.py            # WSGI application
│   │   └── asgi.py            # ASGI application
│   │
│   ├── planning/               # Módulo de Planejamento
│   │   ├── models.py           # Modelos de dados
│   │   ├── serializers.py      # Serializers DRF
│   │   ├── views.py            # Views/ViewSets
│   │   ├── urls.py             # Rotas do módulo
│   │   └── admin.py            # Admin interface
│   │
│   ├── inventory/              # Módulo de Estoque
│   │   └── ...
│   │
│   ├── auth_system/            # Sistema de Autenticação
│   │   └── ...
│   │
│   └── manage.py               # Django management
│
├── requirements.txt            # Dependências Python
└── .env.example               # Variáveis de ambiente exemplo
```

## Modelos de Dados

### Planning (Planejamento)

#### ProductionPlan
- Planos de produção
- Controle de status e prioridades
- Gestão de datas e custos

#### FinancialPlan
- Planejamento financeiro
- Receitas, despesas e investimentos
- Valores planejados vs realizados

#### QualityPlan
- Planos de qualidade
- Padrões e critérios de inspeção

#### StrategicPlan
- Planejamento estratégico
- Visão, missão e objetivos

### Inventory (Estoque)

#### Product
- Cadastro de produtos
- Controle de estoque atual, mínimo e máximo
- Custos unitários

#### StockMovement
- Movimentações de estoque
- Entradas, saídas e ajustes
- Rastreabilidade

#### ProductionOrder
- Ordens de produção
- Controle de status e datas

#### PickingList
- Listas de separação
- Itens a serem coletados

## API Endpoints

### Autenticação
```
POST   /api/auth/token/          # Obter token JWT
POST   /api/auth/token/refresh/  # Renovar token
GET    /api/auth/me/             # Dados do usuário
GET    /api/auth/users/          # Listar usuários
```

### Planejamento
```
GET    /api/planning/production/              # Listar planos de produção
POST   /api/planning/production/              # Criar plano
GET    /api/planning/production/{id}/         # Detalhe do plano
PUT    /api/planning/production/{id}/         # Atualizar plano
DELETE /api/planning/production/{id}/         # Excluir plano

# Similar para: financial, quality, strategic
```

### Estoque
```
GET    /api/inventory/products/               # Listar produtos
POST   /api/inventory/products/               # Criar produto
GET    /api/inventory/products/{id}/          # Detalhe do produto
PUT    /api/inventory/products/{id}/          # Atualizar produto
DELETE /api/inventory/products/{id}/          # Excluir produto

GET    /api/inventory/products/low_stock/     # Produtos com estoque baixo
GET    /api/inventory/products/inventory_value/ # Valor total do estoque

# Similar para: movements, production-orders, picking-lists
```

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

MONGODB_NAME=gplan_db
MONGODB_HOST=mongodb://localhost:27017

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### MongoDB

O sistema usa MongoDB como banco de dados através do Djongo. Certifique-se de ter MongoDB instalado e rodando.

### Migrações

```bash
python manage.py makemigrations
python manage.py migrate
```

### Criar Superusuário

```bash
python manage.py createsuperuser
```

### Executar Servidor

```bash
python manage.py runserver
```

## Admin Interface

Acesse o admin do Django em: `http://localhost:8000/admin`

Todos os modelos estão registrados no admin para facilitar o gerenciamento.

## Segurança

- JWT para autenticação
- CORS configurado
- CSRF protection
- Password hashing
- Secure cookies (produção)
- XSS protection

## Testes

```bash
python manage.py test
```

## Deploy

### Gunicorn

```bash
gunicorn gplan_project.wsgi:application --bind 0.0.0.0:8000
```

### Variáveis de Produção

- Configure `DEBUG=False`
- Defina um `SECRET_KEY` forte
- Configure `ALLOWED_HOSTS` adequadamente
- Use HTTPS
- Configure `SESSION_COOKIE_SECURE=True`
- Configure `CSRF_COOKIE_SECURE=True`
