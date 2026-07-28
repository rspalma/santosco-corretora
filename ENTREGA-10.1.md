# Entrega Santos Co. Premium 10.1

## O que mudou

- Homepage reorganizada para vender pela necessidade do cliente
- Funil de cotação no topo para pessoa e família, profissional, empresa ou viagem
- Mensagem personalizada enviada ao WhatsApp sem armazenar dados no site
- Área específica para profissionais e empresas
- Botão de cotação em cada card de seguro
- Navegação mais comercial
- SEO ampliado com metadata, JSON-LD, sitemap e verificações do Google/Bing
- Integrações preparadas para GTM, GA4, Meta Pixel e Microsoft Clarity
- Consentimento de cookies antes do carregamento das ferramentas opcionais
- Política de Privacidade atualizada
- Node.js fixado em 22 e pnpm configurado

## Antes de apresentar ao cliente

1. Troque a logo provisória pelos arquivos oficiais em `public/brand`.
2. Confirme telefone, e-mail, CNPJ, Instagram e produtos comercializados.
3. Copie `.env.example` para `.env.local` e preencha somente os IDs utilizados.
4. Execute:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm dev
```

5. Teste o funil no celular e confirme o texto aberto no WhatsApp.
6. Publique primeiro em uma URL de homologação da Vercel.

## Observação de validação

A sintaxe e os tipos internos dos arquivos foram verificados nesta entrega. O ambiente de edição não conseguiu acessar o registro npm, portanto o `pnpm install`, o build completo e o teste visual devem ser executados no computador do projeto ou na Vercel antes da publicação definitiva.
