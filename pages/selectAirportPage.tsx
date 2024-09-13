// // import React, { useEffect, useState } from 'react';
// // import { useRouter } from 'next/router';

// // // Define the interface for airport data including name, country, and id
// // interface Airport {
// //   Airport_ID: string;
// //   Airport_name: string;
// //   Country: string;
// // }

// // export default function SelectAirport() {
// //   const [airports, setAirports] = useState<Airport[]>([]);
// //   const [formData, setFormData] = useState({
// //     originAirportID: '',
// //     destinationAirportID: '',
// //     departureDate: '',
// //   });

// //   const router = useRouter();
// //   const { user_id } = router.query; // Retrieve the user_id from the query parameters

// //   useEffect(() => {
// //     // Fetch airport data from the API
// //     fetch('/api/getAirportsData')
// //       .then((response) => response.json())
// //       .then((data) => setAirports(data))
// //       .catch((error) => console.error('Error fetching airport data:', error));
// //   }, []);

// //   const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     const { originAirportID, destinationAirportID, departureDate } = formData;

// //     if (!originAirportID || !destinationAirportID || !departureDate) {
// //       alert('Please select both origin and destination airports and a departure date');
// //       return;
// //     }

// //     if (originAirportID === destinationAirportID) {
// //       alert('Origin and destination airports cannot be the same');
// //       return;
// //     }

// //     // Show a confirmation dialog with details
// //     const confirmDetails = `You are about to proceed with the following details:\n\nUser ID: ${user_id}\nOrigin Airport ID: ${originAirportID}\nDestination Airport ID: ${destinationAirportID}\nDeparture Date: ${departureDate}\n\nDo you want to proceed?`;

// //     if (window.confirm(confirmDetails)) {
// //       // If user confirms, navigate to the flightData page
// //       router.push({
// //         pathname: '/flightData',
// //         query: {
// //           user_id: user_id,
// //           originAirportID: originAirportID,          // Pass the selected origin airport ID
// //           destinationAirportID: destinationAirportID, // Pass the selected destination airport ID
// //           departureDate: departureDate,
// //         },
// //       });
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Select Airports and Departure Date</h1>
// //       <h2>User ID: {user_id}</h2>

// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label htmlFor="originAirport">Origin Airport:</label>
// //           <select
// //             name="originAirportID"
// //             value={formData.originAirportID}
// //             onChange={handleChange}
// //           >
// //             <option value="">Select Origin</option>
// //             {airports.map((airport) => (
// //               <option key={airport.Airport_ID} value={airport.Airport_ID}>
// //                 {airport.Airport_ID} - {airport.Airport_name} ({airport.Country})
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div>
// //           <label htmlFor="destinationAirport">Destination Airport:</label>
// //           <select
// //             name="destinationAirportID"
// //             value={formData.destinationAirportID}
// //             onChange={handleChange}
// //           >
// //             <option value="">Select Destination</option>
// //             {airports.map((airport) => (
// //               <option key={airport.Airport_ID} value={airport.Airport_ID}>
// //                 {airport.Airport_ID} - {airport.Airport_name} ({airport.Country})
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div>
// //           <label htmlFor="departureDate">Departure Date:</label>
// //           <input
// //             type="date"
// //             name="departureDate"
// //             value={formData.departureDate}
// //             onChange={handleChange}
// //           />
// //         </div>

// //         <button type="submit">Proceed to Flight Data</button>
// //       </form>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// // Define the interface for airport data including name, country, and id
// interface Airport {
//   Airport_ID: string;
//   Airport_name: string;
//   Country: string;
// }

// export default function SelectAirport() {
//   const [airports, setAirports] = useState<Airport[]>([]); // Holds the airport data
//   const [formData, setFormData] = useState({
//     originAirportID: '',
//     destinationAirportID: '',
//     departureDate: '',
//   });

//   const router = useRouter();
//   const { user_id } = router.query; // Retrieve the user_id from the query parameters

//   useEffect(() => {
//     // Fetch airport data from the API
//     fetch('/api/getAirportsData')
//       .then((response) => response.json())
//       .then((data) => setAirports(data))
//       .catch((error) => console.error('Error fetching airport data:', error));
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const { originAirportID, destinationAirportID, departureDate } = formData;

//     if (!originAirportID || !destinationAirportID || !departureDate) {
//       alert('Please select both origin and destination airports and a departure date');
//       return;
//     }

//     if (originAirportID === destinationAirportID) {
//       alert('Origin and destination airports cannot be the same');
//       return;
//     }

