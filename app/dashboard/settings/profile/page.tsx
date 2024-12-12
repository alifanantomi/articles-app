import { getSession } from '@/lib/auth'
import Link from 'next/link'
import LogoutButton from '@/components/logout-button'

interface User {
  id: string
  email: string
  name: string
  twoFactorEnabled: boolean
}

const session = await getSession()

export default async function Dashboard() {
  if (!session || !session.user || !session.user.email) {
    return null
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      {session.user && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Informasi Akun</h2>
          <div className="space-y-2">
            <p><strong>Nama:</strong> {session.user.name}</p>
            <p><strong>Email:</strong> {session.user.email}</p>
            <p>
              <strong>Status 2FA:</strong>{' '}
              {session.user.twoFactorEnabled ? (
                <span className="text-green-500">Aktif</span>
              ) : (
                <span className="text-red-500">Tidak aktif</span>
              )}
            </p>
          </div>

          {!session.user.twoFactorEnabled && (
            <div className="mt-4">
              <Link 
                href="/dashboard/settings"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Aktifkan 2FA
              </Link>
            </div>
          )}

          <div className="mt-6">
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  )
}