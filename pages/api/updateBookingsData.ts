// import { NextApiRequest, NextApiResponse } from 'next';
// import { updateBookingsData } from '../../lib/db';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const { id, newData } = req.body;
//       await updateBookingsData(id, newData);
//       res.status(200).json({ message: 'Booking confirmed successfully' });
//     } catch (error) {
//       console.error('Error updating table data:', error);
//       res.status(500).json({ message: 'Error confirming booking' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { updateBookingsData } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { Booking_ID, newData } = req.body;  // Ensure Booking_ID is correctly extracted
      await updateBookingsData(Booking_ID, newData);  // Pass Booking_ID correctly
      res.status(200).json({ message: 'Booking confirmed successfully' });
    } catch (error) {
      console.error('Error updating table data:', error);
      res.status(500).json({ message: 'Error confirming booking' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
