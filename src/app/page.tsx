'use client'

import { Navbar } from '@/components/Navbar'
import { NFTCard } from '@/components/NFTCard'
import { LayoutGrid, Filter, ArrowUpDown } from 'lucide-react'

// Dữ liệu mẫu giả lập
const MOCK_NFTS = [
  { id: '1', name: 'Cyber Neon Gorilla', price: '0.45', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop', seller: '0x7099...79C8', listingId: 1 },
  { id: '2', name: 'Void Walker #442', price: '1.20', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop', seller: '0x3C44...93BC', listingId: 2 },
  { id: '3', name: 'Ethereal Forest', price: '0.88', image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop', seller: '0x90F7...b906', listingId: 3 },
  { id: '4', name: 'Glitch Abstract', price: '0.15', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&h=400&fit=crop', seller: '0x7099...79C8', listingId: 4 },
  { id: '5', name: 'Quantum Core', price: '2.50', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop', seller: '0x15d3...e12b', listingId: 5 },
  { id: '6', name: 'Solar Flare', price: '0.99', image: 'https://images.unsplash.com/photo-1635273051731-8933b98c3975?w=400&h=400&fit=crop', seller: '0x71C7...5ad5', listingId: 6 },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 px-4 md:px-8 lg:py-24">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-24 -left-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[160px]" />
          </div>

          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Discover, collect, and sell <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                extraordinary NFTs
              </span>
            </h1>
            <p className="mb-10 max-w-2xl text-lg text-gray-400 md:text-xl">
              OpenSea is the world&apos;s first and largest web3 marketplace for NFTs and crypto collectibles. 
              Built on Hardhat Local Network.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                Explore Marketplace
              </button>
              <button className="rounded-xl bg-white/10 px-8 py-4 text-sm font-bold backdrop-blur-md transition-all hover:bg-white/20">
                Create NFT
              </button>
            </div>
          </div>
        </section>

        {/* Marketplace Section */}
        <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
          {/* Controls */}
          <div className="mb-8 flex flex-col items-center justify-between gap-4 border-b border-white/5 pb-8 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-11 items-center gap-2 rounded-xl bg-white/10 px-4 text-sm font-bold">
                <Filter className="h-4 w-4" />
                Filters
              </div>
              <div className="text-sm font-semibold text-gray-400">
                {MOCK_NFTS.length} items
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-11 items-center gap-2 rounded-xl bg-white/10 px-4 text-sm font-bold">
                Price: Low to High
                <ArrowUpDown className="h-4 w-4" />
              </div>
              <div className="flex h-11 items-center gap-1 rounded-xl bg-white/10 p-1">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                  <LayoutGrid className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {MOCK_NFTS.map((nft) => (
              <NFTCard key={nft.id} {...nft} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 bg-[#04111d] py-12 px-4 text-center text-gray-500">
        <p className="text-sm">© 2026 Antigravity NFT Marketplace. All rights reserved.</p>
        <p className="mt-2 text-xs">Developed for Hardhat Local Network Demonstration.</p>
      </footer>
    </div>
  )
}
