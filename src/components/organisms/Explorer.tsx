'use client'

import { AnimatePresence, motion } from 'motion/react'

import { EASE } from '@constants/motion'
import { ExplorerTree } from '@molecules/ExplorerTree'
import { useWorkbench } from '@providers/WorkbenchProvider'

export function Explorer() {
  const { sidebar, drawer, closeDrawer } = useWorkbench()
  return (
    <>
      {sidebar && (
        <aside
          aria-label="Explorador"
          className="w-60 overflow-auto border-r border-line bg-side max-md:hidden"
        >
          <ExplorerTree onPick={() => {}} />
        </aside>
      )}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              aria-hidden
              className="fixed inset-x-0 top-9 bottom-6 z-20 bg-black/35 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />
            <motion.aside
              aria-label="Explorador"
              className="fixed top-9 bottom-6 left-[calc(48px+env(safe-area-inset-left))] z-30 w-[min(280px,78vw)] overflow-auto border-r border-line bg-side shadow-[12px_0_32px_rgb(0_0_0/.35)] md:hidden"
              initial={{ x: '-105%' }}
              animate={{ x: 0 }}
              exit={{ x: '-105%' }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <ExplorerTree onPick={closeDrawer} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
