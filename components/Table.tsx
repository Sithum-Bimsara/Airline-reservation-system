// import React from 'react';
// import { useRouter } from 'next/router';

// function extractDate(dateString: string) {
//   return dateString.split('T')[0];
// }

// interface FlightDetailsWithSeatAvailabilityRow {
//   Flight_ID: string;
//   Airplane_ID: number;
//   Origin_airport_id: string;
//   Destination_airport_id: string;
//   Departure_date: string;
//   Arrival_date: string;
//   Arrival_time: string;
//   Departure_time: string;
//   Status: 'Scheduled' | 'Delayed' | 'Cancelled';
//   Total_Economic_Seats: number;
//   Available_Economic_Seats: number;
//   Total_Business_Seats: number;
//   Available_Business_Seats: number;
//   Total_Platinum_Seats: number;
//   Available_Platinum_Seats: number;
// }

// interface TableProps {
//   flightdetailswithseatavailabilityData: FlightDetailsWithSeatAvailabilityRow[];
// }

// export default function Table({ flightdetailswithseatavailabilityData }: TableProps) {
//   const router = useRouter();

//   const handleUpdate = (flightdetailswithseatavailabilityrow: FlightDetailsWithSeatAvailabilityRow) => {
//     if (flightdetailswithseatavailabilityrow.Status === 'Delayed') {
//       alert('This flight is delayed.');
//       return;
//     }
    
//     if (flightdetailswithseatavailabilityrow.Status === 'Cancelled') {
//       alert('This flight is cancelled.');
//       return;
//     }

//     const availableSeats =
//       flightdetailswithseatavailabilityrow.Available_Economic_Seats +
//       flightdetailswithseatavailabilityrow.Available_Business_Seats +
//       flightdetailswithseatavailabilityrow.Available_Platinum_Seats;

//     if (availableSeats === 0) {
//       alert('This flight is fully booked.');
//       return;
//     }

//     // Navigate to the travellerClass page with query parameters
//     router.push({
//       pathname: '/travellerClass',
//       query: {
//         flight_ID: flightdetailswithseatavailabilityrow.Flight_ID,
//         airplane_ID: flightdetailswithseatavailabilityrow.Airplane_ID,
//         available_Economic_Seats: flightdetailswithseatavailabilityrow.Available_Economic_Seats,
//         available_Business_Seats: flightdetailswithseatavailabilityrow.Available_Business_Seats,
//         available_Platinum_Seats: flightdetailswithseatavailabilityrow.Available_Platinum_Seats,
//       },
//     });
//   };

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Flight ID</th>
//           <th>Airplane ID</th>
//           <th>Origin Airport ID</th>
//           <th>Destination Airport ID</th>
//           <th>Departure Date</th>
//           <th>Arrival Date</th>
//           <th>Arrival Time</th>
//           <th>Departure Time</th>
//           <th>Status</th>
//           <th>Total Economic Seats</th>
//           <th>Available Economic Seats</th>
//           <th>Total Business Seats</th>
//           <th>Available Business Seats</th>
//           <th>Total Platinum Seats</th>
//           <th>Available Platinum Seats</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {flightdetailswithseatavailabilityData.map((flightdetailswithseatavailabilityrow) => (
//           <tr key={flightdetailswithseatavailabilityrow.Flight_ID}>
//             <td>{flightdetailswithseatavailabilityrow.Flight_ID}</td>
//             <td>{flightdetailswithseatavailabilityrow.Airplane_ID}</td>
//             <td>{flightdetailswithseatavailabilityrow.Origin_airport_id}</td>
//             <td>{flightdetailswithseatavailabilityrow.Destination_airport_id}</td>
//             <td>{extractDate(flightdetailswithseatavailabilityrow.Departure_date)}</td>
//             <td>{extractDate(flightdetailswithseatavailabilityrow.Arrival_date)}</td>
//             <td>{flightdetailswithseatavailabilityrow.Arrival_time}</td>
//             <td>{flightdetailswithseatavailabilityrow.Departure_time}</td>
//             <td>{flightdetailswithseatavailabilityrow.Status}</td>
//             <td>{flightdetailswithseatavailabilityrow.Total_Economic_Seats}</td>
//             <td>{flightdetailswithseatavailabilityrow.Available_Economic_Seats}</td>
//             <td>{flightdetailswithseatavailabilityrow.Total_Business_Seats}</td>
//             <td>{flightdetailswithseatavailabilityrow.Available_Business_Seats}</td>
//             <td>{flightdetailswithseatavailabilityrow.Total_Platinum_Seats}</td>
//             <td>{flightdetailswithseatavailabilityrow.Available_Platinum_Seats}</td>
//             <td>
//               <button onClick={() => handleUpdate(flightdetailswithseatavailabilityrow)}>Book Flight</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
import React from 'react';
import { useRouter } from 'next/router';

