import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google'

import './globals.css'

const code = JetBrains_Mono({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-jetbrains',
})
const ui = IBM_Plex_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-plex',
})

export const metadata: Metadata = {
  title: 'José Paiva · Engenheiro de Software Full-Stack',
  description:
    'Portfólio de José Paiva, Engenheiro de Software Full-Stack em Recife. Web, mobile e back-end em produção, apresentados como um editor de código.',
  metadataBase: new URL('https://www.josepaivadev.com'),
  openGraph: {
    title: 'José Paiva · Engenheiro de Software Full-Stack',
    description: 'Web, mobile e back-end em produção. Abra os arquivos.',
    locale: 'pt_BR',
    type: 'website',
  },
}

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0b0d10' },
    { media: '(prefers-color-scheme: light)', color: '#e8e8e4' },
  ],
}

// Aplica o tema antes da primeira pintura, sem piscar: preferência salva ou a do sistema.
const THEME_SCRIPT = `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${code.variable} ${ui.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
