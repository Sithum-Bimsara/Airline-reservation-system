import type { NextApiRequest, NextApiResponse } from 'next';
import { getTotalUsersCount } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userCount = await getTotalUsersCount();
    res.status(200).json({ userCount });
  } catch (error) {
    console.error('Error fetching total user count:', error);
    res.status(500).json({ message: 'Error fetching total user count' });
  }
}
