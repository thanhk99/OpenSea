import type { NextApiRequest, NextApiResponse } from 'next'
import { proxyToBackend } from './_proxy'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return proxyToBackend(req, res, '/api/profile')
}
