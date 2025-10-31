# Guia de Deployment - GPlan

## Opções de Deployment

### 1. Docker Compose (Recomendado para desenvolvimento)

O jeito mais fácil de rodar o sistema completo:

```bash
# Clone o repositório
git clone https://github.com/SSBianchiplan/GPlan-1.1.git
cd GPlan-1.1

# Configure as variáveis de ambiente
cp backend/.env.example backend/.env
# Edite backend/.env conforme necessário

# Inicie os serviços
docker-compose up -d

# Execute as migrações
docker-compose exec backend npx prisma migrate deploy

# (Opcional) Popule o banco com dados de exemplo
docker-compose exec backend npm run prisma:seed
```

Acesse:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### 2. Deployment em AWS

#### 2.1. AWS RDS (PostgreSQL)

1. Crie uma instância PostgreSQL no RDS
2. Configure o security group para permitir conexões do backend
3. Anote a connection string

#### 2.2. AWS Elastic Beanstalk (Backend)

```bash
# Instale o EB CLI
pip install awsebcli

# Inicialize o projeto
cd backend
eb init

# Crie um ambiente
eb create gplan-backend-prod

# Configure variáveis de ambiente
eb setenv DATABASE_URL="postgresql://..." \
  JWT_SECRET="sua-chave-secreta" \
  NODE_ENV=production

# Deploy
eb deploy
```

#### 2.3. AWS S3 + CloudFront (Frontend)

```bash
cd frontend

# Build para produção
npm run build

# Instale o AWS CLI
pip install awscli

# Configure suas credenciais
aws configure

# Crie um bucket S3
aws s3 mb s3://gplan-frontend

# Configure para hosting estático
aws s3 website s3://gplan-frontend \
  --index-document index.html \
  --error-document index.html

# Faça upload do build
aws s3 sync dist/ s3://gplan-frontend

# Configure CloudFront para CDN (opcional mas recomendado)
```

### 3. Deployment em Azure

#### 3.1. Azure Database for PostgreSQL

1. Crie uma instância no portal Azure
2. Configure firewall rules
3. Anote a connection string

#### 3.2. Azure App Service (Backend)

```bash
# Instale o Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login
az login

# Crie um resource group
az group create --name gplan-rg --location eastus

# Crie um App Service Plan
az appservice plan create \
  --name gplan-plan \
  --resource-group gplan-rg \
  --sku B1 \
  --is-linux

# Crie o Web App
az webapp create \
  --resource-group gplan-rg \
  --plan gplan-plan \
  --name gplan-backend \
  --runtime "NODE|18-lts"

# Configure variáveis de ambiente
az webapp config appsettings set \
  --resource-group gplan-rg \
  --name gplan-backend \
  --settings DATABASE_URL="postgresql://..." \
    JWT_SECRET="sua-chave-secreta" \
    NODE_ENV=production

# Deploy
cd backend
zip -r deploy.zip .
az webapp deployment source config-zip \
  --resource-group gplan-rg \
  --name gplan-backend \
  --src deploy.zip
```

#### 3.3. Azure Static Web Apps (Frontend)

```bash
# Build
cd frontend
npm run build

# Crie Static Web App
az staticwebapp create \
  --name gplan-frontend \
  --resource-group gplan-rg \
  --location eastus

# Deploy via GitHub Actions ou Azure CLI
```

### 4. Deployment em Vercel (Frontend) + Heroku (Backend)

#### 4.1. Heroku (Backend)

```bash
# Instale o Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Crie o app
cd backend
heroku create gplan-backend

# Adicione PostgreSQL
heroku addons:create heroku-postgresql:mini

# Configure variáveis
heroku config:set JWT_SECRET="sua-chave-secreta"
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Execute migrações
heroku run npx prisma migrate deploy

# (Opcional) Seed
heroku run npm run prisma:seed
```

#### 4.2. Vercel (Frontend)

```bash
# Instale o Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel

# Configure variáveis de ambiente no dashboard
# VITE_API_URL = https://gplan-backend.herokuapp.com/api
```

### 5. Deployment em DigitalOcean

#### 5.1. Database

1. Crie um PostgreSQL Managed Database
2. Anote a connection string

#### 5.2. App Platform

1. Conecte seu repositório GitHub
2. Configure dois componentes:
   - Backend (Node.js)
   - Frontend (Static Site)
3. Configure variáveis de ambiente
4. Deploy automático via Git push

## Configurações de Produção

### Backend (.env)

```env
NODE_ENV=production
PORT=3000
DATABASE_URL="postgresql://user:pass@host:5432/db"
JWT_SECRET="chave-secreta-muito-forte-minimo-32-caracteres"
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://seu-dominio.com
```

### Frontend (.env)

```env
VITE_API_URL=https://api.seu-dominio.com/api
```

## Checklist de Segurança

- [ ] Gerar JWT_SECRET forte e único
- [ ] Configurar CORS para domínios específicos
- [ ] Habilitar SSL/HTTPS
- [ ] Configurar rate limiting
- [ ] Habilitar logs de produção
- [ ] Configurar backup do banco de dados
- [ ] Remover dados de seed em produção
- [ ] Configurar monitoramento (Sentry, DataDog, etc.)
- [ ] Revisar permissões de banco de dados
- [ ] Configurar variáveis de ambiente corretamente

## Monitoramento

### Logs

```bash
# Heroku
heroku logs --tail

# AWS
eb logs

# Azure
az webapp log tail --name gplan-backend --resource-group gplan-rg

# Docker
docker-compose logs -f
```

### Health Check

Endpoint disponível: `GET /health`

```bash
curl https://api.seu-dominio.com/health
```

Response esperado:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Backup

### Banco de Dados

```bash
# PostgreSQL manual backup
pg_dump -h host -U user -d database > backup.sql

# Restore
psql -h host -U user -d database < backup.sql

# Heroku
heroku pg:backups:capture
heroku pg:backups:download

# AWS RDS - Configure automated backups no console
```

## Escalabilidade

### Horizontal Scaling

- Backend: Adicione mais instâncias do servidor
- Frontend: CDN já distribui automaticamente
- Database: Configure read replicas

### Vertical Scaling

- Aumente recursos (CPU, RAM) conforme necessário
- Monitore uso e ajuste

## Troubleshooting

### Erro de Conexão com Banco

1. Verifique a connection string
2. Confirme que o servidor pode acessar o banco
3. Verifique firewall rules
4. Execute: `npx prisma migrate deploy`

### Frontend não conecta ao Backend

1. Verifique VITE_API_URL
2. Confirme CORS_ORIGIN no backend
3. Verifique se o backend está rodando
4. Teste o health endpoint

### Migrações Prisma

```bash
# Aplicar migrações em produção
npx prisma migrate deploy

# Ver status
npx prisma migrate status

# Resetar (CUIDADO: apaga dados!)
npx prisma migrate reset
```

## Custos Estimados

### Desenvolvimento/Testes
- Heroku Free/Hobby: $0-7/mês
- Vercel Free: $0
- **Total: $0-7/mês**

### Produção Pequena
- AWS/Azure/GCP: $20-50/mês
- DigitalOcean: $15-25/mês
- **Total: $15-50/mês**

### Produção Média
- AWS/Azure/GCP com autoscaling: $100-300/mês
- **Total: $100-300/mês**

## Suporte

Para problemas de deployment, consulte a documentação da plataforma específica ou abra uma issue no GitHub.
