'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { NFT_CONTRACT_ADDRESS, NFT_ABI } from '@/config/contracts'
import { parseEther } from 'viem'
import { ImagePlus, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function CreateNFT() {
  const { isConnected } = useAccount()
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected) return alert('Vui lòng kết nối ví!')

    writeContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: NFT_ABI,
      functionName: 'mint',
      args: [formData.imageUrl], // Tạm thời dùng imageUrl làm tokenURI
      value: parseEther('0.01'), // Phí mint cố định 0.01 ETH
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#04111d] text-white">
      <Navbar />

      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-4xl font-black tracking-tight">Tạo NFT mới</h1>

          {!isConnected ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
              <AlertCircle className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
              <h2 className="mb-2 text-xl font-bold">Chưa kết nối ví</h2>
              <p className="mb-6 text-gray-400">Bạn cần kết nối ví để có thể Mint NFT.</p>
            </div>
          ) : isSuccess ? (
            <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-12 text-center animate-in zoom-in duration-300">
              <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
              <h2 className="mb-2 text-2xl font-bold text-green-400">Mint thành công!</h2>
              <p className="mb-8 text-gray-400">NFT của bạn đã được đưa lên Blockchain.</p>
              <div className="flex justify-center gap-4">
                <Link href="/" className="rounded-xl bg-white/10 px-6 py-3 font-bold hover:bg-white/20 transition-colors">
                  Về trang chủ
                </Link>
                <button 
                  onClick={() => window.location.reload()}
                  className="rounded-xl bg-blue-600 px-6 py-3 font-bold hover:bg-blue-500 transition-colors"
                >
                  Tạo thêm cái khác
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Preview Image */}
                <div className="flex flex-col gap-4">
                  <label className="text-sm font-bold text-gray-400">Xem trước</label>
                  <div className="aspect-square w-full overflow-hidden rounded-2xl border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center relative">
                    {formData.imageUrl ? (
                      <img src={formData.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="text-center text-gray-500">
                        <ImagePlus className="mx-auto mb-2 h-12 w-12 opacity-20" />
                        <p className="text-xs">Nhập URL ảnh bên dưới</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-400">Tên NFT</label>
                    <input
                      required
                      type="text"
                      placeholder="VD: Cyber Ape #001"
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none focus:border-blue-500"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-400">Mô tả</label>
                    <textarea
                      rows={3}
                      placeholder="Mô tả về tác phẩm của bạn..."
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none focus:border-blue-500"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-400">URL ảnh (IPFS/Web)</label>
                    <input
                      required
                      type="url"
                      placeholder="https://..."
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none focus:border-blue-500"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-gray-400">Phí Mint (Gas + Platform)</span>
                      <span className="font-bold">0.01 ETH</span>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isPending || isConfirming}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold transition-all hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                    >
                      {isPending || isConfirming ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          {isPending ? 'Đang gửi giao dịch...' : 'Đang xác nhận...'}
                        </>
                      ) : (
                        'Mint NFT'
                      )}
                    </button>
                    
                    {error && (
                      <p className="mt-4 text-center text-sm text-red-400">
                        Lỗi: {error.message.includes('insufficient funds') ? 'Không đủ số dư ETH' : 'Giao dịch bị từ chối'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
