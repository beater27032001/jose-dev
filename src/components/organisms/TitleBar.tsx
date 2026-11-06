'use client'

import { useSyncExternalStore } from 'react'

import {
  Maximize2,
  Minus,
  Search,
  SquareTerminal,
  X,
  type LucideIcon,
} from 'lucide-react'

import { Kbd } from '@atoms/Kbd'
import { baseName } from '@domain/files'
import { useWorkbench } from '@providers/WorkbenchProvider'

function WindowButton({
  color,
  icon: Icon,
  label,
  onClick,
}: {
  color: string
  icon: LucideIcon
  label: string
  onClick: () => void
}) {
  return (
    // área de toque de 24px; a bolinha visível continua com 13px
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid size-6 place-items-center rounded-full"
    >
      <span
        className="grid size-[13px] place-items-center rounded-full text-black/65"
        style={{ background: color }}
      >
        <Icon
          aria-hidden
          strokeWidth={3}
          className="size-2 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
        />
      </span>
    </button>
  )
}

// O Safari do iPhone não tem tela cheia para páginas; lá o botão verde abre o terminal.
const noop = () => () => {}
const canFullscreen = () => document.fullscreenEnabled === true

const fullscreen = () =>
  document.fullscreenElement
    ? document.exitFullscreen()
    : document.documentElement.requestFullscreen?.()

export function TitleBar() {
  const {
    editor,
    openPalette,
    isMac,
    dispatch,
    toggleExplorer,
    terminal,
    setTerminal,
  } = useWorkbench()
  const fullscreenOk = useSyncExternalStore(noop, canFullscreen, () => true)
  return (
    <header className="flex h-9 items-center gap-3 border-b border-line bg-bar pr-[max(12px,env(safe-area-inset-right))] pl-[max(12px,env(safe-area-inset-left))] text-[12.5px] text-muted">
      {/* os botões da janela fazem algo de verdade */}
      <div className="group -ml-1.5 flex flex-none">
        <WindowButton
          color="var(--dot-r)"
          icon={X}
          label="Fechar todas as abas"
          onClick={() => dispatch({ type: 'closeAll' })}
        />
        <WindowButton
          color="var(--dot-y)"
          icon={Minus}
          label="Mostrar ou ocultar o explorador"
          onClick={toggleExplorer}
        />
        {fullscreenOk ? (
          <WindowButton
            color="var(--dot-g)"
            icon={Maximize2}
            label="Tela cheia"
            onClick={fullscreen}
          />
        ) : (
          <WindowButton
            color="var(--dot-g)"
            icon={SquareTerminal}
            label="Mostrar ou ocultar o terminal"
            onClick={() => setTerminal(!terminal)}
          />
        )}
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
