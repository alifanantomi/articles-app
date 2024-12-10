'use client'

import { useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

interface RegisterFormData {
  email: string
  password: string
  name: string
}

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    name: ''
  })
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    router.push('/dashboard')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat registrasi')
      }

      redirect('/dashboard')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Registrasi</h1>
        
        <div>
          <label className="block mb-1">Nama</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Memproses...' : 'Daftar'}
        </button>

        <div className="text-center mt-4">
          <Link href="/auth/signin" className="text-blue-500 hover:text-blue-600">
            Sudah punya akun? Login
          </Link>
        </div>
      </form>
    </div>
  )
}