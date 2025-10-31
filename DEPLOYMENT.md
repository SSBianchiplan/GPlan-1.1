# Guia de Implantação - GPlan

Este guia descreve como implantar o sistema GPlan em diferentes ambientes.

## 📋 Pré-requisitos

- Docker e Docker Compose (recomendado)
- OU Python 3.8+, Node.js 18+, MongoDB 4.4+

## 🐳 Implantação com Docker (Recomendado)

### 1. Preparação

Clone o repositório:
```bash
git clone https://github.com/SSBianchiplan/GPlan-1.1.git
cd GPlan-1.1
```

### 2. Configuração

Edite o arquivo `docker-compose.yml` e altere as variáveis de ambiente sensíveis:

```yaml
environment:
  - SECRET_KEY=your-strong-secret-key-here
  - MONGO_INITDB_ROOT_PASSWORD=your-strong-password
  - DEBUG=False
```

### 3. Build e Inicialização

```bash
# Build das imagens
docker-compose build

# Iniciar os serviços
docker-compose up -d

# Verificar logs
docker-compose logs -f
```

### 4. Criar Superusuário

```bash
docker-compose exec backend python manage.py createsuperuser
```

### 5. Acessar o Sistema

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Admin Django: http://localhost:8000/admin

## 🔧 Implantação Manual

### Backend

1. **Instalar dependências:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **Configurar variáveis de ambiente:**
```bash
cp .env.example .env
# Edite o .env com suas configurações
```

3. **Executar migrações:**
```bash
cd gplan_project
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic
```

4. **Iniciar com Gunicorn:**
```bash
gunicorn gplan_project.wsgi:application --bind 0.0.0.0:8000 --workers 3
```

### Frontend

1. **Instalar dependências:**
```bash
cd frontend
npm install
```

2. **Build de produção:**
```bash
npm run build
```

3. **Servir com Nginx:**
```bash
# Copie os arquivos de dist/ para o diretório do Nginx
cp -r dist/* /var/www/html/
```

## ☁️ Deploy em Cloud

### AWS

#### EC2 + Docker

1. Lance uma instância EC2 (Ubuntu 22.04)
2. Instale Docker e Docker Compose
3. Configure Security Groups (portas 80, 443, 22)
4. Clone o repositório e execute:
```bash
docker-compose up -d
```

#### RDS + EC2

1. Crie uma instância MongoDB Atlas
2. Configure a conexão no backend
3. Deploy do backend em EC2 com Gunicorn
4. Deploy do frontend em S3 + CloudFront

### Azure

#### Container Instances

1. Crie um Azure Container Registry
2. Push das imagens Docker
3. Crie Container Instances para cada serviço
4. Configure networking

#### App Service

1. Backend: Deploy como App Service Python
2. Frontend: Deploy como Static Web App
3. MongoDB: Cosmos DB com API MongoDB

### GCP

#### Cloud Run

1. Build das imagens Docker
2. Push para Google Container Registry
3. Deploy no Cloud Run
4. Configure Cloud SQL (PostgreSQL) ou MongoDB Atlas

## 🔒 Segurança em Produção

### Configurações Essenciais

1. **Django Settings:**
```python
DEBUG = False
SECRET_KEY = 'generate-strong-key'
ALLOWED_HOSTS = ['yourdomain.com']
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
```

2. **MongoDB:**
- Habilitar autenticação
- Usar SSL/TLS
- Configurar firewall
- Backup regular

3. **HTTPS:**
- Use Let's Encrypt para certificado SSL
- Configure Nginx/Apache como proxy reverso
- Force HTTPS redirect

### Exemplo de Configuração Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Frontend
    location / {
        root /var/www/gplan/frontend;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Admin
    location /admin {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
    }

    # Static files
    location /static {
        alias /var/www/gplan/backend/staticfiles;
    }

    location /media {
        alias /var/www/gplan/backend/media;
    }
}
```

## 📊 Monitoramento

### Logs

```bash
# Docker
docker-compose logs -f backend
docker-compose logs -f frontend

# Sistema
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Health Checks

Crie endpoints de health check:

```python
# backend/gplan_project/health/views.py
from django.http import JsonResponse
from django.db import connection

def health_check(request):
    try:
        # Check database
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        return JsonResponse({"status": "healthy"})
    except Exception as e:
        return JsonResponse({"status": "unhealthy", "error": str(e)}, status=500)
```

### Ferramentas Recomendadas

- **Sentry**: Rastreamento de erros
- **New Relic**: Monitoramento de performance
- **Prometheus + Grafana**: Métricas e dashboards
- **ELK Stack**: Logs centralizados

## 🔄 CI/CD

### GitHub Actions

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build and push Docker images
        run: |
          docker-compose build
          docker-compose push
      
      - name: Deploy to server
        run: |
          ssh user@server 'cd /app && docker-compose pull && docker-compose up -d'
```

## 📦 Backup

### MongoDB

```bash
# Backup
mongodump --uri="mongodb://user:pass@host:27017/gplan_db" --out=/backup/$(date +%Y%m%d)

# Restore
mongorestore --uri="mongodb://user:pass@host:27017/gplan_db" /backup/20240101
```

### Arquivos

```bash
# Backup de media e static
tar -czf backup-$(date +%Y%m%d).tar.gz media/ staticfiles/
```

## 🚀 Performance

### Cache

- Use Redis para cache de sessão
- Configure cache de API responses
- CDN para assets estáticos

### Database

- Índices adequados no MongoDB
- Connection pooling
- Read replicas para leitura

### Frontend

- Lazy loading de componentes
- Code splitting
- Compress assets
- CDN

## 🔧 Troubleshooting

### Backend não conecta ao MongoDB

```bash
# Verifique a conexão
docker-compose exec mongodb mongosh -u admin -p admin123

# Verifique logs
docker-compose logs mongodb
```

### Frontend não carrega

```bash
# Verifique build
npm run build

# Verifique logs do Nginx
docker-compose logs frontend
```

### Erros de CORS

Configure adequadamente no backend:
```python
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
]
```

## 📞 Suporte

Para problemas de implantação, abra uma issue no GitHub com:
- Descrição do problema
- Logs relevantes
- Ambiente (OS, versões, etc.)
- Passos para reproduzir
