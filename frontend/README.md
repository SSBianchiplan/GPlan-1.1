# GPlan Frontend

Frontend do sistema GPlan desenvolvido com React, Vite e Tailwind CSS.

## Tecnologias

- **React 18.2** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **Chart.js** - Biblioteca de gráficos
- **Lucide React** - Ícones

## Estrutura

```
frontend/
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── Layout.jsx       # Layout principal com sidebar
│   │   └── PrivateRoute.jsx # Proteção de rotas
│   │
│   ├── contexts/            # Contextos React
│   │   └── AuthContext.jsx  # Contexto de autenticação
│   │
│   ├── pages/               # Páginas da aplicação
│   │   ├── Login.jsx        # Página de login
│   │   ├── Dashboard.jsx    # Dashboard com gráficos
│   │   ├── ProductionPlanning.jsx  # Planejamento de produção
│   │   └── InventoryControl.jsx    # Controle de estoque
│   │
│   ├── services/            # Serviços e API
│   │   └── api.js           # Configuração do Axios
│   │
│   ├── utils/               # Utilitários
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Ponto de entrada
│   └── index.css            # Estilos globais
│
├── public/                  # Arquivos públicos
├── index.html               # HTML base
├── vite.config.js           # Configuração do Vite
├── tailwind.config.js       # Configuração do Tailwind
├── postcss.config.js        # Configuração do PostCSS
└── package.json             # Dependências e scripts
```

## Instalação

```bash
npm install
```

## Scripts

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Preview do build de produção
npm run lint     # Executa linting
```

## Componentes Principais

### Layout
Layout responsivo com sidebar lateral e top bar. Inclui:
- Menu de navegação
- Informações do usuário
- Botão de logout
- Suporte a mobile com menu hamburguer

### AuthContext
Gerenciamento de estado de autenticação:
- Login/Logout
- Armazenamento de tokens
- Refresh automático de tokens
- Proteção de rotas

### PrivateRoute
Componente para proteger rotas que requerem autenticação.

## Páginas

### Login
- Formulário de login
- Validação de credenciais
- Redirecionamento após login

### Dashboard
- Visão geral do sistema
- Cards com estatísticas
- Gráficos interativos:
  - Produção planejada vs realizada
  - Distribuição de estoque
  - Receita vs despesa

### Production Planning
- Listagem de planos de produção
- CRUD completo
- Filtros por status e prioridade
- Modal para criação/edição

### Inventory Control
- Tabela de produtos
- Indicadores de estoque baixo
- CRUD completo
- Modal para criação/edição

## Autenticação

O sistema usa JWT (JSON Web Tokens) armazenados no localStorage:

```javascript
// Login
const response = await api.post('/auth/token/', { username, password })
localStorage.setItem('token', response.data.access)

// Request com token
api.defaults.headers.common['Authorization'] = `Bearer ${token}`

// Refresh automático
// Implementado no interceptor do Axios
```

## Estilização

### Tailwind CSS

O projeto usa Tailwind CSS com configuração customizada:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        // Paleta de cores customizada
      },
    },
  },
}
```

### Classes Utilitárias Comuns

```jsx
// Cards
<div className="bg-white rounded-lg shadow p-6">

// Botões primários
<button className="bg-primary-600 text-white rounded-lg hover:bg-primary-700">

// Inputs
<input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500">

// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## API Integration

### Service Layer

```javascript
// src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

// Request interceptor para adicionar token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor para refresh de token
api.interceptors.response.use(
  response => response,
  async error => {
    // Lógica de refresh de token
  }
)
```

### Uso nos Componentes

```javascript
import api from '../services/api'

// GET
const response = await api.get('/planning/production/')
setData(response.data)

// POST
await api.post('/planning/production/', formData)

// PUT
await api.put(`/planning/production/${id}/`, formData)

// DELETE
await api.delete(`/planning/production/${id}/`)
```

## Gráficos

### Chart.js

```javascript
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  // ... outros componentes
} from 'chart.js'

// Registrar componentes
ChartJS.register(CategoryScale, LinearScale, ...)

// Usar no componente
<Line data={chartData} options={chartOptions} />
```

## Responsividade

O sistema é totalmente responsivo:

- Mobile first design
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Menu hamburguer em mobile
- Tabelas com scroll horizontal
- Grid adaptativo

## Build para Produção

```bash
npm run build
```

Gera os arquivos otimizados na pasta `dist/`:
- HTML, CSS e JS minificados
- Assets otimizados
- Tree-shaking aplicado
- Code splitting

## Deploy

### Nginx

```nginx
server {
  listen 80;
  server_name yourdomain.com;
  root /path/to/dist;
  
  location / {
    try_files $uri $uri/ /index.html;
  }
  
  location /api {
    proxy_pass http://backend:8000;
  }
}
```

### Variables de Ambiente

Configure o proxy do Vite para apontar para o backend de produção:

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.yourdomain.com',
        changeOrigin: true,
      }
    }
  }
})
```

## Melhorias Futuras

- [ ] Testes unitários (Jest + React Testing Library)
- [ ] Testes E2E (Playwright/Cypress)
- [ ] Storybook para componentes
- [ ] PWA support
- [ ] Dark mode
- [ ] Internacionalização (i18n)
- [ ] Animações com Framer Motion
- [ ] Acessibilidade (WCAG)
