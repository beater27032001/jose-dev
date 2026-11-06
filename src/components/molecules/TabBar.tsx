'use client'

import { useEffect, useRef } from 'react'

import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { FileIcon } from '@atoms/FileIcon'
import { baseName } from '@domain/files'
import { cn } from '@lib/utils'
import { useWorkbench } from '@providers/WorkbenchProvider'

export function TabBar() {
  const { editor, dispatch } = useWorkbench()
  const bar = useRef<HTMLDivElement>(null)

  // mantém a aba ativa visível quando a barra rola
  useEffect(() => {
    bar.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [editor.active])

  return (
    <div
      ref={bar}
      role="tablist"
      aria-label="Arquivos abertos"
      className="flex [scrollbar-width:none] overflow-x-auto border-b border-line bg-bar [&::-webkit-scrollbar]:hidden"
    >
      <AnimatePresence initial={false}>
        {editor.open.map((path) => {
          const active = editor.active === path
          return (
            <motion.div
              key={path}
              layout
              role="tab"
              tabIndex={0}
              aria-selected={active}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => dispatch({ type: 'open', path })}
              onAuxClick={(e) =>
                e.button === 1 && dispatch({ type: 'close', path })
              }
              onKeyDown={(e) =>
                e.key === 'Enter' && dispatch({ type: 'open', path })
              }
              className={cn(
                'flex flex-none cursor-pointer items-center gap-2 overflow-hidden border-r border-line pr-1.5 pl-3.5 text-[13px] whitespace-nowrap',
                active
                  ? 'bg-bg text-fg shadow-[inset_0_2px_0_var(--accent)]'
                  : 'bg-bar text-muted hover:text-fg',
              )}
            >
              <FileIcon path={path} />
              {baseName(path)}
              <button
                aria-label={`Fechar ${baseName(path)}`}
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch({ type: 'close', path })
                }}
                className={cn(
                  'grid size-5 place-items-center rounded text-muted hover:bg-hover hover:text-fg',
                  !active && 'opacity-60',
                )}
              >
                <X aria-hidden className="size-3.5" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
