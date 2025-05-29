'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Note {
  id: string
  title: string
  content: string
}

interface AuthContextType {
  user: string | null
  notes: Note[]
  signin: (username: string, password: string) => boolean
  signup: (username: string, password: string) => boolean
  signout: () => void
  addNote: (title: string, content: string) => void
  editNote: (id: string, title: string, content: string) => void
  deleteNote: (id: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  const router = useRouter()

  
  useEffect(() => {
    const storedUser = localStorage.getItem('keeperUser')
    const storedNotes = localStorage.getItem('keeperNotes')
    if (storedUser) setUser(storedUser)
    if (storedNotes) setNotes(JSON.parse(storedNotes))
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem('keeperUser', user)
    } else {
      localStorage.removeItem('keeperUser')
      localStorage.removeItem('keeperNotes')
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem('keeperNotes', JSON.stringify(notes))
  }, [notes])

  const signin = (username: string, password: string) => {
    
    const ENV_PASS = process.env.NEXT_PUBLIC_PASSWORD || 'keeper123'
    if (password === ENV_PASS && username.trim()) {
      setUser(username.trim())
      router.push('/home')
      return true
    }
    return false
  }

  const signup = (username: string, password: string) => {
    
    const ENV_PASS = process.env.NEXT_PUBLIC_PASSWORD || 'keeper123'
    if (password === ENV_PASS && username.trim()) {
      setUser(username.trim())
      router.push('/home')
      return true
    }
    return false
  }

  const signout = () => {
    setUser(null)
    router.push('/signin')
  }

  const addNote = (title: string, content: string) => {
    const newNote = { id: Date.now().toString(), title, content }
    setNotes(prev => [newNote, ...prev])
  }

  const editNote = (id: string, title: string, content: string) => {
    setNotes(prev =>
      prev.map(note => (note.id === id ? { ...note, title, content } : note))
    )
  }

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id))
  }

  return (
    <AuthContext.Provider
      value={{ user, notes, signin, signup, signout, addNote, editNote, deleteNote }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
