import {
  ACHIEVEMENTS,
  CONTACT,
  COURSES,
  EDUCATION,
  EXPERIENCE,
  EXPERIMENTS,
  github,
  LANGUAGES,
  NUMBERS,
  PERSON,
  SERVICES,
  STACK,
  TESTIMONIAL,
  WORK,
  type Experiment,
  type Work,
} from './profile.ts'

export type Lang = 'markdown' | 'typescript' | 'tsx' | 'json'

export interface VFile {
  path: string
  lang: Lang
  text: string
}

export const LANG_LABEL: Record<Lang, string> = {
  markdown: 'Markdown',
  typescript: 'TypeScript',
  tsx: 'TypeScript React',
  json: 'JSON',
}

export const README = 'README.md'

const q = (s: string) => `'${s.replace(/'/g, "\\'")}'`
const list = (items: string[]) => `[${items.map(q).join(', ')}]`
const wrapList = (items: string[], indent: string) =>
  `[\n${items.map((i) => `${indent}  ${q(i)},`).join('\n')}\n${indent}]`

const readme = `![${PERSON.name}](${PERSON.photo})

# ${PERSON.name}

${PERSON.role} · **${PERSON.level} na ${PERSON.company}** · ${PERSON.city}

Do estágio a Pleno em dois anos, dentro de produtos reais. Desenvolvo apps mobile com React Native e Expo, da tela à publicação nas lojas; interfaces web com React, Next.js e Tailwind; e APIs com Node.js, NestJS, TypeScript, PostgreSQL e Docker.

[[trabalho/|Ver trabalhos]] · [Baixar CV](${CONTACT.cv}) · [[contato.ts|Falar comigo]]

## Em números

${NUMBERS.join(' · ')}

## Neste repositório

- [[sobre.md]] trajetória, conquistas e idiomas
- [[experiencia.json]] cargos, datas e o que fiz em cada um
- [[trabalho/]] produtos que desenvolvi
- [[experimentos/]] páginas de portfólio, cada uma explorando uma ideia
- [[stack.ts]] o que uso no dia a dia
- [[formacao.md]] faculdade, cursos e certificações
- [[servicos.md]] o que posso fazer pelo seu projeto
- [[depoimentos.md]] quem trabalhou comigo
- [[contato.ts]] e-mail, LinkedIn, GitHub e CV

> \`Ctrl K\` busca qualquer arquivo. No terminal, digite \`help\`.
`

const sobre = `# Sobre

Engenheiro de Software Full-Stack com trajetória construída dentro de um produto real: do estágio a Pleno em dois anos na ${PERSON.company}.

Desenvolvo apps mobile com React Native, Expo e NativeWind, da tela à publicação nas lojas; interfaces web com React, Next.js e Tailwind; e APIs com Node.js, NestJS, TypeScript, PostgreSQL e Docker. Trabalho com React Query, Zod e React Hook Form para garantir dados consistentes e formulários robustos.

Tenho experiência com machine learning em Python e otimização combinatória com OR-Tools. Faço deploy em Vercel, Render, AWS e Firebase. Transito entre mobile, web e back-end com foco em código organizado, performance e produtos fáceis de evoluir.

## Antes do código de produção

No Colégio Visão (2022 a 2025) ensinei programação e mecânica de robôs e preparei a equipe de competição para a First Lego League.

## Conquistas

${ACHIEVEMENTS.map((a) => `- ${a}`).join('\n')}

## Idiomas

${LANGUAGES}
`

const formacao = `# Formação

${EDUCATION.map(([course, school, when]) => `- **${course}**, ${school}${when ? ` (${when})` : ''}`).join('\n')}

## Cursos

${Object.entries(COURSES)
  .map(([school, items]) => `- **${school}**: ${items.join(', ')}`)
  .join('\n')}
`

const servicos = `# Serviços

${SERVICES.map(([title, text, stack]) => `## ${title}\n\n${text}. \`${stack}\``).join('\n\n')}

## Vamos trabalhar juntos

Tem um projeto em mente? [[contato.ts|Fale comigo]] e vamos tirar a ideia do papel.
`

const depoimentos = `# Depoimentos

