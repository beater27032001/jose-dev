import 'server-only'

import { codeToTokens, createCssVariablesTheme } from 'shiki'

import { FILES } from '@domain/files'

// As cores viram variáveis CSS (--shiki-token-*), ligadas aos tokens de cada tema no globals.css.
const theme = createCssVariablesTheme({
  name: 'css-variables',
  variablePrefix: '--shiki-',
  fontStyle: true,
})

export interface Token {
  /** texto */
  c: string
  /** cor, como var(--shiki-token-*) */
  v?: string
  /** itálico */
  i?: true
}
export type Tokens = Record<string, Token[][]>

export async function highlightAll(): Promise<Tokens> {
  const entries = await Promise.all(
    FILES.map(async (f) => {
      const { tokens } = await codeToTokens(f.text.replace(/\n$/, ''), {
        lang: f.lang,
        theme,
      })
      const lines = tokens.map((line) =>
        line.map((t): Token => {
          const token: Token = { c: t.content }
          if (t.color) token.v = t.color
          if ((t.fontStyle ?? 0) & 1) token.i = true
          return token
        }),
      )
      return [f.path, lines] as const
    }),
  )
  return Object.fromEntries(entries)
}
