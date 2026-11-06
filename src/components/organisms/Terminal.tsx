'use client'

import { useEffect, useRef, useState } from 'react'

import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { EASE } from '@constants/motion'
import { complete, run, type Tone } from '@domain/terminal'
import { cn } from '@lib/utils'
import { useWorkbench } from '@providers/WorkbenchProvider'

const TONE: Record<Tone, string> = {
  ok: 'text-t-str',
  err: 'text-t-num',
  dim: 'text-muted',
  cmd: 'text-fg',
}

const PROMPT = 'jose@dev ~ $'

function Panel() {
  const wb = useWorkbench()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(0)
  const out = useRef<HTMLDivElement>(null)
  const field = useRef<HTMLInputElement>(null)

  useEffect(() => {
    out.current?.scrollTo({ top: out.current.scrollHeight })
  }, [wb.lines])

  const submit = () => {
    const value = input.trim()
    setInput('')
    if (!value) return
    setHistory((h) => [...h, value])
    setCursor(history.length + 1)
    const result = run(value)
    wb.print([{ text: `$ ${value}`, tone: 'cmd' }, ...result.lines])
    if (result.effect) wb.exec(result.effect)
  }

  return (
    <div
      onClick={() => field.current?.focus()}
      className="flex h-[38dvh] flex-col md:h-[230px]"
    >
      <div className="flex items-center justify-between border-b border-line px-3 py-1.5 text-[11px] tracking-[.1em] text-muted uppercase">
        <span className="border-b border-accent pb-px text-fg">Terminal</span>
        <button
          aria-label="Fechar terminal"
          onClick={(e) => {
            e.stopPropagation()
            wb.setTerminal(false)
          }}
          className="grid size-6 place-items-center rounded hover:bg-hover hover:text-fg"
        >
          <X aria-hidden className="size-4" />
        </button>
      </div>
      <div
        ref={out}
        role="log"
        aria-live="polite"
        className="min-h-0 flex-1 overflow-auto px-3.5 py-2 font-code text-[13px] leading-[1.6] break-words whitespace-pre-wrap"
      >
        {wb.lines.map((line, i) => (
          <div key={i} className={cn(line.tone && TONE[line.tone])}>
            {line.tone === 'cmd' ? (
              <>
                <span className="text-accent">$</span>
                {line.text.slice(1)}
              </>
            ) : (
              line.text || '​'
            )}
          </div>
        ))}
      </div>
      <label className="flex items-center gap-2 border-t border-line px-3.5 py-1.5 font-code text-[13px]">
        <span className="flex-none text-accent">{PROMPT}</span>
        <input
          ref={field}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit()
            else if (e.key === 'ArrowUp' && cursor > 0) {
              e.preventDefault()
              setCursor(cursor - 1)
              setInput(history[cursor - 1])
            } else if (e.key === 'ArrowDown' && cursor < history.length) {
              e.preventDefault()
              setCursor(cursor + 1)
              setInput(history[cursor + 1] ?? '')
            } else if (e.key === 'Tab') {
              e.preventDefault()
              setInput(complete(input))
            }
          }}
          aria-label="Comando do terminal"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="send"
          className="min-w-0 flex-1 border-0 bg-transparent text-fg outline-none"
        />
      </label>
    </div>
  )
}

export function Terminal() {
  const { terminal } = useWorkbench()
  return (
    <AnimatePresence initial={false}>
      {terminal && (
        <motion.section
          aria-label="Terminal"
          className="overflow-hidden border-t border-line bg-bar"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <Panel />
        </motion.section>
      )}
    </AnimatePresence>
  )
}
