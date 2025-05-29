'use client'

import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function SignInPage() {
  const { signin } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!signin(username, password)) {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="min-h-screen bg-[#fef6e4] flex flex-col items-center justify-center">
      <div className="w-80 border rounded-md shadow-lg bg-[#fff1e6]">
        <div className="flex justify-between items-center px-3 py-2 bg-[#f4a261] text-white rounded-t-md">
          <span className="font-bold">Login</span>
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
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded mb-3"
            value={username}
            onChange={e => setUsername(e.target.value)}
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
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-[#f4a261] text-white px-4 py-2 rounded hover:bg-[#e76f51]"
            >
              Login
            </button>
            <a
              href="/signup"
              className="bg-[#9ecae3] text-white px-4 py-2 rounded hover:bg-[#74accf]"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
