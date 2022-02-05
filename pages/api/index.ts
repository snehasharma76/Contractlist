// pages/api/index.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.status(200).json({
    body: "0xd05e3E715d945B59290df0ae8eF85c1BdB684744",
    query: request.query,
    cookies: request.cookies,
  });
}