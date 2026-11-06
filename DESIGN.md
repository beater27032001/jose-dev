---
name: jose-dev
description: Portfólio de José Paiva como um editor de código estilo VS Code que funciona de verdade.
colors:
  bg: "#0f1115"
  side: "#14171c"
  bar: "#0b0d10"
  line: "#23272f"
  fg: "#d7dae0"
  muted: "#7d8590"
  accent: "#e5a54b"
  on-accent: "#1a1205"
  sel: "#1f2a3a"
  hover: "rgb(127 127 127 / 0.1)"
  t-kw: "#c792ea"
  t-str: "#a5d86f"
  t-num: "#f78c6c"
  t-com: "#808893"
  t-key: "#82aaff"
  t-type: "#ffcb6b"
  t-punct: "#a9b1bc"
  i-md: "#5fb3f0"
  i-tsx: "#4fc1ff"
  i-ts: "#5b9bf0"
  i-json: "#e5c07b"
  dot-r: "#ff5f57"
  dot-y: "#febc2e"
  dot-g: "#28c840"
  bg-light: "#fbfbfa"
  side-light: "#f2f2ef"
  bar-light: "#e8e8e4"
  line-light: "#dcdcd6"
  fg-light: "#24262b"
  muted-light: "#5f636b"
  accent-light: "#9a5c0e"
  on-accent-light: "#ffffff"
  sel-light: "#e3ebf6"
  hover-light: "rgb(127 127 127 / 0.12)"
  t-kw-light: "#8a3fc7"
  t-str-light: "#3c7f1f"
  t-num-light: "#b0480f"
  t-com-light: "#6b717a"
  t-key-light: "#2f5fc4"
  t-type-light: "#8a5f00"
  t-punct-light: "#4a4e56"
  i-md-light: "#1f6fb2"
  i-tsx-light: "#0f7fae"
  i-ts-light: "#2f5fc4"
  i-json-light: "#8a5f00"
typography:
  display:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace"
    fontSize: "clamp(28px, 4.2vw, 40px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "17px"
    fontWeight: 600
  body:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  title:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
  code:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.12em"
  status:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "12px"
    fontWeight: 400
rounded:
  kbd: "3px"
  sm: "4px"
  md: "6px"
  float: "10px"
  portrait: "16px"
  full: "9999px"
spacing:
  titlebar: "36px"
  tabbar: "36px"
  activitybar: "48px"
  statusbar: "24px"
  sidebar: "240px"
  terminal: "230px"
  palette: "620px"
  prose: "72ch"
components:
  status-bar:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.status}"
    height: "{spacing.statusbar}"
    padding: "0 12px"
  tab-active:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg}"
    padding: "0 6px 0 14px"
    height: "{spacing.tabbar}"
  tab-inactive:
    backgroundColor: "{colors.bar}"
    textColor: "{colors.muted}"
    padding: "0 6px 0 14px"
    height: "{spacing.tabbar}"
  explorer-item:
    textColor: "{colors.fg}"
    typography: "{typography.title}"
    padding: "3px 12px 3px 14px"
  explorer-item-active:
    backgroundColor: "{colors.sel}"
    textColor: "{colors.fg}"
  activity-button:
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
    size: "40px"
  activity-button-pressed:
    textColor: "{colors.fg}"
  palette:
    backgroundColor: "{colors.side}"
    textColor: "{colors.fg}"
    rounded: "{rounded.float}"
    width: "{spacing.palette}"
  palette-option-selected:
    backgroundColor: "{colors.sel}"
    rounded: "{rounded.md}"
    padding: "8px 10px"
  search-trigger:
    backgroundColor: "{colors.side}"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
    padding: "3px 10px"
  kbd:
    textColor: "{colors.muted}"
    rounded: "{rounded.kbd}"
    padding: "0 4px"
  inline-code:
    backgroundColor: "{colors.side}"
    rounded: "{rounded.sm}"
    padding: "0 6px"
  link:
    textColor: "{colors.accent}"
---

# Design System: jose-dev

## Overview

**Creative North Star: "O Editor de Todo Dia"**

O sistema é o próprio editor de código que o público usa no trabalho: barra de título, barra de atividade, explorador, abas, editor, terminal, barra de status e paleta de comandos. Nada é ilustração de um editor; cada peça de cromo é um controle que funciona. A densidade é a de uma ferramenta: texto pequeno na interface (12 a 13,5px), painéis colados por linhas de 1px, nenhuma margem decorativa. O único momento de respiro é a pré-visualização do README, com prosa a 15px, entrelinha 1,7 e medida de 72ch.

