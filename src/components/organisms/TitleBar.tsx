'use client'

import { Search } from 'lucide-react'

import { Kbd } from '@atoms/Kbd'
import { baseName } from '@domain/files'
import { useWorkbench } from '@providers/WorkbenchProvider'

export function TitleBar() {
  const { editor, openPalette, isMac } = useWorkbench()
  return (
    <header className="flex h-9 items-center gap-3 border-b border-line bg-bar pr-[max(12px,env(safe-area-inset-right))] pl-[max(12px,env(safe-area-inset-left))] text-[12.5px] text-muted">
      <div aria-hidden className="flex flex-none gap-[7px]">
        <i className="size-[11px] rounded-full bg-[var(--dot-r)]" />
        <i className="size-[11px] rounded-full bg-[var(--dot-y)]" />
        <i className="size-[11px] rounded-full bg-[var(--dot-g)]" />
      </div>
      <p className="m-0 min-w-0 flex-1 truncate text-center max-md:hidden">
        jose-dev — {editor.active ? baseName(editor.active) : 'boas-vindas'}
      </p>
      <button
        onClick={() => openPalette()}
        className="ml-auto inline-flex min-w-0 items-center gap-2 rounded-md border border-line bg-side px-2.5 py-[3px] text-xs text-muted transition-colors hover:border-muted hover:text-fg md:ml-0"
      >
        <Search aria-hidden className="size-3.5 flex-none" />
        <span className="truncate">Buscar arquivo ou comando</span>
        <span className="max-sm:hidden">
          <Kbd>{isMac ? '⌘' : 'Ctrl'} K</Kbd>
        </span>
      </button>
    </header>
  )
}
