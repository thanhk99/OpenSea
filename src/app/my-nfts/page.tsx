"use client"

import { useRouter } from "next/navigation"

export default function NFTManagementDashboard() {
    const router = useRouter()
    const mockNFTs = [
        {
            id: 1,
            name: 'Cyber Ape',
            price: '0.45',
            status: 'Listed',
            image:
                'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 2,
            name: 'Neon Samurai',
            price: '1.20',
            status: 'Owned',
            image:
                'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 3,
            name: 'Meta Skull',
            price: '0.85',
            status: 'Auction',
            image:
                'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=80&w=1200&auto=format&fit=crop',
        },
    ]

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold">NFT Management</h1>
                        <p className="text-zinc-400 mt-2">
                            Manage your NFT collections, listings and auctions.
                        </p>
                    </div>

                    <button
                        onClick={() => router.push("/nft/create")}
                        className="bg-white text-black px-5 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
                    >
                        + Create NFT
                    </button>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
                        <p className="text-zinc-400">Total NFTs</p>
                        <h2 className="text-3xl font-bold mt-2">24</h2>
                    </div>

                    <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
                        <p className="text-zinc-400">Listed</p>
                        <h2 className="text-3xl font-bold mt-2">10</h2>
                    </div>

                    <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
                        <p className="text-zinc-400">Auctions</p>
                        <h2 className="text-3xl font-bold mt-2">4</h2>
                    </div>

                    <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
                        <p className="text-zinc-400">Volume</p>
                        <h2 className="text-3xl font-bold mt-2">12.4 ETH</h2>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search NFTs..."
                        className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 outline-none"
                    />

                    <select className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 outline-none">
                        <option>All Status</option>
                        <option>Owned</option>
                        <option>Listed</option>
                        <option>Auction</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockNFTs.map((nft) => (
                        <div
                            key={nft.id}
                            className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition"
                        >
                            <img
                                src={nft.image}
                                alt={nft.name}
                                className="w-full h-72 object-cover"
                            />

                            <div className="p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-semibold">{nft.name}</h3>

                                    <span className="text-sm bg-zinc-800 px-3 py-1 rounded-full">
                                        {nft.status}
                                    </span>
                                </div>

                                <p className="text-zinc-400 mb-5">{nft.price} ETH</p>

                                <div className="grid grid-cols-2 gap-3">
                                    <button className="bg-white text-black py-3 rounded-2xl font-semibold hover:opacity-90 transition">
                                        Sell
                                    </button>

                                    <button className="bg-zinc-800 py-3 rounded-2xl font-semibold hover:bg-zinc-700 transition">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