A paleta é um escuro frio quase neutro com um único âmbar que marca onde você está: a barra de status, a aba ativa, o indicador da barra de atividade, links, o prompt do terminal e o foco. As outras cores existem só como cores de sintaxe e de tipo de arquivo, no papel que já têm num editor. O tema claro é um espelho exato, token por token, trocado por `[data-theme]`.

O mundo foi fixado pelo dono e herdado da superfície incumbente (`~/Downloads/jose-dev.html`); não houve rodada de conceitos.

**Decisão em aberto: seed.** O contrato de direção registra `Seed: none`: a rodada de conceitos não foi executada porque o dono fixou a composição. Nenhuma seed foi adotada e este documento não atribui uma. Existe um artefato de rodada em `.impeccable/questions/` que não foi aprovado e não governa este sistema. Fechar esta decisão cabe ao dono.

**Key Characteristics:**
- Cromo de editor completo e funcional; nada clicável é falso.
- Um acento âmbar, raro e posicional.
- Profundidade por degraus tonais e linhas de 1px, não por sombras.
- Duas famílias: IBM Plex Sans para interface e prosa, JetBrains Mono para código e para o nome.
- Dois temas com paridade total de tokens.

## Colors

Escuro frio e contido, com um âmbar quente como cursor e as cores de sintaxe como único repertório secundário.

### Primary
- **Âmbar Cursor** (`accent`; claro: `accent-light`): fundo da barra de status, linha superior de 2px da aba ativa, traço de 2px do botão ativo na barra de atividade, links da pré-visualização, `$` e prompt do terminal, letras encontradas na paleta, contorno de foco, cursor de texto e seleção (35% via `color-mix`). Texto sobre ele usa `on-accent`.

### Secondary
- **Sintaxe** (`t-kw`, `t-str`, `t-num`, `t-com`, `t-key`, `t-type`, `t-punct`): alimentam o Shiki por variáveis CSS (`--shiki-token-*`). Fora do código só aparecem com o mesmo sentido: `t-str` para saída ok do terminal, `t-num` para erro, `t-com` para números de linha.
- **Tipos de arquivo** (`i-md`, `i-tsx`, `i-ts`, `i-json`): cor dos ícones de arquivo no explorador, abas e paleta.

### Tertiary
- **Bolinhas da janela** (`dot-r`, `dot-y`, `dot-g`): só nos três botões da barra de título; iguais nos dois temas.

### Neutral
- **Fundo do Editor** (`bg`): área de edição, aba ativa, cabeçalho de caminho.
- **Lateral** (`side`): explorador, paleta, gatilho de busca, código inline, moldura do retrato.
- **Barra** (`bar`): barra de título, barra de atividade, faixa de abas, abas inativas, terminal. É o degrau mais escuro no tema escuro.
- **Linha** (`line`): todas as divisões de 1px, bordas de kbd, código inline e paleta; também a marca d'água `jose-dev` do estado vazio.
- **Texto** (`fg`) e **Texto Apagado** (`muted`): conteúdo e metadados (contadores, caminhos, rótulos de painel, marcadores de lista).
- **Seleção** (`sel`): arquivo ativo no explorador, opção ativa na paleta.
- **Hover** (`hover`): cinza neutro translúcido para hover de itens e linha atual do código, igual nos dois temas.

### Named Rules
**The Amber Is the Cursor Rule.** O âmbar marca posição e ação: onde você está, o que é clicável, o que tem foco. A única superfície preenchida de âmbar é a barra de status. Nunca use âmbar como fundo de cartão, seção ou botão de conteúdo.

**The Syntax Is the Palette Rule.** Nenhum matiz novo. Uma cor secundária só entra se for um token `t-*` ou `i-*` usado no sentido que ele já tem.

**The Two-Theme Parity Rule.** Todo componente referencia variáveis (`var(--bg)`, `text-muted`), nunca hex. Um token novo nasce nos dois blocos de tema ao mesmo tempo.

## Typography

**Display Font:** JetBrains Mono (com ui-monospace, Menlo, monospace)
**Body Font:** IBM Plex Sans (com system-ui, -apple-system, sans-serif)
**Label/Mono Font:** JetBrains Mono, pesos 400, 500 e 700; Plex Sans carregado em 400, 500 e 600.

