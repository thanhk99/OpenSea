import type { NextApiRequest, NextApiResponse } from 'next'
import { proxyToBackend } from '../../_proxy'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  return proxyToBackend(req, res, `/api/auctions/${String(id)}/bid`)
}
