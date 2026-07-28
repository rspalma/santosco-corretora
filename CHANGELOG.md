## 10.4.2 — Correção do envio no Vercel

- envio do formulário alterado para o endpoint AJAX oficial do FormSubmit diretamente pelo navegador;
- compatibilidade mantida entre `localhost`, domínios temporários do Vercel e domínio definitivo;
- resposta de primeira ativação agora é exibida como orientação, sem falso erro vermelho;
- destino de teste mantido em `rspalmaetec@gmail.com`.

# Changelog

## 10.3.0 — 2026-07-20

- Logo da Santos Co. aplicada no cabeçalho e no rodapé com proporção preservada
- Arquivos específicos preparados para os fundos do header e do footer
- Componente `BrandLogo` reescrito para utilizar a identidade visual correta
- Logo dos dados estruturados atualizada para o arquivo real da marca
- Imagem Open Graph atualizada com a identidade da Santos Co.
- Botões principais do hero padronizados com a mesma altura e largura
- Texto, ícones e espaçamento dos CTAs ajustados para manter proporção em desktop e celular

## 10.2.0 — 2026-07-20

- Hero reescrito com proposta de valor mais direta e comercial
- CTA principal alterado para simulação gratuita e sem compromisso
- Atalho de atendimento imediato pelo WhatsApp acima da dobra
- Seletor rápido para Auto, Vida, Empresa, Responsabilidade Civil e Viagem
- Captura de lead na página com nome, WhatsApp, interesse e consentimento
- Segunda opção de conversão pelo WhatsApp com mensagem personalizada
- Integração padrão com FormSubmit e endpoint substituível por variável de ambiente
- Faixa de seguradoras reconhecidas com aviso de disponibilidade por análise de risco
- Seção de autoridade e avaliações do Google sem números fictícios
- CTAs profissionais, empresariais, institucionais e finais revisados
- Botão flutuante do WhatsApp com indicador por horário comercial
- Política de Privacidade, Termos, CSP e documentação atualizados

## 10.1.0 — 2026-07-20

- Homepage reorganizada por necessidades em vez de apenas por produtos
- Funil de cotação com perfil, interesse, nome e cidade opcional
- Mensagem personalizada aberta diretamente no WhatsApp, sem armazenamento no site
- Segmentos específicos para pessoa e família, profissionais, empresas e viagens
- Botões de cotação adicionados aos cards de produtos
- Seção comercial dedicada a riscos profissionais e empresariais
- Metadata, dados estruturados e verificações de mecanismos de busca ampliados para SEO
- Google Tag Manager, Google Analytics, Meta Pixel e Microsoft Clarity preparados por variáveis de ambiente
- Banner de consentimento para ferramentas opcionais de marketing
- Content Security Policy adaptada às integrações ativadas
- Navegação interna do CTA corrigida para não abrir nova aba
- Node.js fixado na linha 22 e pnpm definido como gerenciador do projeto
- Política de Privacidade atualizada

## 10.0.0 — 2026-07-14

- Refatoração completa em componentes compartilhados
- Página geral e páginas individuais de seguros
- Página Viagens com Carta Verde, Seguro Viagem e Kit de Segurança
- Remoção de depoimentos fictícios
- SEO com Open Graph, JSON-LD, sitemap e redirecionamento legado
- Vídeo institucional carregado sob demanda
- Melhorias de acessibilidade e segurança
- Build estático para Apache/cPanel e exemplo para Nginx