**Character:** Plex Sans é a voz técnica e neutra da interface; JetBrains Mono é a voz do código, e no título do README transforma o nome em código. Base do documento: 14px em Plex.

### Hierarchy
- **Display** (700, clamp(28px, 4.2vw, 40px), 1.1, -0.02em, mono): só o `# título` do README e a marca d'água do estado vazio (clamp(32px, 6vw, 48px), cor `line`).
- **Headline** (600, 17px, Plex): `##` da pré-visualização, com linha inferior de 1px `line` e 36px acima.
- **Body** (400, 15px, 1.7, Plex): prosa da pré-visualização, medida máxima 72ch. Links em 500 e âmbar com sublinhado a 40%.
- **Title** (400, 13 a 13,5px, Plex): itens do explorador (13,5px), abas (13px), opções da paleta (14px).
- **Code** (400, 13px, 1.7, mono; 13,5px a partir de md): editor de código; terminal a 13px com entrelinha 1.6; kbd a 11px; código inline a .88em.
- **Label** (600, 11px, 0.12em, maiúsculas, `muted`): cabeçalhos de painel do editor ("Explorador", "Terminal").
- **Status** (400, 12px; barra de título 12,5px): barra de status, cabeçalho de caminho, gatilho de busca.

### Named Rules
**The Name as Code Rule.** Mono é reservada a código, terminal, kbd, código inline, o título do README e a marca d'água do estado vazio. Interface e prosa ficam em Plex Sans.

**The Panel Header Rule.** Maiúsculas espaçadas a 11px existem só como cabeçalho de painel do editor, como no VS Code. Nunca como sobretítulo acima de um título de conteúdo.

## Layout

A página é uma janela fixa: `body` sem rolagem, grade de linhas 36px (barra de título) / restante / terminal / 24px (barra de status), em `h-dvh`. No meio, colunas 48px (barra de atividade) / 240px (explorador, de md em diante) / editor. Só os painéis rolam, com barra de rolagem fina em `muted` translúcido. O terminal abre entre o editor e a barra de status com 230px (38dvh no celular). A paleta é uma camada fixa de até 620px de largura, a min(70px, 10vh) do topo.

Abaixo de md (768px), o explorador vira gaveta de min(280px, 78vw) sobre um véu `black/35`, ancorada à direita da barra de atividade; o título central da barra de título some; em sm (640px) somem dicas secundárias (kbd da busca, rodapé da paleta, "0 problemas", Ln/Col, UTF-8). As bordas respeitam `env(safe-area-inset-*)`.

Ritmo interno: itens de lista a 3px na vertical, recuo de 14px na raiz e 30px dentro de pastas; prosa com 28px laterais (16px no celular).

**The Chrome Is Fixed Rule.** A janela nunca rola como página. Conteúdo novo entra como arquivo, aba ou painel dentro da grade.

## Elevation & Depth

Profundidade por degraus tonais e linhas de 1px. Os painéis ficam no mesmo plano e se separam por `bar`, `bg` e `side` mais uma borda `line`. Sombras existem só no que flutua sobre o editor (paleta e gaveta) e no retrato do README. A aba ativa é marcada por uma linha interna âmbar de 2px no topo, que é traço e não elevação.

### Shadow Vocabulary
- **Flutuante** (`box-shadow: 0 20px 60px -10px rgb(0 0 0 / .55)`): paleta de comandos.
- **Gaveta** (`box-shadow: 12px 0 32px rgb(0 0 0 / .35)`): explorador em gaveta no celular.
- **Retrato** (`box-shadow: 0 8px 24px -12px rgb(0 0 0 / .45)`): foto do README.
- **Aba ativa** (`box-shadow: inset 0 2px 0 var(--accent)`): indicador da aba ativa.

### Named Rules
**The Tonal Stack Rule.** Painéis do cromo nunca levam sombra. Uma sombra só aparece em camada que flutua sobre o editor, e sempre difusa.

## Shapes

O cromo é reto: painéis, barras e abas têm canto zero e se encontram em linhas de 1px. O raio aparece só dentro deles e cresce com o grau de destaque: kbd a 3px, botões pequenos e código inline a 4px, botões da barra de atividade, gatilho de busca e opções da paleta a 6px, a paleta a 10px, o retrato a 16px. As bolinhas da janela e o polegar da barra de rolagem são círculos.

**The Square Chrome Rule.** Painel não tem canto arredondado. Raio é para controle e camada flutuante.

## Components

