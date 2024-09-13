import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import formatDateForSQL from '@/lib/formatDateForSQL';

interface Passenger {
  name: string;
  age: string;
  gender: string;
  seat_ID: number;
}

const BookingCompletionPage = () => {
  const router = useRouter();
  const {
    query: {
      user_id,
      flight_id,
      airplane_id,
      airplaneModelId,
      seatClass,
      seat_IDs, // Array of selected seat IDs
      user_ID,
      passengerData, // Contains updated passenger data with assigned seat IDs
    },
  } = router;

  const [parsedPassengerData, setParsedPassengerData] = useState<Passenger[]>([]);
  const [newBookingID, setNewBookingID] = useState<string | null>(null);
  const [latestBookingID, setLatestBookingID] = useState<string | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [passengerCount, setPassengerCount] = useState<number>(0);

  // Parse passenger data and seat IDs
  useEffect(() => {
    if (passengerData) {
      const parsedData: Passenger[] = JSON.parse(passengerData as string);
      setParsedPassengerData(parsedData);
    }
  }, [passengerData]);

  // Fetch the latest Booking ID
  useEffect(() => {
    const fetchLatestBookingID = async () => {
      try {
        const response = await fetch('/api/getBookingsData');
        const data = await response.json();

        // Sort data based on the numeric part of Booking_ID
        data.sort((a: any, b: any) => {
          const idA = parseInt(a.Booking_ID.substring(1), 10); // Extract number from Booking_ID
          const idB = parseInt(b.Booking_ID.substring(1), 10); // Extract number from Booking_ID
          return idB - idA; // Sort in descending order to get the maximum one first
        });

        const latestID = data[0]?.Booking_ID;
        setLatestBookingID(latestID);

        // Generate new Booking ID based on the latest ID
        if (latestID) {
          const lastNumber = parseInt(latestID.substring(1), 10);
          const newNumber = lastNumber + 1;
          setNewBookingID(`B${newNumber.toString().padStart(3, '0')}`);
        } else {
          setNewBookingID('B001'); // If no bookings exist, start with B001
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchLatestBookingID();
  }, []);

  // Fetch the total passenger count to generate new Passenger IDs
  useEffect(() => {
    const fetchTotalPassengerCount = async () => {
      try {
        const response = await fetch('/api/getTotalPassengerCountData');
        const data = await response.json();
        const currentPassengerCount = data.passengerCount || 0;
        setPassengerCount(currentPassengerCount);
      } catch (error) {
        console.error('Error fetching total passenger count:', error);
      }
    };

    fetchTotalPassengerCount();
  }, []);

  // Function to create a new passenger in the system
  const createPassenger = async (passenger: Passenger, passengerID: string) => {
    try {
      const response = await fetch('/api/createPassenger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Passenger_ID: passengerID,
          newData: {
            Name: passenger.name,
            Age: passenger.age,
            Gender: passenger.gender,
            Flight_ID: flight_id,
            Seat_ID: passenger.seat_ID,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error creating passenger: ${errorData.message}`);
      }
    } catch (error) {
      console.error(`Error creating passenger ${passenger.name}:`, error);
    }
  };

  // Function to create a new booking in the system
  const createBooking = async (passengerID: string, bookingID: string) => {
    try {
      const response = await fetch('/api/updateBookingsData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Booking_ID: bookingID,
          newData: {
            Flight_ID: flight_id,
            User_ID: user_id,
            Passenger_ID: passengerID,
            Seat_ID: parsedPassengerData.find(
              (passenger) => passengerID === `${passengerCount + 1}`
            )?.seat_ID,
            Travel_Class: seatClass,
            Issue_date: formatDateForSQL(new Date()), // Format date for SQL
            Price: 100, // Example price; adjust as needed
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error creating booking: ${errorData.message}`);
      }
    } catch (error) {
      console.error(`Error creating booking for Passenger ID ${passengerID}:`, error);
    }
  };

  // Function to handle the booking confirmation and creating passengers and bookings
  const handleConfirmBooking = async () => {
    if (!newBookingID) {
      alert('Booking ID is not available.');
      return;
    }

    if (parsedPassengerData.length === 0) {
      alert('No passenger data available.');
      return;
    }

    // Display a confirmation popup
    const userConfirmed = window.confirm(`New Booking ID: ${newBookingID}\nDo you want to proceed with this booking?`);

    if (!userConfirmed) {
      alert('Booking process was cancelled.');
      return;
    }

    // Loop through each passenger and create them in the system
    let currentPassengerCount = passengerCount; // Start with the current count of passengers

    for (const passenger of parsedPassengerData) {
      currentPassengerCount++; // Increment the count for each passenger

      const passengerID = `${currentPassengerCount}`; // Create a new Passenger ID
      const bookingID = newBookingID; // Use the current Booking ID

      try {
        // Create passenger
        await createPassenger(passenger, passengerID);

        // Create booking for the passenger
        await createBooking(passengerID, bookingID);

        // Update the newBookingID for the next passenger
        const lastNumber = parseInt(bookingID.substring(1), 10);
        const newNumber = lastNumber + 1;
        setNewBookingID(`B${newNumber.toString().padStart(3, '0')}`);
      } catch (error) {
        console.error('Error processing booking:', error);
      }
    }

    alert('Booking Confirmed! Passengers and bookings created successfully.');
    // Redirect to the index page after the confirmation popup
    router.push('/');
  };

  return (
    <div>
      <h1>Booking Completion</h1>
      <p><strong>User Id: </strong> {user_id}</p>

      {/* Flight and Seat Details */}
      <div>
        <h2>Flight and Seat Information</h2>
        <p>
          <strong>Flight ID:</strong> {flight_id}
        </p>
        <p>
          <strong>Airplane ID:</strong> {airplane_id}
        </p>
        <p>
          <strong>Airplane Model ID:</strong> {airplaneModelId}
        </p>
        <p>
          <strong>Seat Class:</strong> {seatClass}
        </p>
        <p>
          <strong>Latest Booking ID:</strong> {latestBookingID}
        </p>{' '}
        {/* Display latestBookingID */}
        <p>
          <strong>Total Passengers in Database:</strong> {passengerCount}
        </p>
      </div>

      {/* Passenger Details */}
      <div>
        <h2>Passenger Details</h2>
        {parsedPassengerData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Passenger Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Assigned Seat ID</th>
              </tr>
            </thead>
            <tbody>
              {parsedPassengerData.map((passenger, index) => (
                <tr key={index}>
                  <td>{passenger.name}</td>
                  <td>{passenger.age}</td>
                  <td>{passenger.gender}</td>
                  <td>{passenger.seat_ID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No passenger data available.</p>
        )}
      </div>

      {/* Confirm Booking Button */}
      <div>
        <button onClick={handleConfirmBooking}>Confirm Booking</button>
      </div>
    </div>
  );
};

export default BookingCompletionPage;
