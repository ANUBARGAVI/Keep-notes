'use client'

import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, signout } = useAuth()

  return (
    <nav className="border-t-4  bg-[#c7d7df] text-sm font-mono">
      <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="font-semibold">Keep Notes</h1>
        <div className="flex space-x-4">
        <Link href="/home" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/notes" className="hover:underline">Notes</Link>
          <Link href="/account" className="hover:underline">Account</Link>
          {user ? (
            <button
              onClick={signout}
              className="text-red-600 hover:underline"
              aria-label="Logout"
            >
              Logout
            </button>
          ) : (
            <Link href="/signin" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
