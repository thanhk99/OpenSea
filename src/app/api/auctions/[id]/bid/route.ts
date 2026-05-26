import { NextResponse } from 'next/server'

// Very small in-memory mock for bids
let bids: Record<string, { amount: string; at: string }[]> = {}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const id = params.id
  try {
    const body = await req.json()
    const { amount } = body
    if (!amount) return NextResponse.json({ message: 'Amount required' }, { status: 400 })

    bids[id] = bids[id] || []
    bids[id].push({ amount, at: new Date().toISOString() })

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ message: 'Invalid body' }, { status: 400 })
  }
}
