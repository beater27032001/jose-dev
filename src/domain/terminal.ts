import { baseName, FILES, findFile, filesIn } from './files.ts'
import { CONTACT, PERSON } from './profile.ts'

export type Tone = 'ok' | 'err' | 'dim' | 'cmd'
export interface Line {
  text: string
  tone?: Tone
}

export type Effect =
  | { type: 'open'; path: string }
  | { type: 'theme'; theme: 'light' | 'dark' }
  | { type: 'clear' }
  | { type: 'download'; url: string }
  | { type: 'copy'; text: string }
  | { type: 'external'; url: string }

export interface Result {
  lines: Line[]
  effect?: Effect
}

const say = (text: string, tone?: Tone): Result => ({ lines: [{ text, tone }] })

export const HELP = [
  ['ls', 'lista os arquivos'],
  ['cat <arquivo>', 'mostra o conteúdo'],
  ['open <arquivo>', 'abre no editor'],
  ['projetos', 'lista os projetos'],
  ['whoami', 'quem sou eu'],
  ['contato', 'abre contato.ts'],
  ['email', 'copia o meu e-mail'],
  ['cv', 'baixa o CV em PDF'],
  ['linkedin · github', 'abre o perfil'],
  ['theme claro|escuro', 'troca o tema'],
  ['clear', 'limpa o terminal'],
] as const

export const COMMAND_NAMES = [
  'help',
  'ls',
  'cat',
  'open',
  'projetos',
  'whoami',
  'contato',
  'email',
  'cv',
  'linkedin',
  'github',
  'theme',
  'clear',
  'sudo',
]

export function run(input: string): Result {
  const [cmd = '', ...rest] = input.trim().split(/\s+/)
  const arg = rest.join(' ')

  switch (cmd) {
    case '':
      return { lines: [] }
    case 'help':
      return {
        lines: [
          { text: 'comandos', tone: 'ok' },
          ...HELP.map(([c, d]) => ({ text: `  ${c.padEnd(19)}${d}` })),
        ],
      }
    case 'ls':
      return { lines: FILES.map((f) => ({ text: f.path })) }
    case 'projetos':
      return {
        lines: (['trabalho', 'experimentos'] as const).flatMap((folder) => [
          { text: `${folder}/`, tone: 'dim' as Tone },
          ...filesIn(folder).map((f) => ({
            text: `  ${baseName(f.path).replace('.tsx', '')}`,
          })),
        ]),
      }
    case 'whoami':
      return say(
        `${PERSON.name} · ${PERSON.role} · ${PERSON.level} na ${PERSON.company} · ${PERSON.city}`,
      )
    case 'cat': {
      const f = findFile(arg)
      return f
        ? {
            lines: f.text
              .replace(/\n$/, '')
              .split('\n')
              .map((text) => ({ text })),
          }
        : say(`cat: ${arg || '?'}: arquivo não encontrado`, 'err')
    }
    case 'open': {
      const f = findFile(arg)
      return f
        ? {
            ...say(`abrindo ${f.path}`, 'ok'),
            effect: { type: 'open', path: f.path },
          }
        : say(`open: ${arg || '?'}: arquivo não encontrado`, 'err')
    }
    case 'contato':
      return {
        ...say('abrindo contato.ts', 'ok'),
        effect: { type: 'open', path: 'contato.ts' },
      }
    case 'email':
      return {
        ...say(`${CONTACT.email} copiado`, 'ok'),
        effect: { type: 'copy', text: CONTACT.email },
      }
    case 'cv':
      return {
        ...say('baixando cv-jose-paiva.pdf', 'ok'),
        effect: { type: 'download', url: CONTACT.cv },
      }
    case 'linkedin':
    case 'github':
      return {
        ...say(`abrindo ${cmd}`, 'ok'),
        effect: { type: 'external', url: CONTACT[cmd] },
      }
    case 'theme':
      if (arg === 'claro' || arg === 'escuro')
        return {
          ...say(`tema ${arg}`, 'ok'),
          effect: { type: 'theme', theme: arg === 'claro' ? 'light' : 'dark' },
        }
      return say('use: theme claro ou theme escuro', 'err')
    case 'clear':
      return { lines: [], effect: { type: 'clear' } }
    case 'sudo':
      return arg.startsWith('contratar')
        ? {
            ...say('permissão concedida. abrindo contato.ts', 'ok'),
            effect: { type: 'open', path: 'contato.ts' },
          }
        : say('boa tentativa', 'err')
    default:
      return say(`${cmd}: comando não encontrado. Tente help`, 'err')
  }
}

/** Completa o último termo com um comando ou nome de arquivo (tecla Tab). */
export function complete(input: string): string {
  const parts = input.split(' ')
  const last = parts.pop() ?? ''
  if (!last) return input
  const pool = parts.length ? FILES.map((f) => baseName(f.path)) : COMMAND_NAMES
  const hit = pool.find((name) => name.startsWith(last))
  return hit ? [...parts, hit].join(' ') : input
}
