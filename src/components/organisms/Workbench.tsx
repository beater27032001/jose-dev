'use client'

import { motion } from 'motion/react'

import { ActivityBar } from './ActivityBar'
import { EditorArea } from './EditorArea'
import { Explorer } from './Explorer'
import { StatusBar } from './StatusBar'
import { TitleBar } from './TitleBar'

export function Workbench() {
  return (
    <motion.div
      className="grid h-dvh grid-rows-[36px_minmax(0,1fr)_auto_24px] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <TitleBar />
      <div className="relative grid min-h-0 grid-cols-[48px_minmax(0,1fr)] pl-[env(safe-area-inset-left)] md:grid-cols-[48px_auto_minmax(0,1fr)]">
        <ActivityBar />
        <Explorer />
        <EditorArea />
      </div>
      <div />
      <StatusBar />
    </motion.div>
  )
}
