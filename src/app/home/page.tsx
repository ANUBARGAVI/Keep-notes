'use client'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const { user, notes, addNote, editNote, deleteNote } = useAuth()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!user) {
      window.location.href = '/signin'
    }
  }, [user])

  const handleAdd = () => {
    if (title.trim() && content.trim()) {
      addNote(title, content)
      setTitle('')
      setContent('')
      setShowModal(false)
    }
  }

  const handleEdit = () => {
    if (editingId && title.trim() && content.trim()) {
      editNote(editingId, title, content)
      setTitle('')
      setContent('')
      setEditingId(null)
      setShowModal(false)
    }
  }

  const startEditing = (id: string, title: string, content: string) => {
    setEditingId(id)
    setTitle(title)
    setContent(content)
    setShowModal(true)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setTitle('')
    setContent('')
    setShowModal(false)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-yellow-100 p-6 relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Good Morning {user}!</h2>

      {/* Floating Add Note Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-orange-500 text-white text-2xl w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600"
      >
        +
      </button>

      {/* Note Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? 'Edit Note' : 'Add New Note'}
            </h3>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border border-gray-400 rounded mb-2"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Content"
              className="w-full p-2 border border-gray-400 rounded mb-2"
              rows={4}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              {editingId ? (
                <button
                  onClick={handleEdit}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleAdd}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add
                </button>
              )}
              <button
                onClick={cancelEditing}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Your Notes</h3>
        {notes.length === 0 && (
          <p className="text-gray-600">No notes yet. Start adding some!</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {notes.map(note => (
            <div
              key={note.id}
              className="relative bg-white border border-gray-300 rounded-lg shadow-md p-4"
            >
              {/* Cross delete button */}
              <button
                onClick={() => deleteNote(note.id)}
                className="absolute top-2 right-2 text-red-500 text-lg font-bold hover:text-red-700"
                aria-label="Delete note"
              >
                &times;
              </button>

              <h4 className="font-semibold text-lg text-gray-800 mb-1">{note.title}</h4>
              <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
              <div className="mt-3">
                <button
                  onClick={() => startEditing(note.id, note.title, note.content)}
                  className="text-sm text-yellow-600 hover:underline"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
