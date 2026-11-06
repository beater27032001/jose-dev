'use client'

import { useShortcuts } from '@hooks/useShortcuts'

import { ActivityBar } from './ActivityBar'
import { CommandPalette } from './CommandPalette'
import { EditorArea } from './EditorArea'
import { Explorer } from './Explorer'
import { StatusBar } from './StatusBar'
import { Terminal } from './Terminal'
import { TitleBar } from './TitleBar'

export function Workbench() {
  useShortcuts()
  return (
    <div className="grid h-dvh grid-rows-[36px_minmax(0,1fr)_auto_24px] overflow-hidden">
      <TitleBar />
      <div className="relative grid min-h-0 grid-cols-[48px_minmax(0,1fr)] pl-[env(safe-area-inset-left)] md:grid-cols-[48px_auto_minmax(0,1fr)]">
        <ActivityBar />
        <Explorer />
        <EditorArea />
      </div>
      <Terminal />
      <StatusBar />
      <CommandPalette />
    </div>
  )
}
