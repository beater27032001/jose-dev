'use client'

import { useEffect } from 'react'

import { ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'

import { FileIcon, FolderIcon } from '@atoms/FileIcon'
import { baseName, filesIn, FOLDERS, rootFiles } from '@domain/files'
import { cn } from '@lib/utils'
import { useWorkbench } from '@providers/WorkbenchProvider'

// A cascata de entrada roda só na primeira abertura do explorador.
let booted = false

const itemClass =
  'flex w-full items-center gap-1.5 py-[3px] pr-3 text-left text-[13.5px] whitespace-nowrap text-fg hover:bg-hover focus-visible:bg-hover'

export function ExplorerTree({ onPick }: { onPick: () => void }) {
  const { editor, dispatch } = useWorkbench()
  const animate = !booted
  useEffect(() => {
    booted = true
  }, [])

  let order = 0
  const enter = () => {
    const i = order++
    return animate
      ? {
          initial: { opacity: 0, x: -6 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.25 + i * 0.03, duration: 0.3 },
        }
      : {}
  }

  const fileButton = (path: string, depth: number) => (
    <motion.li key={path} {...enter()}>
      <button
        onClick={() => {
          dispatch({ type: 'open', path })
          onPick()
        }}
        aria-current={editor.active === path ? 'page' : undefined}
        className={cn(
          itemClass,
          depth ? 'pl-[30px]' : 'pl-3.5',
          editor.active === path && 'bg-sel hover:bg-sel',
        )}
      >
        <FileIcon path={path} />
        <span className="truncate">{baseName(path)}</span>
      </button>
    </motion.li>
  )

  return (
    <div className="pb-5">
      <h2 className="m-0 px-3.5 pt-3 pb-2 text-[11px] font-semibold tracking-[.12em] text-muted uppercase">
        Explorador
      </h2>
      <ul className="m-0 list-none p-0">
        {FOLDERS.map((folder) => {
          const open = editor.expanded.includes(folder)
          return (
            <motion.li key={folder} {...enter()}>
              <button
                onClick={() => dispatch({ type: 'toggleFolder', folder })}
                aria-expanded={open}
                className={cn(itemClass, 'pl-1.5')}
              >
                <ChevronRight
                  aria-hidden
                  className={cn(
                    'size-3.5 flex-none text-muted transition-transform',
                    open && 'rotate-90',
                  )}
                />
                <FolderIcon open={open} />
                {folder}
                <span className="ml-auto text-[11px] text-muted tabular-nums">
                  {filesIn(folder).length}
                </span>
              </button>
              {open && (
                <ul className="m-0 list-none p-0">
                  {filesIn(folder).map((f) => fileButton(f.path, 1))}
                </ul>
              )}
            </motion.li>
          )
        })}
        {rootFiles().map((f) => fileButton(f.path, 0))}
      </ul>
    </div>
  )
}
