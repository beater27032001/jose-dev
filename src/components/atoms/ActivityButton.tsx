import type { LucideIcon } from 'lucide-react'

import { cn } from '@lib/utils'

interface Props {
  icon: LucideIcon
  label: string
  shortcut?: string
  pressed?: boolean
  onClick: () => void
}

export function ActivityButton({
  icon: Icon,
  label,
  shortcut,
  pressed,
  onClick,
}: Props) {
  return (
    <button
      aria-label={label}
      aria-pressed={pressed}
      title={shortcut ? `${label} (${shortcut})` : label}
      onClick={onClick}
      className={cn(
        'relative grid size-10 place-items-center rounded-md text-muted transition-colors hover:text-fg',
        'before:absolute before:inset-y-1.5 before:left-[-4px] before:w-0.5 before:rounded-full before:bg-accent before:opacity-0 before:transition-opacity',
        pressed && 'text-fg before:opacity-100',
      )}
    >
      <Icon className="size-5" strokeWidth={1.6} />
    </button>
  )
}
