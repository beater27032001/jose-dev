'use client'

import { useEffect } from 'react'

import { useWorkbench } from '@providers/WorkbenchProvider'

/** Atalhos do editor: paleta, terminal, explorador e Esc. */
export function useShortcuts() {
  const wb = useWorkbench()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey
      const key = e.key.toLowerCase()
      if (mod && (key === 'k' || key === 'p')) {
        e.preventDefault()
        if (wb.palette !== null) wb.closePalette()
        else wb.openPalette(e.shiftKey ? '>' : '')
      } else if (e.ctrlKey && e.key === '`') {
        e.preventDefault()
        wb.setTerminal(!wb.terminal)
      } else if (mod && key === 'b') {
        e.preventDefault()
        wb.toggleExplorer()
      } else if (e.key === 'Escape' && wb.drawer) wb.closeDrawer()
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [wb])
}
