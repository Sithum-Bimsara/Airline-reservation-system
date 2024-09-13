import { NextApiRequest, NextApiResponse } from 'next';
import { getBookingsDataByFlightID } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { flight_ID } = req.query;

    // Validate Flight_ID
    if (!flight_ID || typeof flight_ID !== 'string') {
      return res.status(400).json({ message: 'Invalid Flight_ID' });
    }

    // Fetch the bookings data for the given flight_ID
    const data = await getBookingsDataByFlightID(flight_ID);

    // If no data found, return 404
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No bookings found for the given Flight_ID' });
    }

    // Respond with the data
    res.status(200).json({ bookings: data });
  } catch (error) {
    console.error('Error fetching bookings data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
