import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { User_ID, newData } = req.body;
      await createUser(User_ID, newData);
      res.status(200).json({ message: 'Created a User  successfully' });
    } catch (error) {
      console.error('Error updating table data:', error);
      res.status(500).json({ message: 'Error confirming ' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
