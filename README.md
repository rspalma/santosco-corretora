# Santos Co. Premium 10.3

Site institucional e comercial da Santos Co. Corretora de Seguros, desenvolvido com Next.js 16, React 19, TypeScript e Tailwind CSS 4.

## Principais entregas

- Home premium organizada por necessidades do cliente
- Logo oficial aplicada no cabeçalho, rodapé, dados estruturados e imagem de compartilhamento
- Funil de cotação com dupla conversão: captura de lead na página e atendimento imediato pelo WhatsApp
- Jornada específica para pessoa e família, profissionais, empresas e viagens
- Página central de seguros e páginas individuais de produtos
- Página Viagens com Seguro Viagem, Carta Verde e Kit de Segurança
- Botões de cotação em cada produto
- SEO técnico, Open Graph, JSON-LD, sitemap e robots
- Integrações opcionais com Google Tag Manager, Google Analytics, Meta Pixel e Microsoft Clarity
- Consentimento de cookies antes do carregamento das ferramentas opcionais
- Faixa de seguradoras, prova social configurável e vídeo institucional com carregamento sob demanda
- Política de Privacidade, Termos de Uso, 404 e tratamento de erros
- Cabeçalhos de segurança e Content Security Policy compatível com as integrações configuradas
- Exportação para Vercel/Node.js ou hospedagem estática Apache/cPanel

## Requisitos

- Node.js 22
- pnpm 10

## Instalação rápida no Windows

Depois de extrair o ZIP, execute `INSTALAR_TUDO.bat`. O instalador verifica Git, instala Node.js 22 e pnpm 10.14.0 quando necessário, cria o `.env.local` e instala as dependências.

Nos próximos acessos, use `INICIAR_SITE.bat`. Para validar lint, TypeScript, testes e build, use `VERIFICAR_PROJETO.bat`.

## Desenvolvimento

```bash
corepack enable
pnpm install
pnpm dev
```

Abra `http://localhost:3000`.

## Verificação completa

```bash
pnpm check
pnpm security:audit
```

`pnpm check` executa lint, TypeScript, testes e build de produção.

## Produção em Next.js/Vercel

```bash
pnpm build
pnpm start
```

Leia `DEPLOYMENT.md` antes de trocar domínio, DNS ou hospedagem.

## Hospedagem tradicional/cPanel

```bash
pnpm build:static
```

Envie o conteúdo da pasta `out` para o `public_html`. A exportação inclui um `.htaccess` para Apache.

## Personalização centralizada

Edite `lib/site-config.ts` para alterar nome, domínio, CNPJ, e-mail, WhatsApp, Instagram e o portal Carta Verde.

As mensagens do WhatsApp ficam em `lib/whatsapp.ts`, nos dados de cada produto e no funil em `components/forms/quote-funnel.tsx`.

## SEO e integrações

Copie `.env.example` para `.env.local` e preencha somente as ferramentas que serão utilizadas:

```env
NEXT_PUBLIC_SITE_URL=https://santoscocorretora.com.br
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_BING_SITE_VERIFICATION=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_CLARITY_ID=
NEXT_PUBLIC_LEAD_FORM_ENDPOINT=https://formsubmit.co/ajax/rspalmaetec@gmail.com
LEAD_ALLOWED_ORIGINS=
NEXT_PUBLIC_GOOGLE_RATING=
NEXT_PUBLIC_GOOGLE_REVIEW_COUNT=
NEXT_PUBLIC_GOOGLE_REVIEWS_URL=
```

Quando alguma ferramenta opcional está configurada, o site exibe o aviso de consentimento e só carrega os scripts após a aceitação.

O formulário usa o endpoint AJAX oficial do FormSubmit diretamente no navegador. Assim, o mesmo código funciona no `localhost`, nos endereços temporários do Vercel, em exportação estática e no domínio final. O destino padrão de teste é `rspalmaetec@gmail.com`; para trocar futuramente, altere `NEXT_PUBLIC_LEAD_FORM_ENDPOINT`. No primeiro envio, confirme o e-mail de ativação recebido do FormSubmit.

Evite configurar Google Analytics diretamente e também dentro do Google Tag Manager ao mesmo tempo, para não duplicar eventos.

## Identidade visual

Os arquivos usados pelo site estão organizados assim:

```text
public/brand/logo-santos-co-header.png
public/brand/logo-santos-co-footer.png
public/brand/logo-santos-co-transparente.png
public/images/og-santos-co.png
```

O componente central da marca fica em `components/ui/brand-logo.tsx`. O cabeçalho e o rodapé usam versões preparadas para os respectivos fundos, evitando distorção, bordas ou retângulos visíveis.

## Conteúdo que exige validação do cliente

Antes da publicação, confirme diretamente com a Santos Co.:

- telefone e e-mail oficiais
- textos e modalidades comercializadas
- orientações da página Viagens
- política de privacidade e canal LGPD
- seguradoras efetivamente operadas e autorização para uso das marcas
- nota, quantidade e URL das avaliações reais do Google
- IDs de analytics e pixels
- domínio canônico com ou sem `www`

## Estrutura

```text
app/                     páginas, metadata, sitemap e arquivos especiais
components/forms/        funil de cotação
components/integrations/ consentimento e ferramentas de marketing
components/layout/       header, menu e footer
components/sections/     seções compartilhadas
components/ui/           componentes de interface
data/                     produtos e navegação
lib/                      configurações e utilitários
deployment/               exemplos para Apache e Nginx
tests/                    testes unitários
```
