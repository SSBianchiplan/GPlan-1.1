# Guia de Início Rápido - GPlan

Este guia ajudará você a ter o sistema GPlan funcionando rapidamente em seu ambiente local.

## 🚀 Início Rápido com Docker (Recomendado)

### Pré-requisitos
- Docker
- Docker Compose

### Passos

1. **Clone o repositório:**
```bash
git clone https://github.com/SSBianchiplan/GPlan-1.1.git
cd GPlan-1.1
```

2. **Configure as variáveis de ambiente:**
```bash
# Opcional: edite docker-compose.yml se necessário
```

3. **Inicie os serviços:**
```bash
docker-compose up -d
```

4. **Aguarde a inicialização (primeira vez pode levar alguns minutos):**
```bash
docker-compose logs -f backend
# Aguarde até ver "Booting worker" ou mensagens de sucesso
```

5. **Crie um superusuário:**
```bash
docker-compose exec backend python manage.py createsuperuser
```

6. **Acesse o sistema:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Admin Django: http://localhost:8000/admin

---

## 💻 Instalação Manual

### Pré-requisitos
- Python 3.8+
- Node.js 18+
- MongoDB 4.4+

### Backend

1. **Instalar MongoDB:**
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb-community

# Windows
# Baixe e instale do site oficial: https://www.mongodb.com/try/download/community

# Inicie o MongoDB
mongod --dbpath ~/data/db
```

2. **Configurar Backend:**
```bash
cd backend

# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com suas configurações

# Entrar na pasta do projeto Django
cd gplan_project

# Executar migrações
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser

# Iniciar servidor
python manage.py runserver
```

Backend estará em: http://localhost:8000

3. **Testar Backend:**
```bash
# Em outro terminal
curl http://localhost:8000/api/auth/users/
```

### Frontend

1. **Configurar Frontend:**
```bash
# Abra um novo terminal
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Frontend estará em: http://localhost:3000

2. **Testar Frontend:**
- Abra http://localhost:3000 no navegador
- Você verá a página de login

---

## 🎯 Primeiros Passos

### 1. Fazer Login

Acesse http://localhost:3000 e faça login com as credenciais do superusuário que você criou.

### 2. Explorar o Dashboard

Após o login, você verá o dashboard com:
- Estatísticas do sistema
- Gráficos de produção
- Indicadores de estoque
- Métricas financeiras

### 3. Criar um Produto

1. Clique em "Controle de Estoque" no menu lateral
2. Clique em "Novo Produto"
3. Preencha os dados:
   - Código: PROD001
   - Nome: Produto Teste
   - Tipo: Matéria Prima
   - Estoque Atual: 100
   - Estoque Mínimo: 20
   - Estoque Máximo: 500
   - Custo Unitário: 10.00
4. Clique em "Criar"

### 4. Criar um Plano de Produção

1. Clique em "Planejamento de Produção" no menu
2. Clique em "Novo Plano"
3. Preencha os dados:
   - Nome: Produção Janeiro
   - Descrição: Plano de produção para janeiro
   - Produto: Widget A
   - Quantidade: 500
   - Datas: 01/02/2024 a 28/02/2024
   - Status: Rascunho
   - Prioridade: Média
4. Clique em "Criar"

### 5. Explorar a API

Acesse o Django Admin para ver os dados:
- http://localhost:8000/admin

Ou use a API diretamente:

```bash
# Obter token
curl -X POST http://localhost:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "sua_senha"}'

# Usar token para acessar API
curl -X GET http://localhost:8000/api/inventory/products/ \
  -H "Authorization: Bearer SEU_TOKEN"
```

---

## 🔧 Resolução de Problemas

### Backend não inicia

**Erro: MongoDB connection failed**
```bash
# Verifique se MongoDB está rodando
mongod --version
# Se não estiver, inicie-o
mongod --dbpath ~/data/db
```

**Erro: Port 8000 already in use**
```bash
# Encontre o processo usando a porta
lsof -i :8000
# Mate o processo
kill -9 PID
```

### Frontend não inicia

**Erro: EADDRINUSE port 3000**
```bash
# Mate o processo na porta 3000
lsof -i :3000
kill -9 PID
```

**Erro ao instalar dependências**
```bash
# Limpe o cache do npm
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Erros de CORS

Se você vir erros de CORS no console do navegador:

1. Verifique o arquivo `backend/gplan_project/gplan_project/settings.py`
2. Certifique-se que `CORS_ALLOWED_ORIGINS` inclui `http://localhost:3000`

### Token JWT Inválido

Se você receber erros de token:

1. Faça logout
2. Limpe o localStorage do navegador (F12 > Application > Local Storage)
3. Faça login novamente

---

## 📚 Próximos Passos

1. **Explore a Documentação:**
   - [README Principal](README.md)
   - [API Documentation](API_DOCUMENTATION.md)
   - [Backend README](backend/README.md)
   - [Frontend README](frontend/README.md)

2. **Aprenda sobre Deploy:**
   - [Deployment Guide](DEPLOYMENT.md)

3. **Contribua:**
   - Reporte bugs via Issues
   - Sugira melhorias
   - Envie Pull Requests

---

## 💡 Dicas

### Dados de Exemplo

Para testar o sistema rapidamente, você pode criar dados de exemplo via Admin do Django:

1. Acesse http://localhost:8000/admin
2. Crie alguns produtos
3. Crie movimentações de estoque
4. Crie planos de produção

### Desenvolvimento

- Backend hot reload: O Django automaticamente recarrega ao alterar arquivos Python
- Frontend hot reload: O Vite automaticamente recarrega ao alterar arquivos React

### Debugando

**Backend:**
```python
# Adicione breakpoints no código
import pdb; pdb.set_trace()
```

**Frontend:**
```javascript
// Use console.log ou debugger
console.log('Debug info:', data)
debugger
```

### Testando a API

Use ferramentas como:
- Postman
- Insomnia
- Thunder Client (VS Code extension)
- curl (linha de comando)

---

## 🆘 Suporte

Se você encontrar problemas:

1. Verifique os logs:
   ```bash
   # Docker
   docker-compose logs -f backend
   docker-compose logs -f frontend
   
   # Manual
   # Veja o terminal onde os servidores estão rodando
   ```

2. Consulte a documentação

3. Abra uma Issue no GitHub com:
   - Descrição do problema
   - Passos para reproduzir
   - Logs de erro
   - Ambiente (OS, versões, etc.)

---

## ✅ Checklist de Verificação

Antes de começar a usar, verifique:

- [ ] MongoDB está rodando
- [ ] Backend está rodando em http://localhost:8000
- [ ] Frontend está rodando em http://localhost:3000
- [ ] Você pode acessar o Admin Django
- [ ] Você criou um superusuário
- [ ] Você consegue fazer login no frontend
- [ ] Você pode ver o dashboard

Se todos os itens estão OK, você está pronto para usar o GPlan! 🎉
