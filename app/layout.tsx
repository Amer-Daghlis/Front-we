import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Human Rights',
  description: 'Created with Amer Daghlis',
  generator: 'Amer Daghlis',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
