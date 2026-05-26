"use client"

import { useEffect, useState } from 'react'
import apiClient from '@/config/axios'
import { Navbar } from '@/components/Navbar'
import { useAccount } from 'wagmi'

export default function ProfilePage() {
  const { address } = useAccount()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiClient.get('/api/profile')
        setProfile(data)
      } catch (err) {
        console.error('Không lấy được profile:', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await apiClient.put('/api/profile', profile)
      alert('Lưu thông tin thành công')
    } catch (err) {
      console.error(err)
      alert('Lỗi khi lưu')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#04111d] text-white">
      <Navbar />

      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-3xl font-black">Tài khoản của tôi</h1>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4">
              <label className="mb-1 block text-sm text-gray-400">Địa chỉ ví</label>
              <div className="font-mono text-sm text-gray-200">{address ?? 'Chưa kết nối'}</div>
            </div>

            {loading ? (
              <p className="text-gray-400">Đang tải...</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Tên hiển thị</label>
                  <input className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-black" value={profile?.displayName || ''} onChange={(e) => setProfile({ ...profile, displayName: e.target.value })} />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-gray-400">Email</label>
                  <input className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-black" value={profile?.email || ''} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                </div>

                <div className="flex gap-3">
                  <button onClick={handleSave} disabled={saving} className="rounded-xl bg-blue-600 px-4 py-2 font-bold hover:bg-blue-500 disabled:opacity-60">{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
