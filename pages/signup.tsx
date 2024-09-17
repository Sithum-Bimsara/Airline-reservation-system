// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import formatDateForSQL from '@/lib/formatDateForSQL';
// import styles from '../styles/signup.module.css';

// const Signup = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     User_type: 'Customer',
//     User_name: '',
//     First_name: '',
//     Last_name: '',
//     date_of_birth: '',
//     Country: '',
//     NIC_code: '',
//     Gender: 'Male', // Default to 'Male'
//     Email: '',
//     Membership_Type: 'Normal', // Set default membership type to "Normal"
//     No_of_booking: 0,
//     Password: '',
//   });
//   const [userCount, setUserCount] = useState(0);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   useEffect(() => {
//     const fetchTotalPassengerCount = async () => {
//       try {
//         const response = await fetch('/api/getTotalUsersCountData');
//         const data = await response.json();
//         const currentUserCount = data.userCount || 0;
//         setUserCount(currentUserCount);
//       } catch (error) {
//         console.error('Error fetching total user count:', error);
//       }
//     };

//     fetchTotalPassengerCount();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const today = new Date();
//     const selectedDate = new Date(formData.date_of_birth);
//     const age = today.getFullYear() - selectedDate.getFullYear();
//     const monthDifference = today.getMonth() - selectedDate.getMonth();
    
//     if (
//       age < 18 || 
//       (age === 18 && monthDifference < 0) || 
//       (age === 18 && monthDifference === 0 && today.getDate() < selectedDate.getDate())
//     ) {
//       alert('You must be at least 18 years old to sign up.');
//       return;
//     }

//     try {
//       const newUserID = (userCount + 1).toString(); // Generate new User_ID
  
//       const dateOfBirth = new Date(formData.date_of_birth);
//       const formattedDateOfBirth = formatDateForSQL(dateOfBirth);
  
//       // Ensure Gender is one of the ENUM values
//       const validGender = formData.Gender === 'Male' || formData.Gender === 'Female' || formData.Gender === 'Other' 
//         ? formData.Gender
//         : 'Other'; // Default to 'Other' if invalid

//       // Display a preview of the data that will be passed to the next page
//       window.alert(
//         `User Data Preview:\n
//         User ID: ${newUserID}\n`
//       );

//       const response = await fetch('/api/createUser', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           User_ID: newUserID,
//           newData: {
//             User_type: formData.User_type,
//             User_name: formData.User_name,
//             First_name: formData.First_name,
//             Last_name: formData.Last_name,
//             date_of_birth: formattedDateOfBirth,
//             Country: formData.Country,
//             NIC_code: formData.NIC_code,
//             Gender: validGender, // Ensure valid gender value is used
//             Email: formData.Email,
//             Membership_Type: formData.Membership_Type,
//             No_of_booking: formData.No_of_booking,
//             Password: formData.Password,
//           },
//         }),
//       });
  
//       const result = await response.json();
//       if (response.ok) {
//         // Redirect to the next page with the new user ID
//         router.push({
//           pathname: '/selectAirportPage',
//           query: {
//             user_id: newUserID,
//           },
//         });
//       } else {
//         alert('Error creating user: ' + result.message);
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('An error occurred. Please try again.');
//     }
//   };
  
