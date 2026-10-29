# LeadHunter AI

Primeira versão demonstrativa da plataforma SaaS de prospecção de clientes.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Publicação

Importe o repositório na Vercel com o preset **Next.js** e faça o deploy.

## Limitações atuais

- Dados de demonstração e cadastros temporários (perdidos ao atualizar a página).
- Sem autenticação, banco de dados, pagamentos, consulta ao Google Maps ou geração real por IA.
- Não use para armazenar informações confidenciais ou dados reais de clientes até a implementação da autenticação e das políticas de segurança.

## Próximas etapas

Supabase Auth e banco de dados com políticas RLS, API de busca de empresas, geração de sites com IA, cobrança e créditos com validação no servidor.