//     // Show a confirmation dialog with details
//     const confirmDetails = `You are about to proceed with the following details:\n\nUser ID: ${user_id}\nOrigin Airport ID: ${originAirportID}\nDestination Airport ID: ${destinationAirportID}\nDeparture Date: ${departureDate}\n\nDo you want to proceed?`;

//     if (window.confirm(confirmDetails)) {
//       // If user confirms, navigate to the flightData page
//       router.push({
//         pathname: '/flightData',
//         query: {
//           user_id: user_id,
//           originAirportID: originAirportID,
//           destinationAirportID: destinationAirportID,
//           departureDate: departureDate,
//         },
//       });
//     }
//   };

//   return (
//     <div>
//       <h1>Select Airports and Departure Date</h1>
//       <h2>User ID: {user_id}</h2>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="originAirport">Origin Airport:</label>
//           <select
//             name="originAirportID"
//             value={formData.originAirportID}
//             onChange={handleChange}
//           >
//             <option value="">Select Origin</option>
//             {airports.map((airport) => (
//               <option key={airport.Airport_ID} value={airport.Airport_ID}>
//                 {airport.Airport_ID} - {airport.Airport_name} ({airport.Country})
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label htmlFor="destinationAirport">Destination Airport:</label>
//           <select
//             name="destinationAirportID"
//             value={formData.destinationAirportID}
//             onChange={handleChange}
//           >
//             <option value="">Select Destination</option>
//             {airports.map((airport) => (
//               <option key={airport.Airport_ID} value={airport.Airport_ID}>
//                 {airport.Airport_ID} - {airport.Airport_name} ({airport.Country})
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label htmlFor="departureDate">Departure Date:</label>
//           <input
//             type="date"
//             name="departureDate"
//             value={formData.departureDate}
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit">Proceed to Flight Data</button>
//       </form>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles//selectAirportPage.module.css';

// Define the interface for airport data including name, country, and id
interface Airport {
  Airport_ID: string;
  Airport_name: string;
  Country: string;
}

export default function SelectAirport() {
  const [airports, setAirports] = useState<Airport[]>([]); // Holds the airport data
  const [formData, setFormData] = useState({
    originAirportID: '',
    destinationAirportID: '',
    departureDate: '',
  });

  const router = useRouter();
  const { user_id } = router.query; // Retrieve the user_id from the query parameters

  useEffect(() => {
    // Fetch airport data from the API
    fetch('/api/getAirportsData')
      .then((response) => response.json())
      .then((data) => setAirports(data))
      .catch((error) => console.error('Error fetching airport data:', error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { originAirportID, destinationAirportID, departureDate } = formData;

    if (!originAirportID || !destinationAirportID || !departureDate) {
      alert('Please select both origin and destination airports and a departure date');
      return;
    }

    if (originAirportID === destinationAirportID) {
      alert('Origin and destination airports cannot be the same');
      return;
    }

    // Show a confirmation dialog with details
    const confirmDetails = `You are about to proceed with the following details:\n\nUser ID: ${user_id}\nOrigin Airport ID: ${originAirportID}\nDestination Airport ID: ${destinationAirportID}\nDeparture Date: ${departureDate}\n\nDo you want to proceed?`;

    if (window.confirm(confirmDetails)) {
      // If user confirms, navigate to the flightData page
      router.push({
        pathname: '/flightData',
        query: {
          user_id: user_id,
          originAirportID: originAirportID,
          destinationAirportID: destinationAirportID,
          departureDate: departureDate,
        },
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select Airports and Departure Date</h1>
      <h2 className={styles.subtitle}>User ID: {user_id}</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="originAirport" className={styles.inputLabel}>Origin Airport:</label>
          <select
            name="originAirportID"
            value={formData.originAirportID}
            onChange={handleChange}
            className={styles.selectInput}
          >
            <option value="">Select Origin</option>
            {airports.map((airport) => (
              <option key={airport.Airport_ID} value={airport.Airport_ID}>
                {airport.Airport_ID} - {airport.Airport_name} ({airport.Country})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="destinationAirport" className={styles.inputLabel}>Destination Airport:</label>
          <select
            name="destinationAirportID"
            value={formData.destinationAirportID}
            onChange={handleChange}
            className={styles.selectInput}
          >
            <option value="">Select Destination</option>
            {airports.map((airport) => (
              <option key={airport.Airport_ID} value={airport.Airport_ID}>
                {airport.Airport_ID} - {airport.Airport_name} ({airport.Country})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="departureDate" className={styles.inputLabel}>Departure Date:</label>
          <input
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            className={styles.dateInput}
          />
        </div>

        <button type="submit" className={styles.submitButton}>Search Flights</button>
      </form>
    </div>
  );
}
