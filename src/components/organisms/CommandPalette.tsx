'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'

import { ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { FileIcon } from '@atoms/FileIcon'
import { Kbd } from '@atoms/Kbd'
import { FILES } from '@domain/files'
import { fuzzy } from '@domain/fuzzy'
import { CONTACT } from '@domain/profile'
import { cn } from '@lib/utils'
import { useWorkbench } from '@providers/WorkbenchProvider'

interface Item {
  id: string
  label: string
  kind: 'arquivo' | 'comando'
  hits: number[]
  score: number
  run: () => void
}

function useCommands() {
  const wb = useWorkbench()
  return [
    { label: 'Tema: claro', run: () => wb.setTheme('light') },
    { label: 'Tema: escuro', run: () => wb.setTheme('dark') },
    {
      label: 'Terminal: abrir ou fechar',
      run: () => wb.setTerminal(!wb.terminal),
    },
    { label: 'Explorador: mostrar ou ocultar', run: wb.toggleExplorer },
    {
      label: 'Abas: fechar todas',
      run: () => wb.dispatch({ type: 'closeAll' }),
    },
    {
      label: 'Baixar CV',
      run: () => wb.exec({ type: 'download', url: CONTACT.cv }),
    },
    {
      label: 'Copiar e-mail',
      run: () => wb.exec({ type: 'copy', text: CONTACT.email }),
    },
    {
      label: 'Abrir LinkedIn',
      run: () => wb.exec({ type: 'external', url: CONTACT.linkedin }),
    },
    {
      label: 'Abrir GitHub',
      run: () => wb.exec({ type: 'external', url: CONTACT.github }),
    },
  ]
}

function Highlight({ text, hits }: { text: string; hits: number[] }) {
  const set = new Set(hits)
  return (
    <span className="truncate">
      {[...text].map((ch, i) =>
        set.has(i) ? (
          <mark key={i} className="bg-transparent font-semibold text-accent">
            {ch}
          </mark>
        ) : (
          ch
        ),
      )}
    </span>
  )
}

function Palette({ prefix }: { prefix: string }) {
  const wb = useWorkbench()
  const commands = useCommands()
  const [query, setQuery] = useState(prefix)
  const [selected, setSelected] = useState(0)
  const listId = useId()
  const restore = useRef<Element | null>(null)

  useEffect(() => {
    restore.current = document.activeElement
    return () => (restore.current as HTMLElement | null)?.focus?.()
  }, [])

  const items = useMemo(() => {
    const onlyCommands = query.startsWith('>')
    const q = (onlyCommands ? query.slice(1) : query).trim()
    const files = onlyCommands
      ? []
      : FILES.map((f) => ({
          label: f.path,
          kind: 'arquivo' as const,
          run: () => wb.dispatch({ type: 'open', path: f.path }),
        }))
    const cmds =
      onlyCommands || q
        ? commands.map((c) => ({ ...c, kind: 'comando' as const }))
        : []
    return [...files, ...cmds]
      .map((it, i) => ({ ...it, id: `${listId}-${i}`, m: fuzzy(q, it.label) }))
      .filter((it) => it.m)
      .map(({ m, ...it }): Item => ({ ...it, hits: m!.hits, score: m!.score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
    // os comandos dependem do estado atual (tema, terminal), então recalcula a cada render
  }, [query, commands, wb, listId])

  const current = Math.min(selected, Math.max(0, items.length - 1))
  const run = (item?: Item) => {
    if (!item) return
    wb.closePalette()
    item.run()
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/35 px-4 pt-[min(70px,10vh)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      onMouseDown={(e) => e.target === e.currentTarget && wb.closePalette()}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Paleta de comandos"
        className="w-[min(620px,100%)] overflow-hidden rounded-[10px] border border-line bg-side shadow-[0_20px_60px_-10px_rgb(0_0_0/.55)]"
        initial={{ y: -8, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: -8, scale: 0.98 }}
        transition={{ duration: 0.16 }}
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelected(0)
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setSelected(Math.min(items.length - 1, current + 1))
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setSelected(Math.max(0, current - 1))
            } else if (e.key === 'Enter') {
              e.preventDefault()
              run(items[current])
            } else if (e.key === 'Escape') wb.closePalette()
            else if (e.key === 'Tab') e.preventDefault()
          }}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={items[current]?.id}
          aria-label="Buscar arquivo ou comando"
          placeholder="Nome de um arquivo, ou > para comandos"
          spellCheck={false}
          autoComplete="off"
          className="w-full border-0 border-b border-line bg-transparent px-4 py-3.5 text-[15px] text-fg outline-none placeholder:text-muted"
        />
        <ul
          id={listId}
          role="listbox"
          className="m-0 max-h-[50vh] list-none overflow-auto p-1.5"
        >
          {items.length === 0 && (
            <li className="px-2.5 py-2 text-muted">Nada encontrado</li>
          )}
          {items.map((item, i) => (
            <li
              key={item.id}
              id={item.id}
              role="option"
              aria-selected={i === current}
              onMouseMove={() => setSelected(i)}
              onClick={() => run(item)}
              className={cn(
                'flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm',
                i === current && 'bg-sel',
              )}
            >
              {item.kind === 'arquivo' ? (
                <FileIcon path={item.label} />
              ) : (
                <ChevronRight
                  aria-hidden
                  className="size-4 flex-none text-muted"
                />
              )}
              <Highlight text={item.label} hits={item.hits} />
              <small className="ml-auto flex-none text-xs text-muted">
                {item.kind}
              </small>
            </li>
          ))}
        </ul>
        <p className="m-0 flex flex-wrap gap-x-4 gap-y-1 border-t border-line px-4 py-2 text-xs text-muted max-sm:hidden">
          <span>
            <Kbd>↑</Kbd> <Kbd>↓</Kbd> navegar
          </span>
          <span>
            <Kbd>Enter</Kbd> abrir
          </span>
          <span>
            <Kbd>Esc</Kbd> fechar
          </span>
          <span>
            <Kbd>&gt;</Kbd> só comandos
          </span>
        </p>
      </motion.div>
    </motion.div>
  )
}

export function CommandPalette() {
  const { palette } = useWorkbench()
  return (
    <AnimatePresence>
      {palette !== null && <Palette prefix={palette} />}
    </AnimatePresence>
  )
}
