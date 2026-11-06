'use client'

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'

import {
  editorReducer,
  initialEditor,
  type EditorAction,
  type EditorState,
} from '@domain/editor'
import { FILE_MAP } from '@domain/files'
import type { Effect, Line } from '@domain/terminal'
import type { Tokens } from '@lib/highlight'

export type Theme = 'light' | 'dark'

// O tema mora no <html data-theme> (definido antes da pintura pelo layout).
const themeListeners = new Set<() => void>()
const themeStore = {
  subscribe(listener: () => void) {
    themeListeners.add(listener)
    return () => themeListeners.delete(listener)
  },
  get: (): Theme =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  set(theme: Theme) {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {}
    themeListeners.forEach((l) => l())
  },
}

const noop = () => () => {}
const isMacClient = () => /Mac|iPhone|iPad/.test(navigator.platform)

const isNarrow = () => matchMedia('(max-width: 767px)').matches

interface Workbench {
  tokens: Tokens
  editor: EditorState
  dispatch: (action: EditorAction) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  isMac: boolean
  /** Explorador: coluna fixa no desktop, gaveta no celular. */
  sidebar: boolean
  drawer: boolean
  toggleExplorer: () => void
  closeDrawer: () => void
  terminal: boolean
  setTerminal: (open: boolean) => void
  palette: string | null
  openPalette: (prefix?: string) => void
  closePalette: () => void
  lines: Line[]
  print: (lines: Line[]) => void
  status: string | null
  flash: (message: string) => void
  cursor: { line: number; col: number }
  setCursor: (cursor: { line: number; col: number }) => void
  exec: (effect: Effect) => void
}

const WorkbenchContext = createContext<Workbench | null>(null)

export function WorkbenchProvider({
  tokens,
  children,
}: {
  tokens: Tokens
  children: React.ReactNode
}) {
  const [editor, editorDispatch] = useReducer(editorReducer, undefined, () =>
    initialEditor(),
  )
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.get,
    () => 'dark' as Theme,
  )
  const isMac = useSyncExternalStore(noop, isMacClient, () => false)
  const [sidebar, setSidebar] = useState(true)
  const [drawer, setDrawer] = useState(false)
  const [terminal, setTerminal] = useState(false)
  const [palette, setPalette] = useState<string | null>(null)
  const [lines, setLines] = useState<Line[]>([
    { text: 'Digite help para ver os comandos.', tone: 'dim' },
  ])
  const [status, setStatus] = useState<string | null>(null)
  const [cursor, setCursor] = useState({ line: 1, col: 1 })
  const statusTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  // abrir outro arquivo leva o cursor para o começo, como no editor
  const dispatch = useCallback((action: EditorAction) => {
    if (action.type === 'open') setCursor({ line: 1, col: 1 })
    editorDispatch(action)
  }, [])

  const flash = useCallback((message: string) => {
    setStatus(message)
    clearTimeout(statusTimer.current)
    statusTimer.current = setTimeout(() => setStatus(null), 2400)
  }, [])

  const exec = useCallback(
    (effect: Effect) => {
      switch (effect.type) {
        case 'open':
          dispatch({ type: 'open', path: effect.path })
          return
        case 'theme':
          themeStore.set(effect.theme)
          return
        case 'clear':
          setLines([])
          return
        case 'copy':
          navigator.clipboard?.writeText(effect.text).then(
            () => flash('E-mail copiado'),
            () => flash(effect.text),
          )
          return
        case 'download': {
          const a = document.createElement('a')
          a.href = effect.url
          a.download = ''
          a.click()
          flash('Baixando o CV')
          return
        }
        case 'external':
          window.open(effect.url, '_blank', 'noopener,noreferrer')
      }
    },
    [flash, dispatch],
  )

  // O arquivo ativo fica no endereço (#/sobre.md), para dar para compartilhar o link.
  useEffect(() => {
    const fromHash = () => {
      const path = decodeURIComponent(location.hash.replace(/^#\/?/, ''))
      if (FILE_MAP.has(path)) dispatch({ type: 'open', path })
    }
    fromHash()
    addEventListener('hashchange', fromHash)
    return () => removeEventListener('hashchange', fromHash)
  }, [dispatch])
  useEffect(() => {
    const url = editor.active ? `#/${editor.active}` : location.pathname
    if (location.hash !== (editor.active ? url : ''))
      history.replaceState(null, '', url)
    document.title = editor.active
      ? `${editor.active.split('/').pop()} · José Paiva`
      : 'José Paiva · Engenheiro de Software Full-Stack'
  }, [editor.active])

  const value: Workbench = {
    tokens,
    editor,
    dispatch,
    theme,
    setTheme: themeStore.set,
    isMac,
    sidebar,
    drawer,
    toggleExplorer: () =>
      isNarrow() ? setDrawer((d) => !d) : setSidebar((s) => !s),
    closeDrawer: () => setDrawer(false),
    terminal,
    setTerminal,
    palette,
    openPalette: (prefix = '') => setPalette(prefix),
    closePalette: () => setPalette(null),
    lines,
    print: (next) => setLines((l) => [...l, ...next]),
    status,
    flash,
    cursor,
    setCursor,
    exec,
  }

  return <WorkbenchContext value={value}>{children}</WorkbenchContext>
}

export const useWorkbench = () => use(WorkbenchContext)!
