# Relatório de qualidade — Premium 10.3

## Alterações revisadas nesta versão

- Logo real aplicada no cabeçalho, rodapé, JSON-LD e Open Graph
- Proporção da marca preservada em desktop e celular
- CTAs principais padronizados com a mesma largura e altura

- Hero e CTAs revisados para clareza e conversão
- Funil com dupla opção: captura assíncrona e WhatsApp imediato
- Validação mínima de nome, telefone e consentimento
- Rastreamento de canal separado para analytics e pixels
- Prova social configurável sem nota, contagem ou depoimentos inventados
- Faixa de companhias com linguagem condicionada à disponibilidade e análise de risco
- Política de Privacidade e Termos atualizados para o processamento do formulário
- Content Security Policy atualizada para o endpoint padrão de leads
- Vídeo institucional preservado com `preload="none"`
- Todos os arquivos TypeScript/TSX foram transpilados localmente para validação sintática
- Imports internos com alias `@/` foram verificados e resolvidos

## Validação herdada da versão 10.0

Antes desta atualização, o projeto registrava aprovação em lint, TypeScript, testes, build de produção e exportação estática. Essa validação anterior não substitui a execução dos comandos na versão 10.3.

## Verificação obrigatória antes da publicação

Execute em um ambiente com acesso ao registro de pacotes:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm build:static
pnpm security:audit
```

Depois valide manualmente:

- homepage em desktop e celular
- seletor dos cinco tipos de proteção
- envio de lead e confirmação inicial do FormSubmit
- mensagem gerada no WhatsApp
- nota e link reais das avaliações do Google
- companhias efetivamente operadas e autorização de uso das marcas
- botão flutuante dentro e fora do horário configurado
- vídeo institucional
- banner de consentimento com e sem IDs configurados
- eventos de conversão nas ferramentas habilitadas
- sitemap, robots, redirecionamento `/viagem` e cabeçalhos de segurança

## Limite desta entrega

O ambiente usado para esta atualização não conseguiu baixar o pnpm e as dependências do registro npm. Por isso, lint, typecheck completo, testes, build e teste visual em navegador devem ser executados no computador do projeto ou na Vercel antes da publicação definitiva.
