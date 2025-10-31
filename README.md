# GPlan - Sistema de Gestão Integrado

Sistema gerencial web integrado desenvolvido com Django/Djongo (MongoDB), React.js, Tailwind CSS e bibliotecas de visualização de dados (Chart.js).

## 📋 Descrição

GPlan é um sistema completo de gestão empresarial que integra módulos de:

- **Planejamento**: Produção, Financeiro, Qualidade e Estratégico
- **Controles e Processos**: Engenharia, Auditorias, Ocorrências e EOS
- **Logística e Produção**: Estoque, Ordens de Produção e Picking
- **Gestão Comercial**: CRM, Pedidos de Compras e Vendas

## 🚀 Tecnologias

### Backend
- Django 4.2.24
- Djongo 1.3.6 (Django + MongoDB)
- Django REST Framework
- JWT Authentication
- MongoDB

### Frontend
- React 18.2
- Vite
- Tailwind CSS
- React Router DOM
- Chart.js / React-Chartjs-2
- Axios
- Lucide React (ícones)

## 📦 Estrutura do Projeto

```
GPlan-1.1/
├── backend/
│   ├── gplan_project/
│   │   ├── gplan_project/        # Configurações principais
│   │   ├── planning/             # Módulo de planejamento
│   │   ├── inventory/            # Módulo de estoque
│   │   ├── auth_system/          # Sistema de autenticação
│   │   ├── engineering/          # Módulo de engenharia
│   │   ├── logistics/            # Módulo de logística
│   │   └── crm/                  # Módulo CRM
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/           # Componentes reutilizáveis
    │   ├── contexts/             # Contextos React
    │   ├── pages/                # Páginas da aplicação
    │   ├── services/             # Serviços API
    │   └── utils/                # Utilitários
    ├── package.json
    └── vite.config.js
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- Python 3.8+
- Node.js 18+
- MongoDB 4.4+

### Backend

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Crie um ambiente virtual:
```bash
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

5. Execute as migrações:
```bash
cd gplan_project
python manage.py migrate
```

6. Crie um superusuário:
```bash
python manage.py createsuperuser
```

7. Inicie o servidor:
```bash
python manage.py runserver
```

O backend estará disponível em `http://localhost:8000`

### Frontend

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação. Os endpoints de autenticação são:

- `POST /api/auth/token/` - Obter token de acesso
- `POST /api/auth/token/refresh/` - Renovar token
- `GET /api/auth/me/` - Obter informações do usuário autenticado

## 📊 Módulos Implementados

### 1. Planejamento de Produção
- CRUD completo de planos de produção
- Gestão de status e prioridades
- Controle de datas e custos
- Visualização em cards

### 2. Controle de Estoque
- Gerenciamento de produtos
- Controle de estoque mínimo e máximo
- Alertas de estoque baixo
- Movimentações de estoque
- Ordens de produção
- Listas de picking

### 3. Dashboard
- Visão geral do sistema
- Gráficos de produção
- Análise de estoque
- Indicadores financeiros
- Métricas em tempo real

## 🔒 Segurança

- Autenticação JWT com refresh tokens
- CORS configurado
- Proteção CSRF
- Senhas hasheadas
- Validação de dados no backend
- Proteção de rotas no frontend

## 🌐 Deploy

O sistema está preparado para deploy em cloud (AWS, Azure ou GCP):

### Backend
- Configure as variáveis de ambiente de produção
- Use Gunicorn como WSGI server
- Configure um servidor web (Nginx/Apache) como proxy reverso
- Configure MongoDB em cluster para produção

### Frontend
- Execute `npm run build` para criar a versão de produção
- Sirva os arquivos estáticos gerados
- Configure CORS adequadamente

## 📝 API Endpoints

### Planejamento
- `GET/POST /api/planning/production/` - Planos de produção
- `GET/PUT/DELETE /api/planning/production/{id}/` - Plano específico
- `GET/POST /api/planning/financial/` - Planos financeiros
- `GET/POST /api/planning/quality/` - Planos de qualidade
- `GET/POST /api/planning/strategic/` - Planos estratégicos

### Estoque
- `GET/POST /api/inventory/products/` - Produtos
- `GET/PUT/DELETE /api/inventory/products/{id}/` - Produto específico
- `GET/POST /api/inventory/movements/` - Movimentações
- `GET/POST /api/inventory/production-orders/` - Ordens de produção
- `GET/POST /api/inventory/picking-lists/` - Listas de picking

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Autores

- Sistema desenvolvido para GPlan v1.1

## 📞 Suporte

Para suporte, entre em contato através do sistema de issues do GitHub.

## 🎯 Roadmap

### Implementado ✅
- [x] Estrutura base do projeto
- [x] Sistema de autenticação
- [x] Módulo de planejamento de produção
- [x] Módulo de controle de estoque
- [x] Dashboard com gráficos
- [x] Interface responsiva
- [x] API RESTful

### Em desenvolvimento 🚧
- [ ] Módulo de engenharia
- [ ] Módulo de logística
- [ ] Módulo CRM
- [ ] Sistema de relatórios
- [ ] Notificações em tempo real
- [ ] Exportação de dados (PDF/Excel)

### Planejado 📋
- [ ] Aplicativo móvel
- [ ] Integração com ERPs externos
- [ ] Business Intelligence avançado
- [ ] Módulo de BI/Analytics
- [ ] Suporte multi-idiomas
- [ ] Testes automatizados completos

