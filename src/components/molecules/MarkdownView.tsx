'use client'

import { Fragment, useEffect, useState, type ReactNode } from 'react'

import { motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'

import { EASE } from '@constants/motion'
import { FILE_MAP } from '@domain/files'
import { useWorkbench } from '@providers/WorkbenchProvider'

type Block =
  | { kind: 'h1' | 'h2' | 'p' | 'quote'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'img'; alt: string; src: string }

/** Markdown do portfólio: títulos, parágrafos, listas, citação, imagem e links. */
function parse(text: string): Block[] {
  const blocks: Block[] = []
  for (const raw of text.split('\n')) {
    const line = raw.trimEnd()
    const last = blocks.at(-1)
    const img = line.match(/^!\[(.*)\]\((.+)\)$/)
    if (img) blocks.push({ kind: 'img', alt: img[1], src: img[2] })
    else if (line.startsWith('# '))
      blocks.push({ kind: 'h1', text: line.slice(2) })
    else if (line.startsWith('## '))
      blocks.push({ kind: 'h2', text: line.slice(3) })
    else if (line.startsWith('> '))
      blocks.push({ kind: 'quote', text: line.slice(2) })
    else if (line.startsWith('- ')) {
      if (last?.kind === 'ul') last.items.push(line.slice(2))
      else blocks.push({ kind: 'ul', items: [line.slice(2)] })
    } else if (line) blocks.push({ kind: 'p', text: line })
  }
  return blocks
}

const INLINE =
  /\*\*(.+?)\*\*|`(.+?)`|\[\[([^\]|]+)(?:\|([^\]]+))?\]\]|\[([^\]]+)\]\(([^)]+)\)/g

const linkClass =
  'font-medium text-accent underline decoration-accent/40 underline-offset-[3px] hover:decoration-accent'

function Inline({ text }: { text: string }) {
  const { dispatch } = useWorkbench()
  const out: ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(INLINE)) {
    out.push(text.slice(last, m.index))
    const [, bold, code, target, label, extLabel, href] = m
    const key = m.index
    if (bold)
      out.push(
        <strong key={key} className="font-semibold">
          {bold}
        </strong>,
      )
    else if (code)
      out.push(
        <code
          key={key}
          className="rounded border border-line bg-side px-1.5 font-code text-[.88em]"
        >
          {code}
        </code>,
      )
    else if (target)
      out.push(
        <a
          key={key}
          href={target.endsWith('/') ? undefined : `#/${target}`}
          role="link"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault()
            dispatch({ type: 'open', path: target })
          }}
          onKeyDown={(e) =>
            e.key === 'Enter' && dispatch({ type: 'open', path: target })
          }
          className={`${linkClass} cursor-pointer`}
        >
          {label ?? target}
        </a>,
      )
    else if (href) {
      const external = /^https?:/.test(href)
      out.push(
        <a
          key={key}
          href={href}
          download={href.endsWith('.pdf') ? '' : undefined}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={linkClass}
        >
          {extLabel}
        </a>,
      )
    }
    last = m.index + m[0].length
  }
  out.push(text.slice(last))
  return <>{out}</>
}

function Portrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mb-5 size-28 overflow-hidden rounded-2xl border border-line bg-side shadow-[0_8px_24px_-12px_rgb(0_0_0/.45)] md:size-32">
      <Image
        src={src}
        alt={alt}
        width={612}
        height={408}
        priority
        className="size-full origin-[46%_22%] scale-[1.9] object-cover"
      />
    </div>
  )
}

function render(block: Block) {
  switch (block.kind) {
    case 'img':
      return <Portrait src={block.src} alt={block.alt} />
    case 'h1':
      return (
        <h1 className="m-0 mb-2 font-code text-[clamp(28px,4.2vw,40px)] leading-[1.1] font-bold tracking-[-.02em] text-balance">
          <Inline text={block.text} />
        </h1>
      )
    case 'h2':
      return (
        <h2 className="mt-9 mb-3 border-b border-line pb-1.5 text-[17px] font-semibold">
          <Inline text={block.text} />
        </h2>
      )
    case 'quote':
      return (
        <blockquote className="my-4 border-l border-line pl-4 text-muted">
          <Inline text={block.text} />
        </blockquote>
      )
    case 'ul':
      return (
        <ul className="my-3 list-disc pl-5 marker:text-muted">
          {block.items.map((item, i) => (
            <li key={i} className="my-1">
              <Inline text={item} />
            </li>
          ))}
        </ul>
      )
    case 'p':
      return (
        <p className="my-3">
          <Inline text={block.text} />
        </p>
      )
  }
}

// O README entra bloco a bloco só na primeira vez; depois as trocas de aba são diretas.
let booted = false

export function MarkdownView({ path }: { path: string }) {
  const blocks = parse(FILE_MAP.get(path)?.text ?? '')
  // decidido uma vez ao montar; recalcular em outro render deixaria os itens presos invisíveis
  const [firstOpen] = useState(() => !booted)
  const reduced = useReducedMotion()
  const animate = firstOpen && !reduced
  useEffect(() => {
    booted = true
  }, [])

  return (
    <article className="max-w-[72ch] px-4 pt-6 pb-20 text-[15px] leading-[1.7] sm:px-7">
      {blocks.map((block, i) => (
        <Fragment key={i}>
          {animate ? (
            <motion.div
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: EASE }}
            >
              {render(block)}
            </motion.div>
          ) : (
            render(block)
          )}
        </Fragment>
      ))}
    </article>
  )
}
