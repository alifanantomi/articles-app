import { getSession } from '@/lib/auth'
import Link from 'next/link'

const session = await getSession()

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Welcome</h1>
      <p className="text-gray-600 mb-8">Secure authentication with Two-Factor Authentication</p>
      
      {
        session?.user ? (
          <div className="space-x-4">
            <Link 
              href="/dashboard" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Dashboard
            </Link>
          </div>
        ) : (
          <div className="space-x-4">
            <Link 
              href="/auth/login" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Login
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
            >
              Register
            </Link>
          </div>

        )
      }
    </div>
  )
}