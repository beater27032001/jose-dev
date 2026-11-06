import { Braces, FileCode2, FileText, Folder, FolderOpen } from 'lucide-react'

import { cn } from '@lib/utils'

const BY_EXT = {
  md: { Icon: FileText, color: 'text-[var(--i-md)]' },
  tsx: { Icon: FileCode2, color: 'text-[var(--i-tsx)]' },
  ts: { Icon: FileCode2, color: 'text-[var(--i-ts)]' },
  json: { Icon: Braces, color: 'text-[var(--i-json)]' },
} as const

export function FileIcon({
  path,
  className,
}: {
  path: string
  className?: string
}) {
  const ext = path.split('.').pop() as keyof typeof BY_EXT
  const { Icon, color } = BY_EXT[ext] ?? BY_EXT.md
  return (
    <Icon
      aria-hidden
      className={cn('size-4 flex-none', color, className)}
      strokeWidth={1.75}
    />
  )
}

export function FolderIcon({ open }: { open: boolean }) {
  const Icon = open ? FolderOpen : Folder
  return (
    <Icon
      aria-hidden
      className="size-4 flex-none text-muted"
      strokeWidth={1.75}
    />
  )
}