### Buttons
Controles de ferramenta: discretos em repouso, revelados no hover.
- **Shape:** 4px nos botões pequenos (fechar aba, fechar terminal, ações do estado vazio), 6px nos botões da barra de atividade (40px quadrados, ícone de 20px).
- **Primary:** não existe botão de destaque preenchido. As ações do README são links âmbar.
- **Hover / Focus:** texto `muted` passa a `fg`, fundo `hover` quando há área. Foco: contorno de 1px `accent` com recuo -1px. Na barra de status, hover em `black/10`.
- **Botões da janela:** três bolinhas de 13px numa área de toque de 24px; o glifo SVG aparece no hover ou foco do grupo.

### Chips
- **Kbd:** borda `line`, raio 3px, mono 11px, `muted`. Mostra atalhos reais no gatilho de busca, paleta e estado vazio.

### Cards / Containers
- **Paleta de comandos:** fundo `side`, borda `line`, raio 10px, sombra flutuante. Campo de 15px no topo separado por linha; lista com opções de 6px de raio, ativa em `sel`; letras encontradas em âmbar 600; tipo ("arquivo", "comando") em `muted` 12px à direita; rodapé de dicas com kbd.
- **Retrato:** 112px (128px em md), raio 16px, borda `line`, fundo `side`, sombra de retrato.

### Inputs / Fields
- **Style:** sem borda nem fundo próprios, herdando o painel (paleta, linha de prompt do terminal). Placeholder `muted`.
- **Focus:** o campo já abre focado; o cursor é âmbar.

### Navigation
- **Barra de atividade:** coluna de 48px em `bar`; botão ativo em `fg` com traço âmbar de 2px à esquerda; contato e CV presos ao rodapé.
- **Explorador:** fundo `side`, itens 13,5px com ícone colorido por tipo, pasta com chevron que gira 90°, contador em `muted`; ativo em `sel`.
- **Abas:** faixa `bar` com borda inferior; ativa em `bg` com linha âmbar; inativa em `bar`/`muted` com o X a 60%; entram e saem pela largura em 0,18s.
- **Barra de status:** 24px em âmbar com texto `on-accent`, ícones de 14px; mensagens de estado sobem 6px ao entrar.

### Terminal
Painel `bar` com cabeçalho de painel (rótulo "Terminal" sublinhado em âmbar), saída mono 13px com tons por resultado (`t-str` ok, `t-num` erro, `muted` apagado) e prompt `jose@dev ~ $` em âmbar. Sobe pela altura em 0,25s.

### Code View
Números de linha em `t-com` (44px, 56px em md), linha clicada em `hover` com número em `fg`; quebra com recuo pendurado; strings que são URL, e-mail, PDF ou arquivo do projeto viram links pontilhados na cor do próprio token.

### Motion
Curva única `cubic-bezier(0.2, 0.8, 0.2, 1)`. Na primeira abertura, o explorador entra em cascata (8px, 30ms entre itens) e o README bloco a bloco (12px, 60ms entre blocos), só por deslocamento, porque o conteúdo já chega visível do servidor. Depois, só movimento nativo do editor. Tudo some com `prefers-reduced-motion`.

## Do's and Don'ts

### Do:
- **Do** marcar posição e foco com o âmbar (`accent`) e deixar o resto em `fg`, `muted` e degraus tonais.
- **Do** separar painéis com borda de 1px `line` e fundos `bar`, `bg` e `side`.
- **Do** definir todo token novo nos dois temas e referenciar só variáveis nos componentes.
- **Do** usar ícones SVG Lucide de 14 a 20px com traço 1.6 a 1.75, coloridos por `i-*` em arquivos e `muted` no resto.
- **Do** fazer cada peça de cromo funcionar: botões da janela, contadores, atalhos e barra de status têm efeito real.
- **Do** manter conteúdo novo dentro do modelo de arquivos (explorador, aba, pré-visualização ou código).

### Don't:
- **Don't** colocar sobretítulo em maiúsculas acima de títulos de conteúdo; maiúsculas espaçadas são só cabeçalho de painel.
- **Don't** usar sombra em painel do cromo nem sombra dura deslocada; sombra só difusa e em camada flutuante.
- **Don't** introduzir matiz fora dos tokens de sintaxe, tipo de arquivo e bolinhas da janela.
- **Don't** criar botão preenchido de âmbar no conteúdo; a única superfície âmbar é a barra de status.
- **Don't** usar outra face de display além de JetBrains Mono, nem a fonte do sistema como display.
- **Don't** desenhar cromo decorativo que não faz nada.
