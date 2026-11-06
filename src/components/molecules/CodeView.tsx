'use client'

import { useState, type MouseEvent } from 'react'

import { FILE_MAP } from '@domain/files'
import type { Token } from '@lib/highlight'
import { cn } from '@lib/utils'
import { useWorkbench } from '@providers/WorkbenchProvider'

// Strings que viram link: URLs, e-mail, o PDF do CV e arquivos do próprio editor.
const QUOTED = /^(['"])(.*)\1$/
function linkOf(value: string) {
  if (/^https?:\/\//.test(value)) return { href: value, external: true }
  if (/^[^@\s]+@[^@\s]+\.\w+$/.test(value)) return { href: `mailto:${value}` }
  if (value.endsWith('.pdf')) return { href: value, download: true }
  if (FILE_MAP.has(value)) return { href: `#/${value}` }
  return null
}

function TokenSpan({ token }: { token: Token }) {
  const style = { color: token.v, fontStyle: token.i ? 'italic' : undefined }
  const [, quote, inner] = token.c.match(QUOTED) ?? []
  const link = inner ? linkOf(inner) : null
  if (!link) return <span style={style}>{token.c}</span>
  return (
    <span style={style}>
      {quote}
      <a
        href={link.href}
        download={link.download ? '' : undefined}
        target={link.external ? '_blank' : undefined}
        rel={link.external ? 'noopener noreferrer' : undefined}
        className="underline decoration-current/40 decoration-dotted underline-offset-[3px] hover:decoration-solid"
      >
        {inner}
      </a>
      {quote}
    </span>
  )
}

/** Coluna do clique, contando o texto da linha até o ponto selecionado. */
function columnAt(line: HTMLElement) {
  const sel = getSelection()
  if (!sel?.anchorNode || !line.contains(sel.anchorNode)) return 1
  const range = document.createRange()
  range.setStart(line, 0)
  range.setEnd(sel.anchorNode, sel.anchorOffset)
  return range.toString().length + 1
}

export function CodeView({ path }: { path: string }) {
  const { tokens, setCursor } = useWorkbench()
  const [current, setCurrent] = useState(0)
  const lines = tokens[path] ?? []

  const pick = (i: number) => (e: MouseEvent<HTMLDivElement>) => {
    setCurrent(i)
    const code = e.currentTarget.querySelector('code')
    setCursor({ line: i + 1, col: code ? columnAt(code) : 1 })
  }

  return (
    <div className="pt-2.5 pb-16 font-code text-[13px] leading-[1.7] md:text-[13.5px]">
      {lines.map((line, i) => (
        <div
          key={i}
          onClick={pick(i)}
          className={cn('flex', current === i && 'bg-hover')}
        >
          <span
            aria-hidden
            className={cn(
              'w-11 flex-none pr-4 text-right text-t-com select-none md:w-14',
              current === i && 'text-fg',
            )}
          >
            {i + 1}
          </span>
          <code className="min-w-0 flex-1 pr-5 break-words whitespace-pre-wrap">
            {line.length
              ? line.map((t, j) => <TokenSpan key={j} token={t} />)
              : '​'}
          </code>
        </div>
      ))}
    </div>
  )
}
