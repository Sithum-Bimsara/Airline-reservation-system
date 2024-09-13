import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface BookingsDataRow {
  Booking_ID: string;
  Flight_ID: string;
  User_ID: number;
  Passenger_ID: number;
  Seat_ID: number;
  Travel_Class: 'Economy' | 'Business' | 'Platinum';
  Price: number;
}

interface Passenger {
  name: string;
  age: string;
  gender: string;
  seat_ID?: number; // Add seat_ID to the Passenger interface
}

const SeatSelectionPage = () => {
  const router = useRouter();
  const {
    query: {
      user_id,
      flight_id,
      airplane_id,
      airplaneModelId,
      seatClass,
      passengerData,
      totalPassengers,
    },
  } = router;

  const [bookingsData, setBookingsData] = useState<BookingsDataRow[] | null>(null);
  const [airplaneModelData, setAirplaneModelData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]); // Allow multiple seat selection

  // Parse passenger data and total passengers from query
  const parsedPassengerData: Passenger[] = passengerData ? JSON.parse(passengerData as string) : [];
  const numberOfPassengers = Number(totalPassengers) || 0;

  // Fetch airplane model data
  useEffect(() => {
    const fetchAirplaneModelData = async () => {
      if (airplaneModelId) {
        try {
          const response = await fetch(`/api/getAirplaneModelDataAirplaneModelId?airplaneModelId=${airplaneModelId}`);
          const data = await response.json();
          setAirplaneModelData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching airplane model data:', error);
          setLoading(false);
        }
      }
    };

    fetchAirplaneModelData();
  }, [airplaneModelId]);

  // Fetch bookings data
  useEffect(() => {
    const fetchBookingsData = async () => {
      if (!flight_id) return;
      try {
        const response = await fetch(`/api/getBookingsDataByFlightID?flight_ID=${flight_id}`);
        const responseData = await response.json();
        const data = responseData.bookings;
        setBookingsData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings data:', error);
        setLoading(false);
      }
    };

    fetchBookingsData();
  }, [flight_id]);

  // Helper function to determine if a seat is booked
  const isSeatBooked = (seatId: number) => {
    return bookingsData?.some((booking) => booking.Seat_ID === seatId);
  };

  // Handle seat selection
  const handleSeatSelection = (seatId: number) => {
    if (!isSeatBooked(seatId)) {
      if (selectedSeats.includes(seatId)) {
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId)); // Deselect seat
      } else if (selectedSeats.length < numberOfPassengers) {
        setSelectedSeats([...selectedSeats, seatId]); // Select seat if within passenger limit
      }
    }
  };
  

  // Handle confirm button click
  const handleConfirm = () => {
    if (selectedSeats.length < numberOfPassengers) {
      alert(`Please select seats for all ${numberOfPassengers} passengers.`);
      return;
    }
  
    // Map each selected seat to the respective passenger
    const updatedPassengerData = parsedPassengerData.map((passenger, index) => ({
      ...passenger,
      seat_ID: selectedSeats[index], // Assign a selected seat to each passenger
    }));
  
    // Navigate to the bookingCompletion page with updated data
    router.push({
      pathname: '/new',
      query: {
        user_id,
        flight_id,
        airplane_id,
        airplaneModelId,
        seatClass,
        seat_IDs: JSON.stringify(selectedSeats),
        user_ID: 1,
        passengerData: JSON.stringify(updatedPassengerData), // Pass updated passenger data
      },
    });
  };
  

  if (loading) {
    return <p>Loading data...</p>;
  }

  const renderSeatButtons = (seatType: 'Economy' | 'Business' | 'Platinum') => {
    let numberOfSeats = 0;
    let startingIndex = 0;

    if (seatType === 'Economy') {
      numberOfSeats = airplaneModelData?.No_of_Economic_Seats || 0;
      startingIndex = airplaneModelData?.Starting_Index_Of_Economic_Seats || 0;
    } else if (seatType === 'Business') {
      numberOfSeats = airplaneModelData?.No_of_Business_Seats || 0;
      startingIndex = airplaneModelData?.Starting_Index_Of_Business_Seats || 0;
    } else if (seatType === 'Platinum') {
      numberOfSeats = airplaneModelData?.No_of_Platinum_Seats || 0;
      startingIndex = airplaneModelData?.Starting_Index_Of_Platinum_Seats || 0;
    }

    return (
      <>
        <h3>{seatType} Class</h3>
        {Array.from({ length: numberOfSeats }).map((_, index) => {
          const seatId = startingIndex + index;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatSelection(seatId)}
              disabled={isSeatBooked(seatId) || seatClass !== seatType}
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: isSeatBooked(seatId)
                  ? 'red'
                  : selectedSeats.includes(seatId)
                  ? 'green'
                  : 'lightgray',
              }}
            >
              {seatId}
            </button>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <h1>Select Your Seat</h1>

      {/* Display Flight and Passenger Details */}
      <div>
        <h2>Flight and Passenger Details</h2>
        <p><strong>Flight ID:</strong> {flight_id}</p>
        <p><strong>Airplane ID:</strong> {airplane_id}</p>
        <p><strong>User ID:</strong> {user_id}</p>
        <p><strong>Airplane Model ID:</strong> {airplaneModelId}</p>
        <p><strong>Seat Class:</strong> {seatClass}</p>
        <p><strong>Total Passengers:</strong> {numberOfPassengers}</p>
        <div>
          <h3>Passenger Details</h3>
          {parsedPassengerData.length > 0 ? (
            <pre>{JSON.stringify(parsedPassengerData, null, 2)}</pre> // Display passenger data in a readable format
          ) : (
            <p>No passenger data available.</p>
          )}
        </div>
      </div>

      {/* Display Airplane Model Data */}
      <div>
        <h2>Available Seats</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {['Economy', 'Business', 'Platinum'].map((seatType) =>
            renderSeatButtons(seatType as 'Economy' | 'Business' | 'Platinum')
          )}
        </div>
      </div>

      {/* Confirm Button */}
      <div>
        <button onClick={handleConfirm} disabled={selectedSeats.length < numberOfPassengers}>
          Confirm
        </button>
      </div>

      {/* Display Bookings Data */}
      <div>
        <h2>Bookings Data</h2>
        {bookingsData && bookingsData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Flight ID</th>
                <th>User ID</th>
                <th>Passenger ID</th>
                <th>Seat ID</th>
                <th>Travel Class</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {bookingsData.map((booking) => (
                <tr key={booking.Booking_ID}>
                  <td>{booking.Booking_ID}</td>
                  <td>{booking.Flight_ID}</td>
                  <td>{booking.User_ID}</td>
                  <td>{booking.Passenger_ID}</td>
                  <td>{booking.Seat_ID}</td>
                  <td>{booking.Travel_Class}</td>
                  <td>{booking.Price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings data available.</p>
        )}
      </div>
    </div>
  );
};

export default SeatSelectionPage;
