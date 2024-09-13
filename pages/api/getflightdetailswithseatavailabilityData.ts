import { NextApiRequest, NextApiResponse } from 'next';
import { getflightdetailswithseatavailabilityData } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await getflightdetailswithseatavailabilityData();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching table data:', error);
    res.status(500).json({ message: 'Error fetching table data' });
  }
}
