# Guia de Contribuição - GPlan

Obrigado por considerar contribuir com o GPlan! Este documento fornece diretrizes para contribuições.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)

## Código de Conduta

Este projeto segue um código de conduta. Ao participar, você concorda em manter um ambiente respeitoso e profissional.

## Como Contribuir

Há várias formas de contribuir:

1. **Reportar bugs**: Encontrou um problema? Abra uma issue
2. **Sugerir funcionalidades**: Tem uma ideia? Compartilhe conosco
3. **Corrigir bugs**: Escolha uma issue e envie um PR
4. **Implementar funcionalidades**: Desenvolva novas features
5. **Melhorar documentação**: Sempre há espaço para melhoria
6. **Revisar código**: Ajude a revisar PRs de outros

## Configuração do Ambiente

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- Git

### Setup

1. Fork o repositório
2. Clone seu fork:
```bash
git clone https://github.com/seu-usuario/GPlan-1.1.git
cd GPlan-1.1
```

3. Adicione o repositório original como upstream:
```bash
git remote add upstream https://github.com/SSBianchiplan/GPlan-1.1.git
```

4. Instale as dependências:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

5. Configure o ambiente:
```bash
cd backend
cp .env.example .env
# Edite .env com suas configurações
```

6. Execute as migrações:
```bash
cd backend
npx prisma migrate dev
npx prisma generate
npm run prisma:seed
```

7. Inicie os servidores:
```bash
# Backend (terminal 1)
cd backend
npm run dev

# Frontend (terminal 2)
cd frontend
npm run dev
```

## Padrões de Código

### TypeScript

- Use TypeScript em todo o código
- Evite `any`, prefira tipos específicos
- Use interfaces para objetos complexos
- Documente funções públicas

### Estilo de Código

#### Backend

```typescript
// ✅ Bom
export class ProductController {
  async getProducts(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const products = await prisma.product.findMany();
      return res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

// ❌ Ruim
export class ProductController {
  async getProducts(req: any, res: any) {
    const products = await prisma.product.findMany();
    res.json(products);
  }
}
```

#### Frontend

```typescript
// ✅ Bom
interface Product {
  id: string;
  name: string;
  code: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    loadProducts();
  }, []);
  
  return <div>...</div>;
};

// ❌ Ruim
const ProductList = () => {
  const [products, setProducts] = useState([]);
  // ...
};
```

### Commits

Use conventional commits:

```
feat: add new feature
fix: correct bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: update dependencies
```

Exemplos:
```bash
git commit -m "feat: add product search functionality"
git commit -m "fix: correct stock calculation error"
git commit -m "docs: update API documentation"
```

### Branches

- `main`: Código estável em produção
- `develop`: Desenvolvimento principal
- `feature/nome-da-feature`: Nova funcionalidade
- `fix/nome-do-bug`: Correção de bug
- `docs/assunto`: Documentação

Exemplo:
```bash
git checkout -b feature/add-product-categories
```

## Processo de Pull Request

1. **Crie uma branch** para sua contribuição
2. **Faça suas alterações** seguindo os padrões
3. **Teste suas mudanças**:
```bash
# Backend
cd backend
npm run build
npm test

# Frontend
cd frontend
npm run build
npm run lint
```

4. **Commit suas mudanças** usando conventional commits
5. **Push para seu fork**:
```bash
git push origin feature/sua-feature
```

6. **Abra um Pull Request** no GitHub
7. **Descreva suas mudanças**:
   - O que foi alterado?
   - Por que foi alterado?
   - Como testar?
   - Screenshots (se aplicável)

### Template de PR

```markdown
## Descrição
Breve descrição das mudanças

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Como Testar
1. Passo 1
2. Passo 2
3. Resultado esperado

## Screenshots
(se aplicável)

## Checklist
- [ ] Código segue os padrões do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Build passa sem erros
```

## Reportando Bugs

Use o template de issue para bugs:

**Título:** Descrição curta do bug

**Descrição:**
- O que aconteceu?
- O que deveria acontecer?
- Como reproduzir?

**Ambiente:**
- SO: [Windows/macOS/Linux]
- Node.js: [versão]
- Navegador: [se aplicável]

**Screenshots:** Se possível

**Logs de Erro:** Se disponível

## Sugerindo Melhorias

Para sugerir novas funcionalidades:

1. **Verifique** se já não existe uma issue similar
2. **Abra uma issue** com o template de feature request
3. **Descreva** a funcionalidade em detalhes
4. **Explique** o caso de uso
5. **Aguarde** feedback da comunidade

## Áreas de Contribuição

### Backend

- Controllers
- Routes
- Middleware
- Database models
- API endpoints
- Testes

### Frontend

- Componentes React
- Páginas
- Estado global
- Estilização
- Testes

### Documentação

- README
- Guias de instalação
- Documentação de API
- Guia do usuário
- Exemplos de código

### Infraestrutura

- Docker
- CI/CD
- Scripts de deploy
- Monitoramento

## Diretrizes de Revisão

Ao revisar PRs:

1. Seja construtivo e respeitoso
2. Foque no código, não na pessoa
3. Sugira melhorias específicas
4. Aprove quando estiver satisfeito
5. Peça mudanças se necessário

## Dúvidas?

- Abra uma issue com a tag `question`
- Entre em contato via email
- Consulte a documentação

## Agradecimentos

Obrigado por contribuir com o GPlan! Suas contribuições ajudam a tornar este projeto melhor para todos.

---

**Happy Coding!** 🚀
