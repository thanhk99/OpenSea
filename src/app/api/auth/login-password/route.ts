import { NextResponse } from 'next/server'

// Simple mock auth route for local development — trả về token giả khi username/password hợp lệ
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, password } = body

    // Very simple mock validation
    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password required' }, { status: 400 })
    }

    // In real app, validate against DB and sign a JWT. Here we return a fake token.
    const token = `dev-token-${Date.now()}`
    return NextResponse.json({ token, user: { username } })
  } catch (err) {
    return NextResponse.json({ message: 'Invalid body' }, { status: 400 })
  }
}
