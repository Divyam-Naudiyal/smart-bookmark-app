'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) router.push('/')
    }
    checkUser()
  }, [router])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl font-bold">Welcome To Hub of BookMarks</h1>

      <div className="space-x-4">
        <button
          onClick={() => router.push('/bookmarks')}
          className="bg-teal-600 text-black px-6 py-3 rounded-xl"
        >
          Manage Bookmarks
        </button>

        <button
          onClick={logout}
          className="bg-rose-300 text-black px-6 py-3 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
