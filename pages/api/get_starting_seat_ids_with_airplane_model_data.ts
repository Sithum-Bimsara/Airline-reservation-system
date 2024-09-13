import { NextApiRequest, NextApiResponse } from 'next';
import { get_starting_seat_ids_with_airplane_model_data } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await get_starting_seat_ids_with_airplane_model_data();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching table data:', error);
    res.status(500).json({ message: 'Error fetching table data' });
  }
}
