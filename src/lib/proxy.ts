import { NextResponse } from 'next/server'

export async function proxyRequest(req: Request, path: string) {
  const backend = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || ''
  if (!backend) {
    return NextResponse.json({ message: 'API_BASE_URL not configured on server' }, { status: 500 })
  }

  const url = backend.replace(/\/$/, '') + path

  const headers: Record<string, string> = {}
  req.headers.forEach((value, key) => {
    // skip host header to avoid backend host mismatch
    if (key.toLowerCase() === 'host') return
    headers[key] = value
  })

  const init: RequestInit = {
    method: req.method,
    headers,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = await req.text()
  }

  const res = await fetch(url, init)

  const contentType = res.headers.get('content-type') || ''
  const status = res.status

  if (contentType.includes('application/json')) {
    const data = await res.json()
    return NextResponse.json(data, { status })
  }

  const text = await res.text()
  return new NextResponse(text, { status, headers: { 'content-type': contentType } })
}
