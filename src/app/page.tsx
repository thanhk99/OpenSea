"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import apiClient from "@/config/axios"

import { Navbar } from "@/components/Navbar"
import { NFTCard } from "@/components/NFTCard"

import {
  LayoutGrid,
  Filter,
  ArrowUpDown,
  Lock
} from "lucide-react"

export default function Home() {

  const router = useRouter()

  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {

    const load = async () => {

      try {

        const token = localStorage.getItem("accessToken")
        setIsLoggedIn(!!token)

        // API THẬT
        const data = await apiClient.get("/api/nfts")

        setItems(Array.isArray(data) ? data : [])

      } catch (err) {

        console.error("Load NFTs failed:", err)
        setItems([])

      } finally {

        setLoading(false)

      }
    }

    load()

  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-[#04111d] text-white">

      <Navbar />

      <main className="flex-1">

        {/* HERO */}
        <section className="relative overflow-hidden py-16 px-4 md:px-8 lg:py-24">

          <div className="absolute inset-0 -z-10 overflow-hidden">

            <div className="absolute -top-24 -left-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

            <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px]
              -translate-x-1/2 -translate-y-1/2 rounded-full
              bg-purple-600/10 blur-[160px]" />

          </div>

          <div className="mx-auto max-w-7xl">

            <h1 className="mb-6 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">

              Discover, collect, and sell <br />

              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                extraordinary NFTs
              </span>

            </h1>

            <p className="mb-10 max-w-2xl text-lg text-gray-400 md:text-xl">
              OpenSea style NFT marketplace running on your backend API.
            </p>

            <div className="flex flex-wrap gap-4">

              <button
                onClick={() => router.push("/my-nfts")}
                className="rounded-xl border border-white/20
                bg-white/5 px-8 py-4 text-sm font-bold
                backdrop-blur-md transition-all hover:bg-white/10"
              >
                Manage NFTs
              </button>

              <button
                onClick={() => router.push("/marketplace")}
                className="rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold
                transition-all hover:bg-blue-500"
              >
                Explore Marketplace
              </button>

              <button
                onClick={() => router.push("/nft/create")}
                className="rounded-xl bg-white/10 px-8 py-4 text-sm font-bold
                backdrop-blur-md transition-all hover:bg-white/20"
              >
                Create NFT
              </button>

            </div>
          </div>
        </section>

        {/* MARKETPLACE */}
        <section className="relative mx-auto max-w-7xl px-4 py-12 md:px-8">

          {!isLoggedIn && (

            <div className="absolute inset-0 z-30 flex flex-col
              items-center justify-center bg-[#04111d]/60
              backdrop-blur-md rounded-2xl">

              <div className="flex h-14 w-14 items-center justify-center
                rounded-full bg-blue-600/20 border border-blue-500/30
                text-blue-400 mb-4">

                <Lock className="h-6 w-6" />

              </div>

              <h3 className="text-xl font-bold mb-1">
                Marketplace Locked
              </h3>

              <p className="text-sm text-gray-400 mb-6 text-center">
                Login to access NFT marketplace
              </p>

              <button
                onClick={() => router.push("/login")}
                className="rounded-xl bg-blue-600 px-6 py-3
                text-sm font-bold hover:bg-blue-500"
              >
                Login
              </button>

            </div>

          )}

          {/* CONTROLS */}
          <div className="mb-8 flex flex-col items-center
            justify-between gap-4 border-b border-white/5
            pb-8 sm:flex-row">

            <div className="flex items-center gap-4">

              <div className="flex h-11 items-center gap-2
                rounded-xl bg-white/10 px-4 text-sm font-bold">

                <Filter className="h-4 w-4" />
                Filters

              </div>

              <div className="text-sm font-semibold text-gray-400">
                {items.length} items
              </div>

            </div>

            <div className="flex items-center gap-2">

              <div className="flex h-11 items-center gap-2
                rounded-xl bg-white/10 px-4 text-sm font-bold">

                Price: Low to High

                <ArrowUpDown className="h-4 w-4" />

              </div>

              <div className="flex h-11 items-center gap-1
                rounded-xl bg-white/10 p-1">

                <div className="flex h-9 w-9 items-center justify-center
                  rounded-lg bg-white/10">

                  <LayoutGrid className="h-4 w-4" />

                </div>

              </div>

            </div>
          </div>

          {/* LOADING */}
          {loading ? (

            <div className="grid grid-cols-1 gap-6
              sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {[1, 2, 3, 4].map((i) => (

                <div
                  key={i}
                  className="h-[340px] rounded-2xl
                  bg-white/5 animate-pulse"
                />

              ))}

            </div>

          ) : items.length === 0 ? (

            <div className="rounded-2xl border border-white/10
              bg-white/5 p-12 text-center">

              <p className="text-gray-400">
                No NFTs from backend
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 gap-6
              sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {items.map((nft) => (

                <NFTCard
                  key={nft.id}
                  {...nft}
                />

              ))}

            </div>

          )}

        </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-white/5
        bg-[#04111d] py-12 px-4 text-center text-gray-500">

        <p className="text-sm">
          © 2026 NFT Marketplace
        </p>

      </footer>

    </div>
  )
}