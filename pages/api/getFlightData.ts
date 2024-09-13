import { NextApiRequest, NextApiResponse } from 'next';
import { getFlightData } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await getFlightData();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching table data:', error);
    res.status(500).json({ message: 'Error fetching table data' });
  }
}
