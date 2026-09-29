import type { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
}

export function Section({ title, children }: Props) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  )
}
