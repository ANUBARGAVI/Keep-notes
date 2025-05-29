'use client'

import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'

const defaultFrontendNotes = [
  {
    id: '1',
    title: 'React Basics',
    content: 'React is a JavaScript library for building user interfaces. Key concepts include components, props, and state.',
  },
  {
    id: '2',
    title: 'Next.js Overview',
    content: 'Next.js is a React framework that enables server-side rendering and static site generation.',
  },
  {
    id: '3',
    title: 'Tailwind CSS',
    content: 'Tailwind CSS is a utility-first CSS framework for rapid UI development.',
  },
]

export default function NotesPage() {
  const { user, notes, addNote, deleteNote, editNote } = useAuth()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  // Add default notes if no notes exist
  useEffect(() => {
    if (user && notes.length === 0) {
      defaultFrontendNotes.forEach(note => {
        addNote(note.title, note.content)
      })
    }
  }, [user, notes.length, addNote])

  useEffect(() => {
    if (!user) {
      window.location.href = '/signin'
    }
  }, [user])

  if (!user) return null

  const startEditing = (id: string, title: string, content: string) => {
    setEditingId(id)
    setEditTitle(title)
    setEditContent(content)
  }

  const saveEdit = () => {
    if (editingId && editTitle.trim() && editContent.trim()) {
      editNote(editingId, editTitle, editContent)
      setEditingId(null)
      setEditTitle('')
      setEditContent('')
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
    setEditContent('')
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Your Notes</h2>
      {notes.length === 0 && <p className="text-gray-600">No notes yet.</p>}
      <div className="grid gap-4">
        {notes.map(note =>
          editingId === note.id ? (
            <div
              key={note.id}
              className="relative bg-yellow-100 border border-yellow-300 p-4 rounded shadow"
            >
              <input
                type="text"
                className="w-full p-2 border rounded mb-2"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
              />
              <textarea
                className="w-full p-2 border rounded mb-2"
                rows={3}
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
              />
              <div className="flex space-x-2">
                <button
                  onClick={saveEdit}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              key={note.id}
              className="relative bg-yellow-100 border border-yellow-300 p-4 rounded shadow"
            >
              {/* Cross Mark Button */}
              <button
                onClick={() => deleteNote(note.id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl"
                title="Delete Note"
              >
                ×
              </button>

              <h3 className="font-semibold text-lg mb-2 pr-6">{note.title}</h3>
              <p className="whitespace-pre-line">{note.content}</p>
              <div className="mt-2">
                <button
                  onClick={() => startEditing(note.id, note.title, note.content)}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  )
}
