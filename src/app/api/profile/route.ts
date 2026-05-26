import { NextResponse } from 'next/server'

let profile = { displayName: 'User', email: 'user@example.com' }

export async function GET() {
  return NextResponse.json(profile)
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    profile = { ...profile, ...body }
    return NextResponse.json(profile)
  } catch (err) {
    return NextResponse.json({ message: 'Invalid body' }, { status: 400 })
  }
}
