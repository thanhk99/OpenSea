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
        const res = await apiClient.get('/api/auctions')

        const data = res?.data ?? res

        setItems(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Không tải được auctions:', err)
        setItems([]) // tránh undefined UI
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
        <div className="mx-auto max-w-6xl">

          {/* TITLE */}
          <h1 className="mb-8 text-4xl font-black tracking-tight">
            Marketplace — Auctions
          </h1>

          {/* LOADING */}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[320px] rounded-2xl bg-white/5 animate-pulse"
                />
              ))}
            </div>
          ) : items.length === 0 ? (

            /* EMPTY STATE */
            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
              <p className="text-lg font-bold text-white mb-2">
                No Auctions Found
              </p>
              <p className="text-gray-400">
                There are currently no active auctions
              </p>
            </div>

          ) : (

            /* GRID */
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((it) => (
                <AuctionCard
                  key={it.id}
                  auction={it}
                  onBidSuccess={(updated) => {
                    setItems((prev) =>
                      prev.map((p) =>
                        p.id === updated.id ? updated : p
                      )
                    )
                  }}
                />
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
