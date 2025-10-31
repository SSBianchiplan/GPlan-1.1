# GPlan - Sistema de Planejamento Empresarial

Sistema integrado de planejamento e gestão empresarial com módulos para planejamento financeiro, controle de estoque, auditorias e gestão de pedidos.

## 🚀 Funcionalidades

### ✅ Implementado

#### Tela Principal (Home)
- Dashboard centralizado com acesso a todos os módulos
- Indicadores rápidos (receita, pedidos, produtos, usuários)
- Cards interativos para navegação entre módulos
- Painel de notificações em tempo real
- Busca global para acesso rápido a funcionalidades

#### Módulo de Planejamento Financeiro (Módulo 2)
- 📊 Gráficos interativos (linha e barra) com Recharts
- 📈 Análise de dados financeiros mensais (planejado vs realizado)
- 🎯 Comparação de metas financeiras com indicadores visuais
- 💰 KPIs financeiros (receita total, taxa de atingimento, variação)
- 📄 Exportação de relatórios em PDF
- 📑 Exportação de relatórios em Excel
- 🎨 Interface moderna e responsiva com Tailwind CSS

#### Navegação
- Barra de navegação superior com acesso a todos os módulos
- Sistema de rotas com React Router
- Busca global integrada
- Sistema de notificações

### 🚧 Em Desenvolvimento

- **Controle de Estoque**: Gestão de produtos e inventário
- **Auditorias**: Sistema de auditorias e conformidade
- **Gestão de Pedidos**: Compras e vendas
- **Backend Django**: API RESTful com Djongo (Django + MongoDB)
- **Autenticação**: Sistema de login e autorização

## 🛠️ Stack Tecnológico

### Frontend
- **React 18**: Framework JavaScript
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Framework CSS utility-first
- **React Router**: Gerenciamento de rotas
- **Recharts**: Gráficos interativos
- **jsPDF**: Exportação de PDF
- **xlsx**: Exportação de Excel
- **Lucide React**: Ícones modernos
- **Axios**: Cliente HTTP

### Backend (Planejado)
- **Django 4.2**: Framework Python web
- **Djongo**: Conector Django para MongoDB
- **Django REST Framework**: API RESTful
- **MongoDB**: Banco de dados NoSQL

## 📦 Instalação

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

### Backend (Em desenvolvimento)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou venv\Scripts\activate no Windows
pip install -r requirements.txt
python manage.py runserver
```

## 🏗️ Estrutura do Projeto

```
GPlan-1.1/
├── frontend/          # Aplicação React
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas da aplicação
│   │   └── App.jsx        # Componente principal
│   └── package.json
│
├── backend/           # API Django (em desenvolvimento)
│   ├── requirements.txt
│   └── README.md
│
├── docs/              # Documentação
│   ├── ARCHITECTURE.md      # Arquitetura do sistema
│   ├── USER_GUIDE.md        # Guia do usuário
│   └── API_DOCUMENTATION.md # Documentação da API
│
└── README.md
```

## 📸 Screenshots

### Tela Principal (Home)
![Home](https://github.com/user-attachments/assets/00eebd38-234a-4a53-8c40-105dc0daaefb)

A tela principal oferece uma visão geral do sistema com:
- Indicadores de receita, pedidos, produtos e usuários
- Cards de acesso rápido aos módulos
- Painel de notificações recentes

### Planejamento Financeiro
![Financial Planning](https://github.com/user-attachments/assets/f774be67-5a6b-4df9-afa1-804c00f44e2d)

O módulo de planejamento financeiro inclui:
- Gráficos interativos de evolução mensal
- Comparação planejado vs realizado
- Análise de metas com indicadores visuais
- Exportação de relatórios em PDF e Excel

## 🎯 Módulos

### 1. Planejamento Financeiro ✅
- Análise financeira completa
- Gráficos interativos
- Comparação de metas
- Exportação de relatórios

### 2. Controle de Estoque 🚧
- Gestão de produtos
- Controle de movimentação
- Alertas de estoque baixo

### 3. Auditorias 🚧
- Registro de auditorias
- Conformidade
- Relatórios

### 4. Gestão de Pedidos 🚧
- Compras e vendas
- Integração com estoque
- Integração com financeiro

## 📚 Documentação

- [Arquitetura do Sistema](docs/ARCHITECTURE.md)
- [Guia do Usuário](docs/USER_GUIDE.md)
- [Documentação da API](docs/API_DOCUMENTATION.md)
- [Backend README](backend/README.md)

## 🔒 Segurança

- Autenticação via token (planejado)
- CORS configurável
- Validação de dados no frontend e backend
- Headers de segurança

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👥 Autores

Sistema desenvolvido para gestão empresarial integrada.

## 🆘 Suporte

Para suporte, abra uma issue no repositório ou consulte a documentação. 
