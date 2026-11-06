'use client'

import { Check, GitBranch, SquareTerminal } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { FILE_MAP, LANG_LABEL } from '@domain/files'
import { useWorkbench } from '@providers/WorkbenchProvider'

export function StatusBar() {
  const { editor, cursor, status, terminal, setTerminal } = useWorkbench()
  const file = editor.active ? FILE_MAP.get(editor.active) : null
  return (
    <footer className="flex h-6 items-center gap-4 overflow-hidden bg-accent pr-[max(12px,env(safe-area-inset-right))] pl-[max(12px,env(safe-area-inset-left))] text-xs whitespace-nowrap text-on-accent">
      <span className="inline-flex items-center gap-1">
        <GitBranch aria-hidden className="size-3.5" /> main
      </span>
      <span className="inline-flex items-center gap-1 max-sm:hidden">
        <Check aria-hidden className="size-3.5" /> 0 problemas
      </span>
      <AnimatePresence>
        {status && (
          <motion.span
            role="status"
            key={status}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="truncate font-medium"
          >
            {status}
          </motion.span>
        )}
      </AnimatePresence>
      <div className="ml-auto flex items-center gap-4">
        {file && (
          <>
            <span className="tabular-nums max-sm:hidden">
              Ln {cursor.line}, Col {cursor.col}
            </span>
            <span>{LANG_LABEL[file.lang]}</span>
            <span className="max-sm:hidden">UTF-8</span>
          </>
        )}
        <button
          onClick={() => setTerminal(!terminal)}
          aria-pressed={terminal}
          className="inline-flex items-center gap-1 rounded-sm px-1 hover:bg-black/10"
        >
          <SquareTerminal aria-hidden className="size-3.5" /> Terminal
        </button>
      </div>
    </footer>
  )
}
