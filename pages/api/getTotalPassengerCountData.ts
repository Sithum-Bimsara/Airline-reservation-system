import type { NextApiRequest, NextApiResponse } from 'next';
import { getTotalPassengerCount } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const passengerCount = await getTotalPassengerCount();
    res.status(200).json({ passengerCount });
  } catch (error) {
    console.error('Error fetching total passenger count:', error);
    res.status(500).json({ message: 'Error fetching total passenger count' });
  }
}
