import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const PassengerDetailsPage = () => {
  const router = useRouter();
  const {
    query: {
      flight_id,
      airplane_id,
      airplaneModelId,
      user_id,
      seatClass,
      adults,
      children,
    },
  } = router;

  const totalPassengers = Number(adults) + Number(children);
  const [passengerDetails, setPassengerDetails] = useState(
    Array(totalPassengers).fill({ name: '', age: '', gender: '' })
  );

  // Handle input change for passenger details
  const handleInputChange = (index: number, field: string, value: string) => {
    const newDetails = [...passengerDetails];
    newDetails[index] = { ...newDetails[index], [field]: value };
    setPassengerDetails(newDetails);
  };

  const handleSubmit = () => {
    // Check if all passengers' details are filled out
    const incomplete = passengerDetails.some(
      (passenger) => !passenger.name || !passenger.age || !passenger.gender
    );

    if (incomplete) {
      alert('Please fill in all passenger details.');
      return;
    }

    // Navigate to the next page with all relevant data
    router.push({
      pathname: '/seatSelectionPage', // Replace with your next page path
      query: {
        user_id,
        flight_id,
        airplane_id,
        airplaneModelId,
        seatClass,
        totalPassengers,
        passengerData: JSON.stringify(passengerDetails),
      },
    });
  };

  return (
    <div>
      <h1>Passenger Details</h1>
      <p><strong>User Id:</strong> {user_id}</p>

      <div>
        <h2>Flight Details</h2>
        <p><strong>Flight ID:</strong> {flight_id}</p>
        <p><strong>Airplane ID:</strong> {airplane_id}</p>
        <p><strong>Airplane Model ID:</strong> {airplaneModelId}</p>
        <p><strong>Seat Class:</strong> {seatClass}</p>
        <p><strong>Total Passengers:</strong> {totalPassengers}</p>
      </div>

      {Array.from({ length: totalPassengers }, (_, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3>Passenger {index + 1}</h3>

          <label>
            Name:
            <input
              type="text"
              value={passengerDetails[index].name}
              onChange={(e) =>
                handleInputChange(index, 'name', e.target.value)
              }
            />
          </label>
          <br />

          <label>
            Age:
            <input
              type="number"
              value={passengerDetails[index].age}
              onChange={(e) => handleInputChange(index, 'age', e.target.value)}
            />
          </label>
          <br />

          <label>
            Gender:
            <select
              value={passengerDetails[index].gender}
              onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>
      ))}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PassengerDetailsPage;
