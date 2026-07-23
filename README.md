# LP — Consultoria gratuita de IA com Cristiano Suk (Lughy)

Landing page estática de captação de leads para a consultoria gratuita de IA com Cristiano Suk, diretor da Lughy (software house do DB1 Group). Sem framework: apenas HTML, CSS e JavaScript vanilla + Google Fonts (Lexend).

## Rodar localmente

Na raiz do projeto, suba um servidor estático e abra no navegador:

```bash
python -m http.server
```

Depois acesse **http://localhost:8000**.

> Alternativas: `npx serve` ou a extensão Live Server do VS Code. Basta servir a pasta — não há build.

## Estrutura

```
index.html          Estrutura semântica (header, main, sections, footer)
styles.css          Variáveis CSS, paleta Lughy, responsivo mobile-first
script.js           Acordeão do FAQ, validação do form e smooth scroll do CTA
assets/
  logo-lughy-*.svg  Logos oficiais Lughy (off-white / preto / laranja)
  decor/            Forma orgânica (máscara SVG), assinatura DB1 Group, foto ilustrativa
  clients/          Logos de clientes (extraídos de lughy.com.br)
```

## Elementos de design (identidade Lughy)

- **Forma orgânica assinatura** (painel com dois "bumps"), recriada em SVG inline como chips dos pilares e como elemento decorativo atrás da foto do Suk e no bloco de reforço.
- **Foto do Cristiano Suk** em frame arredondado com badge e tag de nome; **diagrama de ecossistemas do DB1 Group** na seção institucional.
- **Imagem de fundo do hero** (`assets/decor/hero-bg.jpg`, do PPT comercial) — foto de desenvolvedor estilizada, com overlay em degradê que mantém a copy legível (contraste AA) e revela a imagem à direita/topo no desktop.
- **Hero:** coluna esquerda com copy + CTA "Garantir vaga"; coluna direita com **vídeo do Suk em 4:5**. O **formulário foi movido para o fim da página** (seção "Chamada final"), após o FAQ. Todos os CTAs ("Garantir vaga" / "Garanta sua vaga" / "Faça seu diagnóstico") levam a `#formulario` no fim.
- **Badges circulares flutuantes**, **glows** radiais em laranja/teal e **linhas orgânicas** finas — todos em CSS/SVG, sem dependências.
- **Carrossel (marquee)** automático de logos de clientes, com pausa no hover e efeito grayscale→cor.
- Blocos alternando **preto** e **off-white**, laranja como destaque pontual, teal comedido.

## Breakpoints

- Mobile: ≥ 360px (base)
- Tablet: ≥ 768px
- Desktop: ≥ 1200px

## Assets que precisam ser substituídos / adicionados

Os placeholders estão marcados no `index.html` com comentários `<!-- substituir ... -->`.

| Asset | Onde | Status |
|-------|------|--------|
| **Logo Lughy** (header e footer) | `assets/logo-lughy-white.svg` | ✅ Incluído (variante off-white oficial). Não distorcer, recolorir ou aplicar sombra. |
| **Logo Lughy** (outras variantes) | `assets/logo-lughy-black.svg`, `assets/logo-lughy-orange.svg` | ✅ Disponíveis para fundos claros/destaque. |
| **Assinatura DB1 Group** | `assets/decor/db1group-signature.png` (footer) | ✅ Incluído. |
| **Logos de clientes** | Seção "Empresas que já confiam na Lughy" | ✅ 10 logos extraídos de lughy.com.br em `assets/clients/`. Confirmar autorização/versões antes de publicar. |
| **Vídeo case Wepsy** | Seção Depoimento | ✅ Embed do YouTube (`9lRz9R0BSvA`) já configurado. |
| **Foto do Cristiano Suk** | `assets/suk.jpg` (seção Solução) | ✅ Incluída (retrato oficial, 900×768). |
| **Ecossistemas DB1 Group** | `assets/decor/db1-ecossistemas.jpg` (seção Institucional) | ✅ Incluída (imagem do PPT comercial, otimizada para web). |
| **Vídeo do Cristiano Suk (hero)** | Embed do YouTube Short (`5r_0Nt1J_Ow`), em frame 4:5 | ✅ Configurado. |
| **Imagem Open Graph** | `<meta property="og:image">` | ⬜ Adicionar `assets/og-image.jpg` (1200×630). |

## Integração do formulário (RD Station)

O formulário envia os dados para uma função serverless (`api/rd-conversao.js`, roda no Vercel) que registra a conversão no **RD Station Marketing** via API de Conversão. A API Key fica **secreta** em variável de ambiente (não vai no front-end).

**Variáveis de ambiente no Vercel** (Settings → Environment Variables):

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `RD_API_KEY` | ✅ | API Key do RD Station (Integrações → API Key) |
| `RD_CONVERSION_IDENTIFIER` | ⬜ | Identificador da conversão (padrão: `lp-consultoria-suk`) |
| `RD_CF_TIME_DEV` | ⬜ | Identificador do campo personalizado "time de desenvolvimento próprio" (ex.: `cf_time_de_desenvolvimento_proprio`) |

Mapeamento enviado ao RD: `name`, `email`, `company_name`, `job_title`, `mobile_phone`, `tags` (`consultoria-suk`, `time-dev-proprio:sim|nao`), `available_for_mailing` e `legal_bases` (consentimento LGPD quando marcado). Após alterar variáveis no Vercel, faça um **Redeploy**.

## Notas de marca

- Fonte única: **Lexend** (400 / 700 / 800).
- Paleta oficial em variáveis CSS: `--laranja-lughy` `#F9550D`, `--preto` `#0C0C0C`, `--off-white` `#F8F8F8`, `--teal` `#48BAB7`.
- Textos sempre alinhados à esquerda; nunca justificados.
- Grafia da marca: **Lughy** (nunca "LUGHY" ou "lughy" no corpo). Feminina: "a Lughy".