//   return (
//     <div>
//       <h1>Logging Page</h1>
//       {/* Display total user count */}
//       <p>Total Registered Users: {userCount}</p>
//       <form onSubmit={handleSubmit}>
//         <label>
//           User Name:
//           <input type="text" name="User_name" value={formData.User_name} onChange={handleChange} />
//         </label>
//         <label>
//           First Name:
//           <input type="text" name="First_name" value={formData.First_name} onChange={handleChange} />
//         </label>
//         <label>
//           Last Name:
//           <input type="text" name="Last_name" value={formData.Last_name} onChange={handleChange} />
//         </label>
//         <label>
//           Date of Birth:
//           <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
//         </label>
//         <label>
//           Country:
//           <input type="text" name="Country" value={formData.Country} onChange={handleChange} />
//         </label>
//         <label>
//           NIC Code:
//           <input type="text" name="NIC_code" value={formData.NIC_code} onChange={handleChange} />
//         </label>
//         <label>
//           Gender:
//           <select name="Gender" value={formData.Gender} onChange={handleChange}>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>
//         <label>
//           Email:
//           <input type="email" name="Email" value={formData.Email} onChange={handleChange} />
//         </label>
//         <label>
//           Password:
//           <input type="password" name="Password" value={formData.Password} onChange={handleChange} />
//         </label>
//         <button type="submit">Create User</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import formatDateForSQL from '@/lib/formatDateForSQL';
import styles from '../styles/signup.module.css';

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    User_type: 'Customer',
    User_name: '',
    First_name: '',
    Last_name: '',
    date_of_birth: '',
    Country: '',
    NIC_code: '',
    Gender: 'Male',
    Email: '',
    Membership_Type: 'Normal',
    No_of_booking: 0,
    Password: '',
  });
  const [userCount, setUserCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchTotalPassengerCount = async () => {
      try {
        const response = await fetch('/api/getTotalUsersCountData');
        const data = await response.json();
        const currentUserCount = data.userCount || 0;
        setUserCount(currentUserCount);
      } catch (error) {
        console.error('Error fetching total user count:', error);
      }
    };

    fetchTotalPassengerCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const today = new Date();
    const selectedDate = new Date(formData.date_of_birth);
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDifference = today.getMonth() - selectedDate.getMonth();

    if (
      age < 18 ||
      (age === 18 && monthDifference < 0) ||
      (age === 18 && monthDifference === 0 && today.getDate() < selectedDate.getDate())
    ) {
      alert('You must be at least 18 years old to sign up.');
      return;
    }

    try {
      const newUserID = (userCount + 1).toString();
      const dateOfBirth = new Date(formData.date_of_birth);
      const formattedDateOfBirth = formatDateForSQL(dateOfBirth);

      const validGender =
        formData.Gender === 'Male' ||
        formData.Gender === 'Female' ||
        formData.Gender === 'Other'
          ? formData.Gender
          : 'Other';

      window.alert(`User Data Preview:\nUser ID: ${newUserID}\n`);

      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          User_ID: newUserID,
          newData: {
            User_type: formData.User_type,
            User_name: formData.User_name,
            First_name: formData.First_name,
            Last_name: formData.Last_name,
            date_of_birth: formattedDateOfBirth,
            Country: formData.Country,
            NIC_code: formData.NIC_code,
            Gender: validGender,
            Email: formData.Email,
            Membership_Type: formData.Membership_Type,
            No_of_booking: formData.No_of_booking,
            Password: formData.Password,
          },
        }),
      });

      const result = await response.json();
      if (response.ok) {
        router.push({
          pathname: '/selectAirportPage',
          query: {
            user_id: newUserID,
          },
        });
      } else {
        alert('Error creating user: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
  <div className={styles.pageContainer}>
    <div className={styles.signupContainer}>
      <div className={styles.imageSection}>
        <div>
          <h1 className={styles.imageText1}>SignUp</h1>
          <h1 className={styles.imageText2}>for</h1>
          <h1 className={styles.imageText3}>FlyMora</h1>
        </div>
        <img src="/images/Aeroplane2.jpg" alt="Signup" className={styles.signupImage} />
      </div>

      <div className={styles.formSection}>
        <h1 className={styles.title}>Signup</h1>
        <p className={styles.description}>Total Registered Users: {userCount}</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            User Name:
            <input
              type="text"
              name="User_name"
              className={styles.input}
              value={formData.User_name}
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            First Name:
            <input
              type="text"
              name="First_name"
              className={styles.input}
              value={formData.First_name}
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            Last Name:
            <input
              type="text"
              name="Last_name"
              className={styles.input}
              value={formData.Last_name}
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            Date of Birth:
            <input
              type="date"
              name="date_of_birth"
              className={styles.input}
              value={formData.date_of_birth}
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            Country:
            <input
              type="text"
              name="Country"
              className={styles.input}
              value={formData.Country}
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            NIC Code:
            <input
              type="text"
              name="NIC_code"
              className={styles.input}
              value={formData.NIC_code}
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            Gender:
            <select
              name="Gender"
              className={styles.select}
              value={formData.Gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label className={styles.label}>
            Email:
            <input
              type="email"
              name="Email"
              className={styles.input}
              value={formData.Email}
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            Password:
            <input
              type="password"
              name="Password"
              className={styles.input}
              value={formData.Password}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className={styles.button}>
            Create an Account
          </button>
        </form>
      </div>
    </div>
    </div> 
  );
};

export default Signup;
