# GPlan Backend

Backend Django com Djongo para o sistema GPlan.

## Instalação

```bash
# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com suas configurações

# Criar projeto Django
django-admin startproject gplan .

# Executar migrações
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser

# Iniciar servidor
python manage.py runserver
```

## Estrutura

- **gplan/**: Configurações principais do Django
- **financial/**: App de planejamento financeiro
- **inventory/**: App de controle de estoque
- **audits/**: App de auditorias
- **orders/**: App de gestão de pedidos

## Endpoints da API

### Planejamento Financeiro
- `GET /api/financial/data/` - Obter dados financeiros
- `GET /api/financial/goals/` - Obter metas financeiras
- `POST /api/financial/data/` - Criar novo registro financeiro
- `POST /api/financial/goals/` - Criar nova meta

### Outros módulos
Em desenvolvimento.

## Autenticação

O sistema utiliza autenticação via token Django REST Framework.

## MongoDB

Configure a conexão MongoDB no arquivo `.env`:

```
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_NAME=gplan_db
```
