import type { NextApiRequest, NextApiResponse } from 'next';
import { createPassenger } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { Passenger_ID, newData } = req.body;
      await createPassenger(Passenger_ID, newData);
      res.status(200).json({ message: 'Create Passenger successfully' });
    } catch (error) {
      console.error('Error updating table data:', error);
      res.status(500).json({ message: 'Error creating passenger' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
