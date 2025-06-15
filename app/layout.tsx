import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Human Rights',
  description: 'Created by Amer Daghlis',
  generator: 'Amer Daghlis the King of the World', 
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
