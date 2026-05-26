'use client'

import { Providers } from './Providers'
import { Navbar } from './Navbar'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Navbar />
      {children}
    </Providers>
  )
}
