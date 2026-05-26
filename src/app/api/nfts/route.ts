import { NextResponse } from 'next/server'

let nfts: any[] = []

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const item = { id: `${Date.now()}`, ...body }
    nfts.push(item)
    return NextResponse.json(item)
  } catch (err) {
    return NextResponse.json({ message: 'Invalid body' }, { status: 400 })
  }
}
