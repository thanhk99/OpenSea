import type { NextApiRequest, NextApiResponse } from 'next'

export async function proxyToBackend(req: NextApiRequest, res: NextApiResponse, path: string) {
  const backend = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || ''
  if (!backend) {
    return res.status(500).json({ message: 'API_BASE_URL not configured on server' })
  }

  const url = backend.replace(/\/$/, '') + path

  const headers: Record<string, string> = {}
  for (const [key, value] of Object.entries(req.headers)) {
    if (key.toLowerCase() === 'host') continue
    if (typeof value === 'string') headers[key] = value
    else if (Array.isArray(value)) headers[key] = value.join(',')
  }

  const init: RequestInit = {
    method: req.method,
    headers,
  }

  if (req.method && req.method !== 'GET' && req.method !== 'HEAD') {
    // Preserve JSON bodies and fallback to raw
    if (req.headers['content-type'] && String(req.headers['content-type']).includes('application/json')) {
      init.body = JSON.stringify(req.body)
      init.headers = { ...init.headers, 'content-type': 'application/json' }
    } else if (typeof req.body === 'string' && req.body.length) {
      init.body = req.body
    }
  }

  const backendRes = await fetch(url, init)

  const contentType = backendRes.headers.get('content-type') || ''
  const status = backendRes.status

  if (contentType.includes('application/json')) {
    const data = await backendRes.json()
    return res.status(status).json(data)
  }

  const text = await backendRes.text()
  res.setHeader('content-type', contentType)
  return res.status(status).send(text)
}

export default proxyToBackend
