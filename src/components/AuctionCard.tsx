'use client'

import { useState } from 'react'
import apiClient from '@/config/axios'
import { useAccount } from 'wagmi'
import { Loader2 } from 'lucide-react'

interface Props {
  auction: any
  onBidSuccess?: () => void
}

export default function AuctionCard({ auction, onBidSuccess }: Props) {
  const { isConnected } = useAccount()
  const [isBidding, setIsBidding] = useState(false)
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePlaceBid = async () => {
    if (!isConnected) return alert('Vui lòng kết nối ví')
    if (!amount) return alert('Nhập giá đặt')

    setLoading(true)
    setError('')
    try {
      await apiClient.post(`/api/auctions/${auction.id}/bid`, { amount })
      setIsBidding(false)
      setAmount('')
      onBidSuccess && onBidSuccess()
      alert('Đặt giá thành công')
    } catch (err: any) {
      console.error(err)
      setError(err?.message || 'Lỗi khi đặt giá')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f1b22]">
      <div className="aspect-square w-full overflow-hidden">
        <img src={auction.image || '/placeholder.png'} alt={auction.title} className="h-full w-full object-cover" />
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-semibold text-blue-400">#{auction.tokenId ?? auction.id}</span>
          <span className="text-xs text-gray-400">{new Date(auction.endsAt).toLocaleString()}</span>
        </div>

        <h3 className="mb-2 truncate font-bold text-gray-100">{auction.title}</h3>

        <p className="mb-3 text-sm text-gray-400 truncate">{auction.description}</p>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <p className="text-[10px] font-bold uppercase text-gray-500">Highest</p>
            <p className="text-sm font-black text-gray-100">{auction.highestBid ?? '—'} ETH</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBidding(true)}
              className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold hover:bg-blue-500"
            >
              Place Bid
            </button>
          </div>
        </div>

        {isBidding && (
          <div className="mt-4">
            <input
              type="number"
              step="0.0001"
              placeholder="Amount (ETH)"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-2 text-black"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={handlePlaceBid}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-green-600 px-3 py-2 text-xs font-bold hover:bg-green-500 disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirm Bid'}
              </button>

              <button
                onClick={() => { setIsBidding(false); setAmount(''); setError('') }}
                className="rounded-xl bg-white/10 px-3 py-2 text-xs font-bold hover:bg-white/20"
              >
                Cancel
              </button>
            </div>

            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
