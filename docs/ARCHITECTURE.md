# Arquitetura do Sistema GPlan

## Visão Geral

O GPlan é um sistema integrado de planejamento e gestão empresarial construído com arquitetura moderna separando frontend e backend.

## Stack Tecnológico

### Frontend
- **React 18**: Framework JavaScript para construção da interface
- **Tailwind CSS**: Framework CSS utility-first para estilização
- **React Router**: Gerenciamento de rotas
- **Recharts**: Biblioteca para gráficos interativos
- **jsPDF & xlsx**: Exportação de relatórios em PDF e Excel
- **Lucide React**: Ícones modernos
- **Axios**: Cliente HTTP para comunicação com API

### Backend
- **Django 4.2**: Framework Python web
- **Djongo**: Conector Django para MongoDB
- **Django REST Framework**: API RESTful
- **MongoDB**: Banco de dados NoSQL
- **Django CORS Headers**: Configuração de CORS

## Estrutura do Projeto

```
GPlan-1.1/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   └── Navbar.jsx
│   │   │   ├── Home/
│   │   │   │   ├── DashboardCard.jsx
│   │   │   │   └── NotificationPanel.jsx
│   │   │   └── FinancialPlanning/
│   │   │       ├── FinancialChart.jsx
│   │   │       ├── GoalComparison.jsx
│   │   │       └── ExportButtons.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── FinancialPlanning.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── Audits.jsx
│   │   │   └── Orders.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── gplan/
│   │   └── settings.py
│   ├── financial/
│   ├── inventory/
│   ├── audits/
│   ├── orders/
│   └── requirements.txt
│
└── docs/
    ├── ARCHITECTURE.md
    ├── USER_GUIDE.md
    └── API_DOCUMENTATION.md
```

## Módulos do Sistema

### 1. Planejamento Financeiro (Module 2)
**Responsabilidade**: Gestão e análise financeira completa

**Funcionalidades**:
- Visualização de dados financeiros mensais (planejado vs realizado)
- Gráficos interativos (linha e barra)
- Comparação de metas financeiras
- Indicadores de desempenho (KPIs)
- Exportação de relatórios (PDF/Excel)

**Componentes Principais**:
- `FinancialPlanning.jsx`: Página principal
- `FinancialChart.jsx`: Gráficos Recharts
- `GoalComparison.jsx`: Comparação de metas
- `ExportButtons.jsx`: Exportação de relatórios

### 2. Controle de Estoque
**Responsabilidade**: Gestão de produtos e inventário

**Funcionalidades** (Em desenvolvimento):
- Cadastro de produtos
- Controle de entrada/saída
- Alertas de estoque baixo
- Relatórios de inventário

### 3. Auditorias
**Responsabilidade**: Relatórios e auditorias do sistema

**Funcionalidades** (Em desenvolvimento):
- Registro de auditorias
- Acompanhamento de conformidade
- Relatórios de auditoria

### 4. Gestão de Pedidos
**Responsabilidade**: Gestão de compras e vendas

**Funcionalidades** (Em desenvolvimento):
- Criação de pedidos
- Acompanhamento de status
- Integração com estoque
- Integração com financeiro

### 5. Home (Dashboard)
**Responsabilidade**: Centralização e visão geral do sistema

**Funcionalidades**:
- Cards interativos para cada módulo
- Indicadores rápidos (quick stats)
- Painel de notificações
- Navegação centralizada
- Busca global

## Fluxo de Dados

```
[Frontend React] <--HTTP/REST--> [Django API] <--> [MongoDB]
```

1. Frontend faz requisição HTTP para API Django
2. Django processa a requisição via views/viewsets
3. Django ORM (Djongo) interage com MongoDB
4. Resposta é serializada e retornada ao frontend
5. Frontend atualiza a UI com os dados

## Segurança

### Autenticação
- Token-based authentication via Django REST Framework
- Tokens armazenados de forma segura no frontend

### Autorização
- Permissões baseadas em roles/grupos Django
- Endpoints protegidos por decoradores de autenticação

### CORS
- Configurado via django-cors-headers
- Origins permitidas configuráveis via variáveis de ambiente

## Escalabilidade

### Frontend
- Code splitting via Vite
- Lazy loading de componentes
- Otimização de bundle

### Backend
- MongoDB permite escalabilidade horizontal
- Cache pode ser implementado via Redis
- API RESTful stateless

## Manutenibilidade

### Frontend
- Componentes reutilizáveis
- Separação de concerns (components/pages)
- Tailwind CSS para consistência visual

### Backend
- Apps Django modulares
- Separação de responsabilidades
- API versionada

## Deploy

### Frontend
- Build: `npm run build`
- Servir arquivos estáticos via Nginx/Apache
- CDN para assets

### Backend
- Gunicorn/uWSGI como WSGI server
- Nginx como reverse proxy
- MongoDB em cluster para produção
