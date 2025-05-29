'use client'

import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

export default function NotesPage() {
  const { user, notes } = useAuth()

  useEffect(() => {
    if (!user) {
      window.location.href = '/signin'
    }
  }, [user])

  if (!user) return null

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Your Notes</h2>
      {notes.length === 0 && <p className="text-gray-600">No notes yet.</p>}
      <div className="grid gap-4">
        {notes.map(note => (
          <div
            key={note.id}
            className="bg-yellow-100 border border-yellow-300 p-4 rounded shadow"
          >
            <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
            <p className="whitespace-pre-line">{note.content}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
