"use client"

import { useEffect, useState } from 'react'
import apiClient from '@/config/axios'
import { Navbar } from '@/components/Navbar'

export default function TransactionsPage() {
  const [txs, setTxs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiClient.get('/api/transactions')
        setTxs(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Không tải được transactions:', err)
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
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-black">Lịch sử giao dịch</h1>

          {loading ? (
            <p className="text-gray-400">Đang tải...</p>
          ) : txs.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
              <p className="text-gray-400">Không tìm thấy giao dịch.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {txs.map((t) => (
                <div key={t.txHash} className="rounded-xl border border-white/5 bg-[#0d1418] p-4 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-xs text-gray-400">{t.txHash}</div>
                    <div className="text-sm text-gray-200">{t.type} — {t.amount} ETH</div>
                  </div>
                  <div className="text-right text-sm text-gray-400">{new Date(t.timestamp).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
