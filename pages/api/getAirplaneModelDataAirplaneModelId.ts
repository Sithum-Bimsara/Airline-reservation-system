// // pages/api/getAirplaneModelDataAirplaneId.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { getAirplaneModelDataAirplaneModelId } from '../../lib/db';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Extract the airplaneModelId from the request query (GET)
//     const { airplaneModelId } = req.query;

//     // Check if airplaneModelId is provided and valid
//     if (!airplaneModelId || Array.isArray(airplaneModelId)) {
//       return res.status(400).json({ message: 'Invalid airplaneModelId' });
//     }

//     // Fetch the Airplane model data by airplaneModelId
//     const data = await getAirplaneModelDataAirplaneModelId(Number(airplaneModelId));

//     // Check if data was found
//     if (data !== null) {
//       res.status(200).json(data); // Return the full airplane model data
//     } else {
//       res.status(404).json({ message: 'Airplane model data not found for the given Airplane Model ID' });
//     }
//   } catch (error) {
//     console.error('Error fetching Airplane model data:', error);
//     res.status(500).json({ message: 'Error fetching Airplane model data' });
//   }
// }


// pages/api/getAirplaneModelDataAirplaneId.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAirplaneModelDataAirplaneModelId } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { airplaneModelId } = req.query;

    if (!airplaneModelId || Array.isArray(airplaneModelId)) {
      return res.status(400).json({ message: 'Invalid airplaneModelId' });
    }

    const data = await getAirplaneModelDataAirplaneModelId(Number(airplaneModelId));

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: 'Airplane model data not found' });
    }
  } catch (error) {
    console.error('Error fetching airplane model data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
