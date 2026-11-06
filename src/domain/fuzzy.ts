export interface Match {
  score: number
  /** Índices das letras encontradas, para destacar. */
  hits: number[]
}

/** Busca aproximada: as letras da consulta aparecem em ordem; sequências seguidas valem mais. */
export function fuzzy(query: string, text: string): Match | null {
  if (!query) return { score: 0, hits: [] }
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  const hits: number[] = []
  let score = 0
  let streak = 0
  let qi = 0
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) {
      hits.push(i)
      streak++
      score += 1 + streak
      qi++
    } else streak = 0
  }
  return qi === q.length ? { score, hits } : null
}
