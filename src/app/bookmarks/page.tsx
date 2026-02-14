'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

type Bookmark = {
  id: string
  title: string
  url: string
}

export default function BookmarksPage() {
  const router = useRouter()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false })

    setBookmarks(data || [])
  }

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/')
      } else {
        fetchBookmarks()
      }
    }

    checkUser()
  }, [router])

  const addBookmark = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!title || !url) return

    await supabase.from('bookmarks').insert({
      title,
      url,
      user_id: user?.id,
    })

    setTitle('')
    setUrl('')
    fetchBookmarks()
  }

  const deleteBookmark = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
    fetchBookmarks()
  }

  return (
    <div className="min-h-screen bg-pink-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Bookmarks</h1>

          <button
            onClick={() => router.push('/dashboard')}
            className="bg-gray-700 text-white px-4 py-2 rounded-xl"
          >
            Back
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <input
            className="border p-3 w-full rounded-xl"
            placeholder="Bookmark title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="border p-3 w-full rounded-xl"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={addBookmark}
            className="w-full bg-slate-600 text-white py-3 rounded-xl"
          >
            Add Bookmark
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bg-white p-5 rounded-2xl shadow flex justify-between"
            >
              <div>
                <p className="font-semibold">{bookmark.title}</p>
                <a
                  href={bookmark.url}
                  target="_blank"
                  className="text-indigo-600 text-sm"
                >
                  {bookmark.url}
                </a>
              </div>

              <button
                onClick={() => deleteBookmark(bookmark.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
