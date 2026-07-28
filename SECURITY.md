# Segurança — Santos Co. Premium 10.3

Este projeto reduz a superfície de ataque porque não possui área administrativa, banco de dados próprio, autenticação nem processamento de pagamento. O formulário do hero encaminha apenas nome, telefone e interesse a um provedor externo configurado, enquanto os demais fluxos seguem para WhatsApp e para o portal especializado da Carta Verde.

## Controles implementados

- Content Security Policy
- HTTPS/HSTS em produção Next.js
- proteção contra clickjacking
- `nosniff` e política de referência restrita
- política de permissões do navegador
- isolamento de origem compatível com o projeto
- remoção do cabeçalho `X-Powered-By`
- links externos com `noopener noreferrer`
- ausência de segredos e credenciais no front-end
- versões reproduzíveis por `pnpm-lock.yaml`
- auditoria sem vulnerabilidades conhecidas no momento da entrega
- lint, TypeScript, testes e build automatizados
- Dependabot e workflow de qualidade
- `security.txt`

## Decisão sobre CSP

O site permanece majoritariamente estático e utiliza a CSP compatível com geração estática do Next.js. Uma CSP com nonce por requisição aumentaria a rigidez, mas obrigaria renderização dinâmica, reduziria cache e aumentaria a complexidade operacional. Como o site não armazena dados em banco próprio e o envio do formulário é restrito ao endpoint permitido, a estratégia atual equilibra segurança e desempenho.

## Antes de publicar

1. Confirme HTTPS no domínio oficial.
2. Ative MFA no registrador, hospedagem, GitHub e e-mail administrativo.
3. Faça backup dos arquivos, banco do site antigo e zona DNS.
4. Preserve os registros MX dos e-mails.
5. Execute `pnpm install --frozen-lockfile`, `pnpm check` e `pnpm security:audit`.
6. Revise links externos e o domínio exibido antes de inserir dados ou pagar.
7. Faça varredura no ambiente de homologação com ferramenta como OWASP ZAP.
8. Restrinja acessos administrativos pelo princípio do menor privilégio.
9. Atualize dependências de forma contínua e mantenha plano de rollback.
10. Revise a Política de Privacidade, o provedor de formulários e o período de retenção com o responsável da empresa.

## Relato responsável

Consulte `/.well-known/security.txt` no domínio publicado.

Nenhum sistema conectado à internet é invulnerável. Segurança depende também de domínio, DNS, hospedagem, credenciais, atualizações e monitoramento.
