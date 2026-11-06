export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-[3px] border border-line px-1 font-code text-[11px] leading-4 text-muted">
      {children}
    </kbd>
  )
}
