# Publicação e migração

## Opção recomendada: Vercel

1. Crie ou atualize o repositório privado no GitHub.
2. Envie o projeto com `pnpm-lock.yaml` e `package.json`.
3. Importe o repositório na Vercel.
4. Confirme Node.js 22 e o comando de instalação `pnpm install --frozen-lockfile`.
5. Cadastre as variáveis de ambiente necessárias, começando por `NEXT_PUBLIC_SITE_URL`.
6. Publique primeiro em um endereço de homologação.
7. Valide todas as páginas, os dois caminhos do funil de cotação e os links externos.
8. Adicione o domínio oficial e só então faça a troca de DNS.
9. Preserve os registros MX, SPF, DKIM e DMARC dos e-mails.

## Variáveis de ambiente

```env
NEXT_PUBLIC_SITE_URL=https://santoscocorretora.com.br
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_BING_SITE_VERIFICATION=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_CLARITY_ID=
LEAD_DESTINATION_EMAIL=rspalmaetec@gmail.com
LEAD_ALLOWED_ORIGINS=
NEXT_PUBLIC_GOOGLE_RATING=
NEXT_PUBLIC_GOOGLE_REVIEW_COUNT=
NEXT_PUBLIC_GOOGLE_REVIEWS_URL=
```

As ferramentas de marketing são opcionais. Quando configuradas, elas só são carregadas após o consentimento do visitante.

O formulário usa a rota `/api/lead` e encaminha o pedido pelo FormSubmit. O endereço de teste é `rspalmaetec@gmail.com`. Faça um envio no endereço publicado e confirme a ativação recebida por e-mail. A rota reconhece automaticamente `localhost`, URLs `*.vercel.app` e o domínio acessado. A exportação estática não inclui a API e deve usar uma integração externa própria.

Não configure o mesmo Google Analytics diretamente e também pelo Google Tag Manager, pois isso pode duplicar pageviews e conversões.

## VPS ou hospedagem com Node.js

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm start
```

Coloque a aplicação atrás de Nginx, Caddy ou proxy equivalente, com HTTPS e gerenciamento de processo. Um exemplo parcial de Nginx está em `deployment/nginx`.

## cPanel/public_html

Gere uma exportação estática:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm build:static
```

O conteúdo final estará em `out/`. Faça backup do `public_html` atual antes de enviar o conteúdo.

### Limitações da exportação estática

- Cabeçalhos e redirecionamentos do `next.config.mjs` não são executados por um servidor Next.js.
- O script copia um `.htaccess` para `out`, mas o servidor precisa utilizar Apache e permitir as diretivas.
- Em Nginx, use a configuração do servidor em vez do `.htaccess`.
- O funil oferece WhatsApp imediato e envio assíncrono por um serviço externo de formulários.
- O envio padrão depende da ativação do FormSubmit e de conectividade com o domínio permitido na CSP.
- CRM próprio, banco de leads ou autenticação exigem API e infraestrutura específicas.

## Checklist de migração sem indisponibilidade

1. Identificar registrador, DNS, hospedagem atual, WordPress e Cloudflare.
2. Exportar arquivos e banco do site atual.
3. Registrar toda a zona DNS antes da mudança.
4. Confirmar os e-mails corporativos e registros MX.
5. Reduzir o TTL antes da troca, quando possível.
6. Publicar o novo site em homologação.
7. Testar desktop, celular, WhatsApp, Instagram, vídeo e Carta Verde.
8. Testar o consentimento com todas as integrações configuradas.
9. Programar a troca em horário de baixo acesso.
10. Manter o site antigo disponível para rollback.
11. Monitorar domínio, HTTPS, redirecionamentos, métricas e e-mails após a troca.

## Teste pós-publicação

```bash
curl -I https://santoscocorretora.com.br
curl -I https://santoscocorretora.com.br/viagem
curl -I https://santoscocorretora.com.br/viagens
```

Confirme status 200 no site, redirecionamento permanente de `/viagem`, cabeçalhos de segurança, abertura do WhatsApp e registro dos eventos nas ferramentas habilitadas.
