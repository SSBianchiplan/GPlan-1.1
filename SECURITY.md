# Política de Segurança

## Versões Suportadas

Atualmente, oferecemos suporte de segurança para as seguintes versões:

| Versão | Suporte         |
| ------ | --------------- |
| 1.1.x  | :white_check_mark: |
| < 1.1  | :x:             |

## Recursos de Segurança Implementados

### Autenticação e Autorização

- **JWT (JSON Web Tokens)**: Tokens seguros com expiração configurável
- **Bcrypt**: Hash de senhas com salt rounds = 10
- **Role-Based Access Control (RBAC)**: 4 níveis de permissão
  - ADMIN: Acesso total
  - MANAGER: Gerenciamento de operações
  - USER: Operações diárias
  - VIEWER: Apenas visualização

### Rate Limiting

Proteção contra ataques de força bruta e DDoS:

- **Autenticação**: 5 tentativas de login a cada 15 minutos por IP
- **Operações de Criação**: 10 operações por minuto por IP
- **API Geral**: 100 requisições a cada 15 minutos por IP

### Proteção de Headers HTTP

Usando Helmet.js para configurar headers de segurança:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
- X-XSS-Protection

### CORS

Cross-Origin Resource Sharing configurado para permitir apenas origens autorizadas.

### Validação de Entrada

- Validação de tipos com TypeScript
- Sanitização de dados de entrada
- Express-validator para validação de requests

### Banco de Dados

- Prisma ORM para prevenção de SQL Injection
- Conexões seguras via SSL/TLS (produção)
- Credenciais armazenadas em variáveis de ambiente

## Reportando Vulnerabilidades

### Canais de Comunicação

Se você descobrir uma vulnerabilidade de segurança, por favor:

1. **NÃO** abra uma issue pública
2. Envie um email para: security@gplan.com (ou o email do mantenedor)
3. Inclua:
   - Descrição detalhada da vulnerabilidade
   - Passos para reproduzir
   - Possível impacto
   - Sugestões de correção (se possível)

### Tempo de Resposta

- Confirmação de recebimento: 48 horas
- Avaliação inicial: 7 dias
- Correção: Depende da severidade
  - Crítica: 24-48 horas
  - Alta: 7 dias
  - Média: 30 dias
  - Baixa: 90 dias

### Processo de Divulgação

1. Vulnerabilidade reportada
2. Confirmação e avaliação
3. Desenvolvimento da correção
4. Testes internos
5. Release da correção
6. Divulgação pública (após correção)

## Boas Práticas de Uso

### Para Administradores

1. **Senhas Fortes**:
   - Mínimo 12 caracteres
   - Combinação de letras, números e símbolos
   - Não reutilizar senhas

2. **JWT Secret**:
   - Use uma chave forte e aleatória
   - Mínimo 32 caracteres
   - Nunca commite em repositórios
   - Rotacione periodicamente

3. **Variáveis de Ambiente**:
   - Nunca exponha .env em produção
   - Use serviços de secrets management em cloud
   - Rotacione credenciais regularmente

4. **Banco de Dados**:
   - Use conexões SSL/TLS
   - Mantenha backups regulares
   - Limite permissões do usuário do DB
   - Monitore queries suspeitas

5. **Monitoramento**:
   - Configure logs de acesso
   - Monitore tentativas de login falhas
   - Alerte para atividades suspeitas
   - Revise logs regularmente

6. **Updates**:
   - Mantenha dependências atualizadas
   - Aplique patches de segurança rapidamente
   - Teste atualizações em staging primeiro

### Para Desenvolvedores

1. **Código Seguro**:
   - Valide todas as entradas
   - Sanitize outputs
   - Use prepared statements
   - Evite eval() e similares

2. **Dependências**:
   - Audite regularmente: `npm audit`
   - Use versões fixas em produção
   - Revise dependências antes de adicionar

3. **Tokens e Secrets**:
   - Nunca hardcode credenciais
   - Use variáveis de ambiente
   - Não logue informações sensíveis

4. **HTTPS**:
   - Use HTTPS em produção
   - Configure certificados SSL válidos
   - Force HTTPS redirect

## Checklist de Segurança para Deployment

- [ ] JWT_SECRET gerado com 32+ caracteres aleatórios
- [ ] Senhas de banco de dados fortes
- [ ] CORS configurado para domínios específicos
- [ ] HTTPS habilitado
- [ ] Rate limiting ativo
- [ ] Logs configurados
- [ ] Backups automáticos configurados
- [ ] Monitoramento ativo
- [ ] Variáveis de ambiente seguras
- [ ] Dependências atualizadas
- [ ] Testes de segurança realizados

## Ferramentas de Segurança

### Análise de Código

```bash
# Auditoria de dependências
npm audit

# Correção automática de vulnerabilidades
npm audit fix

# CodeQL (GitHub)
# Configurado via GitHub Actions
```

### Testes de Penetração

Recomendamos realizar testes de penetração periodicamente:
- OWASP ZAP
- Burp Suite
- Nmap
- SQLMap (para testes de SQL injection)

### Monitoramento em Produção

- Sentry: Monitoramento de erros
- New Relic: Performance monitoring
- LogRocket: Session replay
- Datadog: Infrastructure monitoring

## Conformidade

Este sistema foi desenvolvido considerando:
- OWASP Top 10
- GDPR (para dados pessoais)
- LGPD (Lei Geral de Proteção de Dados - Brasil)

## Recursos Adicionais

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [React Security Best Practices](https://reactjs.org/docs/security.html)

## Contato

Para questões de segurança não urgentes:
- Email: security@gplan.com
- GitHub Security Advisory: Use o recurso de Security Advisory do GitHub

---

**Última atualização:** 2024-10-31
