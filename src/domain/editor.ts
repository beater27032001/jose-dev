import { FILE_MAP, filesIn, README } from './files.ts'

export interface EditorState {
  open: string[]
  active: string | null
  /** Arquivos Markdown mostrados como código em vez de pré-visualização. */
  source: string[]
  expanded: string[]
}

export type EditorAction =
  | { type: 'open'; path: string }
  | { type: 'close'; path: string }
  | { type: 'closeAll' }
  | { type: 'toggleSource'; path: string }
  | { type: 'toggleFolder'; folder: string }

export const initialEditor = (first = README): EditorState => ({
  open: first === README ? [README] : [README, first],
  active: first,
  source: [],
  expanded: ['trabalho', 'experimentos'],
})

const toggle = (list: string[], item: string) =>
  list.includes(item) ? list.filter((i) => i !== item) : [...list, item]

export function editorReducer(
  state: EditorState,
  action: EditorAction,
): EditorState {
  switch (action.type) {
    case 'open': {
      // uma pasta abre o primeiro arquivo dela e garante a pasta expandida
      const folder = action.path.endsWith('/') ? action.path.slice(0, -1) : null
      const path = folder ? filesIn(folder)[0]?.path : action.path
      if (!path || !FILE_MAP.has(path)) return state
      return {
        ...state,
        open: state.open.includes(path) ? state.open : [...state.open, path],
        active: path,
        expanded:
          folder && !state.expanded.includes(folder)
            ? [...state.expanded, folder]
            : state.expanded,
      }
    }
    case 'close': {
      const i = state.open.indexOf(action.path)
      if (i < 0) return state
      const open = state.open.filter((p) => p !== action.path)
      const active =
        state.active === action.path
          ? (open[Math.min(i, open.length - 1)] ?? null)
          : state.active
      return { ...state, open, active }
    }
    case 'closeAll':
      return { ...state, open: [], active: null }
    case 'toggleSource':
      return { ...state, source: toggle(state.source, action.path) }
    case 'toggleFolder':
      return { ...state, expanded: toggle(state.expanded, action.folder) }
  }
}
