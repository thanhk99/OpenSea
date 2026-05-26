import { NextResponse } from 'next/server'

type Auction = {
  id: string
  title: string
  description?: string
  image?: string
  tokenId?: number
  endsAt: string
  highestBid?: string
}

let auctions: Auction[] = [
  { id: '1', title: 'Crypto Ape #1', description: 'Rare ape', image: '/placeholder.png', tokenId: 1, endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), highestBid: '0.5' },
  { id: '2', title: 'Pixel Art #77', description: 'Colorful pixel art', image: '/placeholder.png', tokenId: 77, endsAt: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), highestBid: '0.12' }
]

export async function GET() {
  return NextResponse.json(auctions)
}
