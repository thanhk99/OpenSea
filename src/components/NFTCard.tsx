'use client'

import { useState } from 'react'
import { ShoppingCart, Heart, ExternalLink, Loader2 } from 'lucide-react'
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { MARKETPLACE_CONTRACT_ADDRESS, MARKETPLACE_ABI, NFT_CONTRACT_ADDRESS, NFT_ABI } from '@/config/contracts'
import { parseEther } from 'viem'

interface NFTCardProps {
  id: string
  name: string
  price: string
  image: string
  seller: string
  listingId?: number // ID trên marketplace
}

export function NFTCard({ id, name, price, image, seller, listingId }: NFTCardProps) {
  const { isConnected, address } = useAccount()
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })
  
  const [isSelling, setIsSelling] = useState(false)

  const handleBuy = async () => {
    if (!isConnected) return alert('Vui lòng kết nối ví!')
    if (!listingId) return alert('NFT này chưa được đăng bán!')

    writeContract({
      address: MARKETPLACE_CONTRACT_ADDRESS,
      abi: MARKETPLACE_ABI,
      functionName: 'buyNFT',
      args: [BigInt(listingId)],
      value: parseEther(price),
    })
  }

  const handleSell = async () => {
    if (!isConnected) return alert('Vui lòng kết nối ví!')
    const sellPrice = prompt('Nhập giá bán (ETH):', '0.1')
    if (!sellPrice) return

    setIsSelling(true)
    try {
      // BƯỚC 1: Approve cho Marketplace (Tạm thời luôn gọi để đơn giản hóa)
      writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_ABI,
        functionName: 'setApprovalForAll',
        args: [MARKETPLACE_CONTRACT_ADDRESS, true],
      })

      // BƯỚC 2: Trong thực tế cần đợi Approve thành công rồi mới gọi listNFT
      // Ở đây ta giả định người dùng sẽ gọi list sau khi approve hoặc tích hợp logic phức tạp hơn
      // Để đơn giản cho demo, ta chỉ thông báo quy trình
      alert('Vui lòng xác nhận Approve trong ví, sau đó bạn có thể thực hiện List NFT.')
    } catch (err) {
      console.error(err)
    } finally {
      setIsSelling(false)
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#14212d] transition-all hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
      {/* Image Container */}
      <div className="aspect-square w-full overflow-hidden relative">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFmMjkyYyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzZkOGViNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5GVCBJbWFnZTwvdGV4dD48L3N2Zz4=';
          }}
        />
        
        {isSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 backdrop-blur-sm animate-in fade-in duration-300">
            <span className="rounded-full bg-green-500 p-2 font-bold text-white shadow-lg">Thành công!</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-semibold text-blue-400"># {id}</span>
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <ExternalLink className="h-3 w-3" />
            <span>ETH</span>
          </div>
        </div>
        
        <h3 className="mb-2 truncate font-bold text-gray-100 group-hover:text-blue-400 transition-colors">
          {name}
        </h3>
        
        <div className="mb-4 flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500" />
          <span className="text-xs text-gray-400 truncate max-w-[100px]">{seller}</span>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <p className="text-[10px] font-bold uppercase text-gray-500">Price</p>
            <p className="text-sm font-black text-gray-100">{price} ETH</p>
          </div>
          
          <div className="flex gap-2">
            {listingId ? (
              <button 
                onClick={handleBuy}
                disabled={isPending || isConfirming || isSuccess}
                className="flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-3 text-xs font-bold transition-all hover:bg-blue-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending || isConfirming ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <ShoppingCart className="h-3.5 w-3.5" />
                )}
                {isPending || isConfirming ? 'Wait...' : isSuccess ? 'Owned' : 'Buy Now'}
              </button>
            ) : (
              <button 
                onClick={handleSell}
                disabled={isSelling}
                className="flex h-9 items-center gap-2 rounded-lg bg-white/10 px-3 text-xs font-bold transition-all hover:bg-white/20 active:scale-95"
              >
                Sell NFT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


