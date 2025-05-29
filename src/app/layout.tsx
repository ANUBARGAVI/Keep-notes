
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Keeper Notes',
  description: 'Simple note-taking app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' min-h-screen'} style={{ backgroundColor: '#FFE99A' }}>

        <AuthProvider>
          <Navbar />
          <main className="p-6 max-w-3xl mx-auto">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
