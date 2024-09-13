import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  const router = useRouter();
  const [userCount, setUserCount] = useState(0);

  const handleSignIn = () => {
    router.push('/signin');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  useEffect(() => {
    const fetchTotalUserCount = async () => {
      
      try {
        const response = await fetch('/api/getTotalUsersCountData');
        const data = await response.json();
        const currentUserCount = data.userCount || 0;
        setUserCount(currentUserCount);
      } catch (error) {
        console.error('Error fetching total user count:', error);
      }
    };

    fetchTotalUserCount();
  }, []);

  const handleGuestLogIn = async () => {
    try {
      const newUserID = (userCount + 1).toString(); // Generate new User_ID

      // Display a preview of the data that will be passed to the next page
      window.alert(`User Data Preview:\nUser ID: ${newUserID}\n`);

      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          User_ID: newUserID,
          newData: {
            User_type: 'Customer',
            User_name: null,
            First_name: null,
            Last_name: null,
            date_of_birth: null,
            Country: null,
            NIC_code: null,
            Gender: null,
            Email: null,
            Membership_Type: null,
            No_of_booking: null,
            Password: null,
          },
        }),
      });

      const result = await response.json();
      if (response.ok) {
        // Redirect to the next page with the new user ID
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
  <div className={styles.container}>
    {/* Navbar */}
    <div className={styles.navbar}>
      {/* Navigation Links */}
      <div className={styles.navLinks}>
        <a href="#">Home</a>
        <a href="#">Contact</a>
        <a href="#">About Us</a>
      </div>

      {/* Authentication Buttons */}
      <div className={styles.authButtons}>
        <button onClick={handleSignUp} className={styles.authButton}>Sign Up</button>
        <button onClick={handleSignIn} className={styles.authButton}>Login</button>
       
      </div>
    </div>

    {/* Main Content */}
    <div className={styles.content}>
      <h1 className={styles.contenfirstline}>Welcome to </h1>
      <h1 className={styles.contensecondline}>Flymora Airlines</h1>
      <p>Crafting amazing experiences with our platform.</p>
      {/* Add more content or structure below as needed */}
    </div>

    <div>
    <button onClick={handleGuestLogIn} className={styles.authGuestButton}>Book Now</button>
    </div>



    {/* Add video section */}
    <div className={styles.videoContainer}>
  {/* <h2>Our Video Presentation</h2>
  <video width="600" height="400"  autoPlay loop muted>
    <source src='../videos/sky.mp4' type="video/mp4" />
    Your browser does not support the video tag.
  </video> */}
</div>

  </div>
  
);
}
export default HomePage;