function extractDate(dateString: string) {
  return dateString.split('T')[0];
}

interface FlightDetailsWithSeatAvailabilityRow {
  Flight_ID: string;
  Airplane_ID: number;
  Origin_airport_id: string;
  Destination_airport_id: string;
  Departure_date: string;
  Arrival_date: string;
  Arrival_time: string;
  Departure_time: string;
  Status: 'Scheduled' | 'Delayed' | 'Cancelled';
  Total_Economic_Seats: number;
  Available_Economic_Seats: number;
  Total_Business_Seats: number;
  Available_Business_Seats: number;
  Total_Platinum_Seats: number;
  Available_Platinum_Seats: number;
}

interface TableProps {
  flightdetailswithseatavailabilityData: FlightDetailsWithSeatAvailabilityRow[];
}

export default function Table({ flightdetailswithseatavailabilityData }: TableProps) {
  const router = useRouter();
  
  // Extract user_id from query parameters
  const { user_id } = router.query;

  const handleUpdate = (flightdetailswithseatavailabilityrow: FlightDetailsWithSeatAvailabilityRow) => {
    if (flightdetailswithseatavailabilityrow.Status === 'Delayed') {
      alert('This flight is delayed.');
      return;
    }
    
    if (flightdetailswithseatavailabilityrow.Status === 'Cancelled') {
      alert('This flight is cancelled.');
      return;
    }

    const availableSeats =
      flightdetailswithseatavailabilityrow.Available_Economic_Seats +
      flightdetailswithseatavailabilityrow.Available_Business_Seats +
      flightdetailswithseatavailabilityrow.Available_Platinum_Seats;

    if (availableSeats === 0) {
      alert('This flight is fully booked.');
      return;
    }

    // Navigate to the travellerClass page with query parameters
    router.push({
      pathname: '/travellerClass',
      query: {
        flight_ID: flightdetailswithseatavailabilityrow.Flight_ID,
        airplane_ID: flightdetailswithseatavailabilityrow.Airplane_ID,
        available_Economic_Seats: flightdetailswithseatavailabilityrow.Available_Economic_Seats,
        available_Business_Seats: flightdetailswithseatavailabilityrow.Available_Business_Seats,
        available_Platinum_Seats: flightdetailswithseatavailabilityrow.Available_Platinum_Seats,
        user_id: user_id, // Include user_id in the query parameters
      },
    });
  };

  return (
    <div>
      {/* Display the user_id */}
      <h2>User ID: {user_id}</h2>
      
      <table>
        <thead>
          <tr>
            <th>Flight ID</th>
            <th>Airplane ID</th>
            <th>Origin Airport ID</th>
            <th>Destination Airport ID</th>
            <th>Departure Date</th>
            <th>Arrival Date</th>
            <th>Arrival Time</th>
            <th>Departure Time</th>
            <th>Status</th>
            <th>Total Economic Seats</th>
            <th>Available Economic Seats</th>
            <th>Total Business Seats</th>
            <th>Available Business Seats</th>
            <th>Total Platinum Seats</th>
            <th>Available Platinum Seats</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {flightdetailswithseatavailabilityData.map((flightdetailswithseatavailabilityrow) => (
            <tr key={flightdetailswithseatavailabilityrow.Flight_ID}>
              <td>{flightdetailswithseatavailabilityrow.Flight_ID}</td>
              <td>{flightdetailswithseatavailabilityrow.Airplane_ID}</td>
              <td>{flightdetailswithseatavailabilityrow.Origin_airport_id}</td>
              <td>{flightdetailswithseatavailabilityrow.Destination_airport_id}</td>
              <td>{extractDate(flightdetailswithseatavailabilityrow.Departure_date)}</td>
              <td>{extractDate(flightdetailswithseatavailabilityrow.Arrival_date)}</td>
              <td>{flightdetailswithseatavailabilityrow.Arrival_time}</td>
              <td>{flightdetailswithseatavailabilityrow.Departure_time}</td>
              <td>{flightdetailswithseatavailabilityrow.Status}</td>
              <td>{flightdetailswithseatavailabilityrow.Total_Economic_Seats}</td>
              <td>{flightdetailswithseatavailabilityrow.Available_Economic_Seats}</td>
              <td>{flightdetailswithseatavailabilityrow.Total_Business_Seats}</td>
              <td>{flightdetailswithseatavailabilityrow.Available_Business_Seats}</td>
              <td>{flightdetailswithseatavailabilityrow.Total_Platinum_Seats}</td>
              <td>{flightdetailswithseatavailabilityrow.Available_Platinum_Seats}</td>
              <td>
                <button onClick={() => handleUpdate(flightdetailswithseatavailabilityrow)}>Book Flight</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
