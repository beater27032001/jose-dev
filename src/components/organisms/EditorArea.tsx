'use client'

import { useEffect, useRef } from 'react'

import { ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'

import { Kbd } from '@atoms/Kbd'
import { FILE_MAP, README } from '@domain/files'
import { CodeView } from '@molecules/CodeView'
import { MarkdownView } from '@molecules/MarkdownView'
import { TabBar } from '@molecules/TabBar'
import { useWorkbench } from '@providers/WorkbenchProvider'

function Empty() {
  const { dispatch, openPalette, setTerminal, isMac } = useWorkbench()
  const mod = isMac ? '⌘' : 'Ctrl'
  const actions = [
    {
      label: 'Abrir o README',
      keys: null,
      run: () => dispatch({ type: 'open', path: README }),
    },
    { label: 'Buscar arquivo', keys: `${mod} K`, run: () => openPalette() },
    { label: 'Abrir o terminal', keys: 'Ctrl `', run: () => setTerminal(true) },
  ]
  return (
    <div className="grid h-full place-items-center p-6 text-center text-muted">
      <div>
        <p
          aria-hidden
          className="m-0 mb-5 font-code text-[clamp(32px,6vw,48px)] font-bold text-line"
        >
          jose-dev
        </p>
        <ul className="m-0 list-none space-y-2 p-0">
          {actions.map((a) => (
            <li key={a.label}>
              <button
                onClick={a.run}
                className="inline-flex items-center gap-3 rounded px-2 py-1 hover:bg-hover hover:text-fg"
              >
                {a.label} {a.keys && <Kbd>{a.keys}</Kbd>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function FileView({ path }: { path: string }) {
  const { editor, dispatch } = useWorkbench()
  const isMarkdown = FILE_MAP.get(path)?.lang === 'markdown'
  const showSource = editor.source.includes(path)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-bg px-4 py-1.5 text-xs text-muted">
        <span className="flex min-w-0 items-center gap-1 truncate">
          {path.split('/').map((part, i, all) => (
            <span key={i} className="inline-flex items-center gap-1">
              {part}
              {i < all.length - 1 && (
                <ChevronRight aria-hidden className="size-3" />
              )}
            </span>
          ))}
        </span>
        {isMarkdown && (
          <button
            onClick={() => dispatch({ type: 'toggleSource', path })}
            className="flex-none text-accent hover:underline"
          >
            {showSource ? 'Ver pré-visualização' : 'Ver código'}
          </button>
        )}
      </div>
      {isMarkdown && !showSource ? (
        <MarkdownView path={path} />
      ) : (
        <CodeView path={path} />
      )}
    </motion.div>
  )
}

export function EditorArea() {
  const { editor } = useWorkbench()
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
  }, [editor.active])

  return (
    <section className="grid min-h-0 min-w-0 grid-rows-[36px_minmax(0,1fr)] md:col-start-3">
      <TabBar />
      <div
        ref={scroller}
        role="tabpanel"
        className="min-h-0 overflow-auto bg-bg"
      >
        {editor.active ? (
          <FileView key={editor.active} path={editor.active} />
        ) : (
          <Empty />
        )}
      </div>
    </section>
  )
}
