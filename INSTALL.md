# Guia de Instalação - GPlan

## Pré-requisitos

### Frontend
- Node.js 18.x ou superior
- npm 9.x ou superior

### Backend (Para desenvolvimento futuro)
- Python 3.10 ou superior
- MongoDB 5.0 ou superior
- pip 22.x ou superior

## Instalação do Frontend

### 1. Clone o Repositório

```bash
git clone https://github.com/SSBianchiplan/GPlan-1.1.git
cd GPlan-1.1
```

### 2. Instale as Dependências

```bash
cd frontend
npm install
```

### 3. Execute o Servidor de Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### 4. Build para Produção

```bash
npm run build
```

Os arquivos de produção estarão na pasta `dist/`

## Configuração do Backend (Futuro)

### 1. Crie o Ambiente Virtual

```bash
cd backend
python -m venv venv

# Linux/Mac
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### 2. Instale as Dependências

```bash
pip install -r requirements.txt
```

### 3. Configure as Variáveis de Ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
SECRET_KEY=sua-chave-secreta-aqui
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_NAME=gplan_db

CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### 4. Crie o Projeto Django

```bash
django-admin startproject gplan .
```

### 5. Execute as Migrações

```bash
python manage.py migrate
```

### 6. Crie um Superusuário

```bash
python manage.py createsuperuser
```

### 7. Execute o Servidor

```bash
python manage.py runserver
```

A API estará disponível em `http://localhost:8000`

## Instalação do MongoDB (Se necessário)

### Ubuntu/Debian

```bash
# Importar a chave pública
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

# Adicionar o repositório
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# Atualizar e instalar
sudo apt-get update
sudo apt-get install -y mongodb-org

# Iniciar o serviço
sudo systemctl start mongod
sudo systemctl enable mongod
```

### macOS

```bash
# Usando Homebrew
brew tap mongodb/brew
brew install mongodb-community@5.0

# Iniciar o serviço
brew services start mongodb-community@5.0
```

### Windows

1. Baixe o instalador em https://www.mongodb.com/try/download/community
2. Execute o instalador
3. Siga o assistente de instalação
4. Configure como serviço do Windows

## Verificação da Instalação

### Frontend

1. Acesse `http://localhost:5173`
2. Você deve ver a tela inicial do GPlan
3. Navegue entre os módulos para verificar o funcionamento

### Backend (Quando implementado)

1. Acesse `http://localhost:8000/api/`
2. Você deve ver a API root
3. Teste os endpoints disponíveis

### MongoDB

```bash
# Verificar se o MongoDB está rodando
mongosh

# Ou
mongo
```

## Solução de Problemas

### Erro: "command not found: npm"
- Instale o Node.js em https://nodejs.org/

### Erro: "Cannot find module"
- Execute `npm install` novamente no diretório frontend

### Erro: "Port 5173 already in use"
- Encerre o processo usando a porta ou use uma porta diferente:
  ```bash
  npm run dev -- --port 3000
  ```

### Erro: Python não encontrado
- Instale Python 3.10+ em https://www.python.org/downloads/

### Erro: MongoDB connection failed
- Verifique se o MongoDB está rodando:
  ```bash
  sudo systemctl status mongod
  ```
- Verifique as configurações no arquivo `.env`

### Build muito grande
- O warning sobre chunk size é normal para desenvolvimento
- Em produção, considere implementar code splitting

## Desenvolvimento

### Frontend - Hot Reload
O Vite fornece hot reload automático. Salve qualquer arquivo `.jsx` e veja as mudanças instantaneamente.

### Backend - Auto Reload
Django recarrega automaticamente quando arquivos `.py` são modificados.

## Próximos Passos

1. Explore a aplicação navegando pelos módulos
2. Leia a [Documentação de Arquitetura](docs/ARCHITECTURE.md)
3. Consulte o [Guia do Usuário](docs/USER_GUIDE.md)
4. Revise a [Documentação da API](docs/API_DOCUMENTATION.md)

## Suporte

Para problemas ou dúvidas:
- Abra uma issue no GitHub
- Consulte a documentação em `/docs`
- Entre em contato com a equipe de desenvolvimento

## Atualizações

Para atualizar o sistema:

```bash
# Frontend
cd frontend
git pull
npm install
npm run build

# Backend
cd backend
git pull
pip install -r requirements.txt
python manage.py migrate
```
