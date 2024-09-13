import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import formatDateForSQL from '@/lib/formatDateForSQL';

// Define the interface for flight data
interface Flight {
  Flight_ID: string;
  Airplane_ID: number;
  Origin_airport_id: string;
  Destination_airport_id: string;
  Departure_date: string;
  Arrival_date: string;
  Arrival_time: string;
  Departure_time: string;
  Status: 'Scheduled' | 'Delayed' | 'Cancelled';
}

export default function FlightData() {
  const router = useRouter();
  const { user_id, originAirportID, destinationAirportID, departureDate } = router.query;

  const [flights, setFlights] = useState<Flight[]>([]); // Ensure flights is an array
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (originAirportID && destinationAirportID && departureDate) {
      // Convert departureDate to a string if it's an array, then to a Date object
      const date = Array.isArray(departureDate)
        ? new Date(departureDate[0])
        : new Date(departureDate);

      // Ensure valid date conversion
      if (!isNaN(date.getTime())) {
        const formattedDate = formatDateForSQL(date);

        fetch(`/api/getFlights?originAirport=${originAirportID}&destinationAirport=${destinationAirportID}`)
        // fetch(`/api/getFlights?originAirport=${originAirportID}&destinationAirport=${destinationAirportID}&departureDate=${formattedDate}`)
          .then(response => response.json())
          .then(data => {
            // Check if the data is an array before setting it to flights
            if (Array.isArray(data)) {
              setFlights(data);
            } else {
              console.error('Data is not an array:', data);
              setFlights([]); // Set flights to an empty array if data is not an array
            }
            setLoading(false); // Set loading to false after data is fetched
          })
          .catch(error => {
            console.error('Error fetching flight data:', error);
            setLoading(false); // Set loading to false in case of error
          });
      }
    }
  }, [originAirportID, destinationAirportID, departureDate]);

  // Define the handleBook function
  const handleBook = (flight: Flight) => {
    if (flight.Status == "Delayed"){console.log("Flight is Delayed.");}
    if (flight.Status == "Cancelled"){console.log("Flight is canceled");}
    else{
      
      

    router.push({
      pathname: '/travellerClass',
      query: {
        user_id: user_id,
        flight_id: flight.Flight_ID,
        airplane_id: flight.Airplane_ID,
      },
    });
  }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  return (
    <div>
      <div>User ID: {user_id}</div>
      <div>Origin Airport ID: {originAirportID}</div>
      <div>Destination Airport ID: {destinationAirportID}</div>

      <h1>Available Flights</h1>
      {flights.length === 0 ? (
        <p>No flights available for the selected criteria.</p>
      ) : (
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.Flight_ID}>
                <td>{flight.Flight_ID}</td>
                <td>{flight.Airplane_ID}</td>
                <td>{flight.Origin_airport_id}</td>
                <td>{flight.Destination_airport_id}</td>
                <td>{flight.Departure_date}</td>
                <td>{flight.Arrival_date}</td>
                <td>{flight.Arrival_time}</td>
                <td>{flight.Departure_time}</td>
                <td>{flight.Status}</td>
                <td>
                  <button onClick={() => handleBook(flight)}>Book Flight</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
