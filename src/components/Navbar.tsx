'use client'

import Link from 'next/link'
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { Wallet, Search, Menu, User, ShoppingCart, Copy, ExternalLink, LogOut, ChevronDown, Check } from 'lucide-react'
import { formatUnits } from 'viem'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useState, useRef, useEffect } from 'react'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function Navbar() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({ address })
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isSysLoggedIn, setIsSysLoggedIn] = useState<boolean>(false) // Quản lý trạng thái Token hệ thống
  const menuRef = useRef<HTMLDivElement>(null)

  // Kiểm tra trạng thái đăng nhập hệ thống Web2 (Token)
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsSysLoggedIn(!!token)
  }, [])

  // Hàm xử lý Đăng xuất tài khoản hệ thống
  const handleSysLogout = () => {
    localStorage.removeItem('accessToken')
    setIsSysLoggedIn(false)
    window.location.href = '/' // Refresh về trang chủ để cập nhật lại giao diện khóa/mở
  }

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  const formatBalance = (val: bigint, decimals: number) => {
    const formatted = formatUnits(val, decimals)
    return parseFloat(formatted).toLocaleString(undefined, {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    })
  }

  return (
    <nav className="sticky top-0 z-50 flex h-20 w-full items-center justify-between border-b border-white/10 bg-[#04111d]/90 px-4 backdrop-blur-xl md:px-8">
      {/* Logo & Search */}
      <div className="flex flex-1 items-center gap-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 p-2 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 40 40" fill="white">
              <path d="M20 2L2 12l18 10 18-10L20 2zM2 22l18 10 18-10-18 4-18-4z" />
            </svg>
          </div>
          <span className="hidden text-xl font-bold tracking-tight md:block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            OpenSea Pro
          </span>
        </Link>

        <div className="relative hidden flex-1 max-w-lg lg:block group">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Tìm kiếm NFT, bộ sưu tập..."
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white/10 placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Nav Links & Wallet */}
      <div className="flex items-center gap-4">
          <div className="hidden items-center gap-6 text-sm font-semibold md:flex mr-4 text-gray-300">
          <Link href="/nft" className="hover:text-white transition-colors relative group">
            Drops
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/auction" className="hover:text-white transition-colors relative group">
            Auctions
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/transactions" className="hover:text-white transition-colors relative group">
            Transactions
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/profile" className="hover:text-white transition-colors relative group">
            Profile
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/nft/create" className="hover:text-white transition-colors relative group">
            Create
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {isConnected ? (
            <div className="relative flex items-center gap-2" ref={menuRef}>
              {/* Wallet Info Display */}
              <div className="hidden flex-col items-end sm:flex mr-1">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Số dư</span>
                <span className="text-sm font-mono font-bold text-blue-400">
                  {balance ? formatBalance(balance.value, balance.decimals) : '0.0000'} {balance?.symbol}
                </span>
              </div>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  "flex h-11 items-center gap-2 rounded-xl bg-white/5 px-4 text-sm font-bold border border-white/10 transition-all hover:bg-white/10 hover:border-white/20",
                  isMenuOpen && "bg-white/10 border-blue-500/50"
                )}
              >
                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                <span className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                <ChevronDown className={cn("h-4 w-4 text-gray-400 transition-transform", isMenuOpen && "rotate-180")} />
              </button>

              {/* Dropdown Menu Wallet */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1217] p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-3 border-b border-white/5 mb-2">
                    <p className="text-xs text-gray-500 mb-1">Ví đã kết nối</p>
                    <p className="text-sm font-mono truncate">{address}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <button 
                      onClick={handleCopy}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                    >
                      {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      {isCopied ? 'Đã sao chép!' : 'Sao chép địa chỉ'}
                    </button>
                    
                    <a 
                      href={`https://etherscan.io/address/${address}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Xem trên Explorer
                    </a>

                    <Link href="/profile" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors">
                      <User className="h-4 w-4" />
                      Hồ sơ của tôi
                    </Link>
                    
                    <div className="h-px bg-white/5 my-1" />
                    
                    <button 
                      onClick={() => { disconnect(); setIsMenuOpen(false); }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Ngắt kết nối ví
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => connect({ connector: connectors[0] })}
              disabled={isPending}
              className="group relative flex h-11 items-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-6 text-sm font-bold transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <Wallet className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              )}
              {isPending ? 'Đang kết nối...' : 'Kết nối ví'}
            </button>
          )}

          <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 md:hidden">
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="h-8 w-px bg-white/10 mx-1 hidden lg:block" />
          
          {/* Nút Giỏ Hàng Gốc */}
          <button className="hidden h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 lg:flex relative group">
            <ShoppingCart className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-[10px] font-bold flex items-center justify-center shadow-lg">0</span>
          </button>

          {/* NÚT ĐĂNG XUẤT HỆ THỐNG: Xếp ngay sau Giỏ hàng để không bị đè đè lên UI */}
          {isSysLoggedIn && (
            <button 
              onClick={handleSysLogout}
              className="hidden lg:flex h-11 items-center gap-2 rounded-xl bg-red-600/10 border border-red-500/20 px-4 text-sm font-bold text-red-400 transition-all hover:bg-red-600 hover:text-white hover:border-transparent active:scale-95"
            >
              <LogOut className="h-4 w-4" />
              <span>Đăng xuất</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}