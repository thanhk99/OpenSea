import { proxyRequest } from '@/lib/proxy'

export async function POST(req: Request, id: string) {
  return proxyRequest(req, `/api/auctions/${id}/bid`)
}
