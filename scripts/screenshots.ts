// Gera os prints do README: npm run build && npm run screenshots
import { spawn } from 'node:child_process'

import { chromium, type Page } from 'playwright'

interface Shot {
  name: string
  width: number
  height: number
  theme: 'dark' | 'light'
  hash?: string
  /** Prepara a página antes do print (abrir paleta, terminal, gaveta). */
  setup?: (page: Page) => Promise<void>
}

const palette = (query: string) => async (page: Page) => {
  await page.keyboard.press('Control+k')
  await page.keyboard.type(query, { delay: 40 })
}
const terminal =
  (...commands: string[]) =>
  async (page: Page) => {
    await page.locator('footer button').click()
    for (const c of commands) {
      await page.keyboard.type(c, { delay: 20 })
      await page.keyboard.press('Enter')
    }
  }

const SHOTS: Shot[] = [
  { name: 'desktop', width: 1440, height: 900, theme: 'dark' },
  {
    name: 'desktop-palette',
    width: 1440,
    height: 900,
    theme: 'dark',
    setup: palette('nov'),
  },
  {
    name: 'desktop-terminal',
    width: 1440,
    height: 900,
    theme: 'dark',
    hash: '#/experiencia.json',
    setup: terminal('whoami', 'projetos'),
  },
  {
    name: 'desktop-light',
    width: 1440,
    height: 900,
    theme: 'light',
    hash: '#/trabalho/novocred.tsx',
  },
  { name: 'tablet', width: 820, height: 1180, theme: 'light' },
  { name: 'mobile', width: 390, height: 844, theme: 'dark' },
  {
    name: 'mobile-explorer',
    width: 390,
    height: 844,
    theme: 'dark',
    setup: (p) =>
      p.getByRole('button', { name: 'Explorador', exact: true }).click(),
  },
]

const server = spawn('node_modules/.bin/next', ['start', '-p', '4173'])
await new Promise((resolve, reject) => {
  server.stdout.on('data', (d) => String(d).includes('Ready') && resolve(null))
  server.on('exit', (code) => reject(new Error(`next start saiu com ${code}`)))
})
const browser = await chromium.launch()
const errors: string[] = []

for (const shot of SHOTS) {
  const context = await browser.newContext({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 2,
    colorScheme: shot.theme,
  })
  const page = await context.newPage()
  page.on('pageerror', (e) => errors.push(`${shot.name}: ${e.message}`))
  await page.goto(`http://localhost:4173/${shot.hash ?? ''}`, {
    waitUntil: 'networkidle',
  })
  await page.waitForTimeout(2200)
  if (shot.setup) {
    await shot.setup(page)
    await page.waitForTimeout(900)
  }
  await page.screenshot({ path: `docs/${shot.name}.png` })
  await context.close()
}

await browser.close()
server.kill()
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log('prints salvos em docs/')
