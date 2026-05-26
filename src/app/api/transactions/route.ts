import { NextResponse } from 'next/server'

const txs = [
  { txHash: '0xabc123', type: 'Mint', amount: '0.01', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
  { txHash: '0xdef456', type: 'Buy', amount: '0.5', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() }
]

export async function GET() {
  return NextResponse.json(txs)
}
