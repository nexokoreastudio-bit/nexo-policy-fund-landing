import type { ReactNode } from 'react'

type BadgeProps = {
  children: ReactNode
}

function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
      {children}
    </span>
  )
}

export default Badge
