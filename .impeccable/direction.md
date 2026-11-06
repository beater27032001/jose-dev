# Direction contract: jose-dev (portfólio)

Mode: Experience (portfólio). Build path: code-led (sem geração de imagem nesta máquina).
Seed: none. Justificativa: é uma extensão de superfície existente (new-work §3, "Extend an existing surface": herda o mundo e a composição, sem rodada de conceitos). A superfície incumbente é `~/Downloads/jose-dev.html`, já no formato de editor, e o dono fixou o conceito por escrito ("a ideia é essa do vscode mesmo"). O que muda é conteúdo real, hierarquia, estados e interações dentro desse formato.
World: fixado pelo dono. Editor de código estilo VS Code, herdado do HTML original (`~/Downloads/jose-dev.html`): paleta escura #0f1115 com destaque âmbar #e5a54b, tema claro equivalente, JetBrains Mono para código, IBM Plex Sans para a interface. Refinamento dentro do mundo existente, sem rodada de conceitos.

## THESIS
José coloca software em produção; o portfólio prova isso funcionando como a ferramenta que ele usa todo dia.

## OWN-WORLD
Editor de código do dia a dia do público (recrutadores técnicos, tech leads, clientes que contratam devs): barra de atividade, explorador, abas, editor, terminal, barra de status, paleta. Herdado da superfície incumbente, não escolhido por rodada.

## STORY
Chegar → ler o README (quem é, nível, o que faz, três ações) → abrir arquivos como quem explora um repositório → terminar no contato ou no CV.

## FORM
A composição do VS Code, sem rodada (ver Seed). Tipografia herdada do incumbente: IBM Plex Sans na interface e no texto, JetBrains Mono no código, no terminal e no título da pré-visualização do README. O título em mono segue o original (`.mdv h1{font-family:var(--code)}` em `jose-dev.html`), e é a assinatura do nome "como código".

## FIRST VIEWPORT
O editor inteiro, funcionando: barra de título com o atalho da paleta, barra de atividade, explorador com `trabalho/` e `experimentos/` abertos, README.md aberto em pré-visualização com a foto, o nome, o cargo (Pleno na SouvTech), um resumo de três linhas e três ações (Ver trabalhos, Baixar CV, Falar comigo), barra de status âmbar. Teste da memória: "o portfólio era um VS Code de verdade; abri os projetos dele como arquivos".

## Signature interaction
Paleta de comandos (Ctrl/⌘ K) com busca aproximada sobre arquivos e comandos, e terminal com comandos reais (help, ls, cat, open, projetos, whoami, contato, email, cv, linkedin, github, theme, clear, sudo contratar). Tudo que parece clicável faz algo de verdade.

## Motion
Um momento orquestrado: na primeira abertura, o explorador entra em cascata e o README bloco a bloco, só com deslocamento (o conteúdo já chega visível no HTML do servidor) e nada disso com `prefers-reduced-motion`. Depois, só movimento nativo do editor: abas que entram e saem, paleta que abre, terminal que sobe, gaveta no celular.

## Window chrome
As três bolinhas da barra de título são botões: fechar todas as abas, mostrar ou ocultar o explorador, tela cheia.

## Visitor path
Recrutador: README → experiencia.json / trabalho/ → contato ou CV. Tech lead: paleta, terminal e o código dos arquivos. Cliente: servicos.md → depoimentos.md → contato.

## Constraints (decisões do dono)
- Primeira tela: README como boas-vindas.
- Celular: editor completo adaptado, com o explorador em gaveta.
- Contato: e-mail, LinkedIn, GitHub e CV. Sem telefone nem WhatsApp.
- Dados: cargo Pleno (do CV), faculdade Estácio (do site).
- Sem conteúdo sobre "como a página foi feita".

## Honest risk
Um editor é denso para quem não é dev. Mitigação: o README fala português comum e tem as três ações principais logo na primeira dobra.
