"use client"

import { useEffect, useState } from "react"
import apiClient from "@/config/axios"
import { Navbar } from "@/components/Navbar"
import AuctionCard from "@/components/AuctionCard"

export default function HomePage() {
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            try {
                const res = await apiClient.get('/api/nfts')
                setItems(Array.isArray(res) ? res : [])
            } catch (err) {
                console.warn("API chưa sẵn sàng, hiển thị empty UI")
                setItems([])
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [])

    return (
        <div className="min-h-screen bg-[#04111d] text-white">

            {/* NAVBAR */}
            <Navbar />

            {/* HERO SECTION */}
            <div className="text-center py-12">
                <h1 className="text-4xl font-black">
                    NFT Marketplace
                </h1>
                <p className="text-gray-400 mt-2">
                    Buy, sell and trade NFTs
                </p>
            </div>

            {/* CONTENT */}
            <div className="max-w-6xl mx-auto px-6 pb-16">

                {/* LOADING */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-[320px] rounded-2xl bg-white/5 animate-pulse"
                            />
                        ))}
                    </div>
                ) : items.length === 0 ? (

                    /* EMPTY STATE */
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-lg font-bold">No NFTs yet</p>
                        <p className="text-sm">
                            Backend is not ready — UI waiting for data
                        </p>
                    </div>

                ) : (

                    /* NFT GRID */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <AuctionCard
                                key={item.id}
                                auction={item}
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
        </div>
    )
}