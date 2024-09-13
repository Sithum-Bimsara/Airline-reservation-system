import { NextApiRequest, NextApiResponse } from 'next';
import { getFlightsbyAirportIDsAndDate } from '../../lib/db';
import formatDateForSQL from '@/lib/formatDateForSQL';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { originAirport, destinationAirport, departureDate } = req.query;

    // Validate request parameters
    if (
      !originAirport || typeof originAirport !== 'string' ||
      !destinationAirport || typeof destinationAirport !== 'string' 
     // || !departureDate || isNaN(Date.parse(departureDate as string))
    ) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    // Convert departureDate to Date object
    const departureDateObj = new Date(departureDate as string);

    // Fetch flights for the given parameters
    const data = await getFlightsbyAirportIDsAndDate(originAirport, destinationAirport ); //,formatDateForSQL(departureDateObj));

    // If no data found, return 404
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No flights found for the given data' });
    }

    // Respond with the flight data
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching flights data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
