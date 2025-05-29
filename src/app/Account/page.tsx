'use client'

import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

export default function AccountPage() {
  const { user, signout, notes } = useAuth()

  useEffect(() => {
    if (!user) {
      window.location.href = '/signin'
    }
  }, [user])

  if (!user) return null

  return (
    <main className="max-w-xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Account Details</h2>
      
      <div className="mb-6">
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Username:</span> {user}
        </p>
        <p className="text-gray-700 text-lg mt-2">
          <span className="font-semibold">Total Notes:</span> {notes.length}
        </p>
      </div>

      <button
        onClick={signout}
        className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
      >
        Sign Out
      </button>
    </main>
  )
}
