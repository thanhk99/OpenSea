import { proxyRequest } from '@/lib/proxy'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const id = params.id
  return proxyRequest(req, `/api/auctions/${id}/bid`)
}
