"use client"

import { useEffect, useState } from 'react'
import apiClient from '@/config/axios'
import { Navbar } from '@/components/Navbar'
import AuctionCard from '@/components/AuctionCard'

export default function AuctionPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiClient.get('/api/auctions')
        setItems(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Không tải được auctions:', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-[#04111d] text-white">
      <Navbar />

      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-8 text-4xl font-black tracking-tight">Marketplace — Auctions</h1>

          {loading ? (
            <p className="text-gray-400">Đang tải...</p>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
              <p className="text-gray-400">Chưa có phiên đấu giá nào.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((it) => (
                <AuctionCard key={it.id} auction={it} onBidSuccess={() => {
                  // reload simple
                  setItems((prev) => prev.map(p => p.id === it.id ? { ...p, ...it } : p))
                }} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
