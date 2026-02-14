'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) router.push('/dashboard')
    }
    checkSession()
  }, [router])

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    })
  }

  return (
    <div className="min-h-screen bg-pink-100">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-800">
          BookmarkPro
        </h1>

        <button
          onClick={login}
          className="bg-zinc-600 text-white px-5 py-2 rounded-xl hover:opacity-80 transition"
        >
          Login
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="text-center px-6 py-20 bg-gradient-to-br from-rose-300 to-pink-100 text-black">
        <h2 className="text-5xl font-bold mb-6">
          Save Your Favorite Links <br /> In One Secure Place
        </h2>

        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
          Organize, access, and manage your bookmarks anywhere. 
          Fast. Private. Real-time synced.
        </p>

        <button
          onClick={login}
          className="bg-slate-600 text-white font-semibold px-8 py-4 rounded-2xl hover:scale-105 transition"
        >
          Get Started with Google
        </button>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 bg-rose-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-xl font-bold mb-3">Private</h3>
            <p className="text-gray-600">
              Your bookmarks are visible only to you.
              Protected with secure authentication.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-xl font-bold mb-3">Real-time</h3>
            <p className="text-gray-600">
              Instant updates across all your devices.
              No refresh required.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-xl font-bold mb-3">Access Anywhere</h3>
            <p className="text-gray-600">
              Works on desktop, tablet, and mobile.
              Your links always with you.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500">
        © 2026 BookmarkPro. Built with Next.js & Supabase.
      </footer>

    </div>
  )
}
