'use client'

import {
  Files,
  FileDown,
  Mail,
  Moon,
  Search,
  SquareTerminal,
  Sun,
} from 'lucide-react'

import { ActivityButton } from '@atoms/ActivityButton'
import { CONTACT } from '@domain/profile'
import { useWorkbench } from '@providers/WorkbenchProvider'

export function ActivityBar() {
  const wb = useWorkbench()
  const mod = wb.isMac ? '⌘' : 'Ctrl'
  return (
    <nav
      aria-label="Barra de atividade"
      className="flex flex-col items-center gap-1 border-r border-line bg-bar py-2"
    >
      <ActivityButton
        icon={Files}
        label="Explorador"
        shortcut={`${mod} B`}
        pressed={wb.sidebar || wb.drawer}
        onClick={wb.toggleExplorer}
      />
      <ActivityButton
        icon={Search}
        label="Buscar"
        shortcut={`${mod} K`}
        onClick={() => wb.openPalette()}
      />
      <ActivityButton
        icon={SquareTerminal}
        label="Terminal"
        shortcut="Ctrl `"
        pressed={wb.terminal}
        onClick={() => wb.setTerminal(!wb.terminal)}
      />
      <ActivityButton
        icon={wb.theme === 'dark' ? Sun : Moon}
        label={wb.theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
        onClick={() => wb.setTheme(wb.theme === 'dark' ? 'light' : 'dark')}
      />
      <div className="mt-auto flex flex-col gap-1">
        <ActivityButton
          icon={Mail}
          label="Copiar e-mail"
          onClick={() => wb.exec({ type: 'copy', text: CONTACT.email })}
        />
        <ActivityButton
          icon={FileDown}
          label="Baixar CV"
          onClick={() => wb.exec({ type: 'download', url: CONTACT.cv })}
        />
      </div>
    </nav>
  )
}
