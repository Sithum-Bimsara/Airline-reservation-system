import { NextApiRequest, NextApiResponse } from 'next';
import { getAirplaneModelIdByAirplaneId } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract the airplane_ID from the request query (GET)
    const { airplane_ID } = req.query;

    // Check if airplane_ID is provided and valid
    if (!airplane_ID || Array.isArray(airplane_ID)) {
      return res.status(400).json({ message: 'Invalid Airplane_ID' });
    }

    // Fetch the Airplane_model_ID by airplane_ID
    const data = await getAirplaneModelIdByAirplaneId(Number(airplane_ID));

    // Check if data was found
    if (data !== null) {
      res.status(200).json({ Airplane_model_ID: data });
    } else {
      res.status(404).json({ message: 'Airplane model not found for the given Airplane_ID' });
    }
  } catch (error) {
    console.error('Error fetching Airplane_model_ID:', error);
    res.status(500).json({ message: 'Error fetching Airplane_model_ID' });
  }
}
