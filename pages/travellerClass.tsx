
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface StartingSeatIdsWithAirplaneModelDataRow {
  Airplane_model_ID: number;
  No_of_Economic_Seats: number;
  No_of_Business_Seats: number;
  No_of_Platinum_Seats: number;
  Starting_Index_Of_Economic_Seats: number;
  Starting_Index_Of_Business_Seats: number;
  Starting_Index_Of_Platinum_Seats: number;
}

const TravellerClass = () => {
  const router = useRouter();
  const {
    query: {
      user_id,
      flight_id,
      airplane_id,
    },
  } = router;

  // Retrieve the query parameters from the previous page (passenger details)
  const { passengerData } = router.query;
  const passengers = passengerData ? JSON.parse(passengerData as string) : [];

  const [startingSeatIdsData, setStartingSeatIdsData] = useState<StartingSeatIdsWithAirplaneModelDataRow[]>([]);
  const [selectedSeatClass, setSelectedSeatClass] = useState<string | null>(null);
  const [airplaneModelId, setAirplaneModelId] = useState<number | null>(null);
  const [adults, setAdults] = useState(1); // At least 1 adult should be selected
  const [children, setChildren] = useState(0);

  const handleAdultChange = (amount: number) => {
    setAdults((prev) => Math.max(1, prev + amount)); // Ensure at least 1 adult
  };

  const handleChildChange = (amount: number) => {
    if (adults > 0) {
      setChildren((prev) => Math.max(0, prev + amount));
    }
  };

  const handleSubmit = async () => {
    if (adults <= 0) {
      alert('You must select at least 1 adult.');
      return;
    }

    if (!selectedSeatClass) {
      alert('Please select a seat class.');
      return;
    }

    // if (selectedSeatClass === 'Economy' && Number(available_Economic_Seats) === 0) {
    //   alert('You cannot get an economy seat since all are booked.');
    //   return;
    // }

    // if (selectedSeatClass === 'Business' && Number(available_Business_Seats) === 0) {
    //   alert('You cannot get a business seat since all are booked.');
    //   return;
    // }

    // if (selectedSeatClass === 'Platinum' && Number(available_Platinum_Seats) === 0) {
    //   alert('You cannot get a platinum seat since all are booked.');
    //   return;
    // }

    //Redirect to the passenger details page with relevant query parameters
    router.push({
      pathname: '/passengerDetails',
      query: {
        flight_id,
        airplane_id,
        airplaneModelId,
        user_id, // Example user ID, adjust as necessary
        seatClass: selectedSeatClass,
        adults,
        children,
      },
    });
  };

  // useEffect(() => {
  //   const fetchStartingSeatIdsData = async () => {
  //     try {
  //       const response = await fetch('/api/get_starting_seat_ids_with_airplane_model_data');
  //       const data = await response.json();
  //       setStartingSeatIdsData(data);
  //     } catch (error) {
  //       console.error('Error fetching starting seat IDs data:', error);
  //     }
  //   };

  //   fetchStartingSeatIdsData();
  // }, []);

  useEffect(() => {
    const fetchAirplaneModelId = async () => {
      if (airplane_id) {
        try {
          const response = await fetch(`/api/getAirplaneModelIdByAirplaneId?airplane_ID=${airplane_id}`);
          const data = await response.json();
          if (data.Airplane_model_ID) {
            setAirplaneModelId(data.Airplane_model_ID);
          } else {
            console.error('No Airplane_model_ID found for the given Airplane_ID');
            setAirplaneModelId(null);
          }
        } catch (error) {
          console.error('Error fetching Airplane_model_ID:', error);
        }
      }
    };

    fetchAirplaneModelId();
  }, [airplane_id]);

  return (
    <div>
      <h1>Select Your Seat Class</h1>
      <p><strong>User Id:</strong> {user_id}</p>

      {/* Display Flight Details */}
      <div>
        <h2>Flight Details</h2>
        <p><strong>Flight ID:</strong> {flight_id}</p>
        <p><strong>Airplane ID:</strong> {airplane_id}</p>
        <p><strong>Airplane Model ID:</strong> {airplaneModelId}</p> {/* Display Airplane Model ID */}
      </div>



      <div>
        <h1>Booking Selection</h1>

        {/* Adult Selection */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Adults (12+ years)</h3>
          <button onClick={() => handleAdultChange(-1)} disabled={adults <= 1}>
            -
          </button>
          <span style={{ margin: '0 15px' }}>{adults}</span>
          <button onClick={() => handleAdultChange(1)}>+</button>
        </div>

        {/* Child Selection */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Children (2-11 years)</h3>
          <button onClick={() => handleChildChange(-1)} disabled={children <= 0}>
            -
          </button>
          <span style={{ margin: '0 15px' }}>{children}</span>
          <button onClick={() => handleChildChange(1)}>+</button>
        </div>

        {/* Seat Selection Buttons */}
        <div>
          <button onClick={() => setSelectedSeatClass('Economy')}>Economy</button>
          <button onClick={() => setSelectedSeatClass('Business')}>Business</button>
          <button onClick={() => setSelectedSeatClass('Platinum')}>Platinum</button>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default TravellerClass;
