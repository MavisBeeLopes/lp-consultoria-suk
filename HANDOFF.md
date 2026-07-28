# HANDOFF — Template de Landing Page (Lughy / DB1)

Use este projeto como **template** para novas campanhas. Quase tudo é reaproveitável;
só a copy/oferta/assets mudam.

## Já pronto (reutilizável)
- **Stack:** HTML + CSS + JS vanilla, sem framework/build. Deploy no **Vercel** (push no GitHub = deploy automático).
- **Design system Lughy** em `styles.css`: variáveis de cor, fonte Lexend, formas orgânicas e componentes prontos — header fixo, hero, cards de dores, pilares, FAQ em acordeão, marquee de logos, formulário e **thank you page** (`obrigado.html`).
- **Formulário → RD Station** via função serverless `api/rd-conversao.js` (API Key em env var, sem expor segredo). Redireciona para `obrigado.html?convertido=1`.
- **GTM** (`GTM-N384CG7L`) instalado nas duas páginas + evento `conversao_lead` no dataLayer disparando só na conversão real.
- **Regras de marca Lughy** e **método de exportar seções/elementos em PNG** (Chrome headless) — ver `README.md`.

## Muda a cada campanha
- Copy, headline, oferta, imagens (hero/foto), campos do formulário.
- `RD_CONVERSION_IDENTIFIER` e campos personalizados no RD.
- Novo repositório GitHub + novo projeto Vercel (ou nova rota).

## Como iniciar (gastando poucos tokens)
1. **Duplique** este projeto: copie a pasta OU clone o repo `github.com/MavisBeeLopes/lp-consultoria-suk` (dica: marcar como *template repository* no GitHub facilita).
2. Abra um **CHAT NOVO** (este está longo = caro por turno).
3. Cole o **prompt inicial** abaixo, ajustando os detalhes.

## Prompt inicial para o chat novo
> Vou criar uma nova landing page para a campanha **[NOME]**. Use como template o projeto
> em `C:\Users\maria.lopes\Claude\Projects\[NOVA-PASTA]` (copiei do template Lughy: mesma stack,
> design system, integração RD Station e GTM já prontos — leia `HANDOFF.md` e `README.md`).
> Mantenha a identidade Lughy e a estrutura. **O que muda:** oferta = [...]; copy/headline = [colar
> briefing ou texto]; campos do formulário = [...]; `RD_CONVERSION_IDENTIFIER` = [novo-id].
> **Não recrie o que já existe — copie o template e ajuste só o necessário.**

## Env vars no Vercel (RD Station)
`RD_API_KEY` (obrigatória), `RD_CONVERSION_IDENTIFIER`, `RD_CF_TIME_DEV`. Detalhes no `README.md`.
