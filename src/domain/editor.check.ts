// Rode com: npm run check
import assert from 'node:assert/strict'

import { editorReducer, initialEditor } from './editor.ts'
import { FILE_MAP, findFile } from './files.ts'
import { fuzzy } from './fuzzy.ts'
import { complete, run } from './terminal.ts'

// editor
let s = initialEditor()
assert.deepEqual(s.open, ['README.md'])
s = editorReducer(s, { type: 'open', path: 'sobre.md' })
s = editorReducer(s, { type: 'open', path: 'sobre.md' })
assert.deepEqual(s.open, ['README.md', 'sobre.md'], 'não duplica aba')
s = editorReducer(s, { type: 'close', path: 'sobre.md' })
assert.equal(s.active, 'README.md', 'fechar a aba ativa ativa a vizinha')
s = editorReducer(s, { type: 'open', path: 'trabalho/' })
assert.equal(
  s.active,
  'trabalho/gestao-arquitetonica.tsx',
  'pasta abre o primeiro arquivo',
)
assert.equal(
  editorReducer(s, { type: 'open', path: 'nada.md' }),
  s,
  'arquivo inexistente não muda nada',
)
s = editorReducer(s, { type: 'closeAll' })
assert.equal(s.active, null)

// arquivos
assert.ok(FILE_MAP.get('experiencia.json'))
JSON.parse(FILE_MAP.get('experiencia.json')!.text)
assert.equal(findFile('novocred')?.path, 'trabalho/novocred.tsx')

// busca
assert.ok(fuzzy('rdm', 'README.md'))
assert.equal(fuzzy('xyz', 'README.md'), null)
assert.ok(
  fuzzy('read', 'README.md')!.score > fuzzy('rdme', 'README.md')!.score,
  'sequência vale mais',
)

// terminal
assert.deepEqual(
  run('open contato').effect,
  { type: 'open', path: 'contato.ts' },
  'aceita o nome sem extensão',
)
assert.deepEqual(run('open contato.ts').effect, {
  type: 'open',
  path: 'contato.ts',
})
assert.equal(run('xyz').lines[0].tone, 'err')
assert.equal(run('theme claro').effect?.type, 'theme')
assert.equal(run('sudo contratar').effect?.type, 'open')
assert.equal(complete('op'), 'open')
assert.equal(complete('cat sob'), 'cat sobre.md')
console.log('editor ok')
