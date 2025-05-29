'use client'

import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function SignUpPage() {
  const { signup } = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    if (!signup(username, password)) {
      setError('Signup failed')
    }
  }

  return (
    <div className="min-h-screen bg-[#fef6e4] flex flex-col items-center justify-center">
      <div className="w-80 border rounded-md shadow-lg bg-[#fff1e6]">
        <div className="flex justify-between items-center px-3 py-2 bg-[#f4a261] text-white rounded-t-md">
          <span className="font-bold">Sign Up</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded mb-3"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded mb-3"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded mb-3"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 border border-gray-300 rounded mb-3"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Register
            </button>
            <a
              href="/signin"
              className="bg-[#f4a261] text-white px-4 py-2 rounded hover:bg-[#e76f51]"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