> ${TESTIMONIAL.text}

**${TESTIMONIAL.author}**, ${TESTIMONIAL.role}, sobre o [[trabalho/${'novocred'}.tsx|${TESTIMONIAL.project}]]
`

const experiencia = JSON.stringify(
  EXPERIENCE.map((r) => ({
    empresa: r.company,
    cargo: r.title,
    periodo: `${r.from} → ${r.to}`,
    local: r.place,
    feitos: r.done,
  })),
  null,
  2,
)

const stack = `// o que uso no dia a dia
export const stack = {
${Object.entries(STACK)
  .map(([area, items]) => `  ${area}: ${list(items)},`)
  .join('\n')}
} as const

export type Area = keyof typeof stack
`

const contato = `// e-mail, redes e CV. No terminal: contato, email ou cv
export const contato = {
  email: ${q(CONTACT.email)},
  linkedin: ${q(CONTACT.linkedin)},
  github: ${q(CONTACT.github)},
  cv: ${q(CONTACT.cv)},
  cidade: ${q(PERSON.city)},
  abertoA: ['vagas', 'projetos'],
} as const
`

const tipos = `export type Plataforma = 'web' | 'mobile' | 'android' | 'ios'

export interface Trabalho {
  nome: string
  onde: string
  plataformas: Plataforma[]
  descricao: string[]
  stack: string[]
  depoimento?: string
}

export interface Experimento {
  nome: string
  ideia: string
  stack: string[]
  site: string
  codigo: string
}
`

const workFile = (w: Work) => `// produto real${w.where ? `, ${w.where}` : ''}
import type { Trabalho } from '../tipos'

export const trabalho: Trabalho = {
  nome: ${q(w.name)},
  onde: ${q(w.where)},
  plataformas: ${list(w.platforms)},
  descricao: ${wrapList(w.description, '  ')},
  stack: ${list(w.stack)},${w.testimonial ? `\n  depoimento: 'depoimentos.md',` : ''}
}
`

const experimentFile = (
  e: Experiment,
) => `// página de portfólio; produto fictício
import type { Experimento } from '../tipos'

export const experimento: Experimento = {
  nome: ${q(e.name)},
  ideia: ${q(e.idea)},
  stack: ${list(e.stack)},
  site: ${q(e.site)},
  codigo: ${q(github(e.slug))},
}
`

const file = (path: string, lang: Lang, text: string): VFile => ({
  path,
  lang,
  text,
})

/** Arquivos na ordem do explorador: pastas primeiro, depois a raiz. */
export const FILES: VFile[] = [
  ...WORK.map((w) => file(`trabalho/${w.slug}.tsx`, 'tsx', workFile(w))),
  ...EXPERIMENTS.map((e) =>
    file(`experimentos/${e.slug}.tsx`, 'tsx', experimentFile(e)),
  ),
  file(README, 'markdown', readme),
  file('sobre.md', 'markdown', sobre),
  file('experiencia.json', 'json', experiencia),
  file('stack.ts', 'typescript', stack),
  file('formacao.md', 'markdown', formacao),
  file('servicos.md', 'markdown', servicos),
  file('depoimentos.md', 'markdown', depoimentos),
  file('contato.ts', 'typescript', contato),
  file('tipos.ts', 'typescript', tipos),
]

export const FILE_MAP = new Map(FILES.map((f) => [f.path, f]))

export const FOLDERS = ['trabalho', 'experimentos'] as const
export type Folder = (typeof FOLDERS)[number]

export const filesIn = (folder: string) =>
  FILES.filter((f) => f.path.startsWith(`${folder}/`))
export const rootFiles = () => FILES.filter((f) => !f.path.includes('/'))
export const baseName = (path: string) => path.split('/').pop()!

/** Resolve o que alguém digita (caminho, nome do arquivo ou nome sem extensão) para um arquivo. */
const stem = (path: string) => baseName(path).replace(/\.[^.]+$/, '')
export const findFile = (query: string) =>
  FILE_MAP.get(query) ??
  FILES.find((f) => baseName(f.path) === query) ??
  FILES.find((f) => stem(f.path) === query)
