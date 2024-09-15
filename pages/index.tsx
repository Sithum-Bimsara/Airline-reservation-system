// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import styles from '../styles/HomePage.module.css';
// import Image from 'next/image';


// const HomePage = () => {
//   const router = useRouter();
//   const [userCount, setUserCount] = useState(0);

//   const handleSignIn = () => {
//     router.push('/signin');
//   };

//   const handleSignUp = () => {
//     router.push('/signup');
//   };

//   useEffect(() => {
//     const fetchTotalUserCount = async () => {
      
//       try {
//         const response = await fetch('/api/getTotalUsersCountData');
//         const data = await response.json();
//         const currentUserCount = data.userCount || 0;
//         setUserCount(currentUserCount);
//       } catch (error) {
//         console.error('Error fetching total user count:', error);
//       }
//     };

//     fetchTotalUserCount();
//   }, []);

//   const handleGuestLogIn = async () => {
//     try {
//       const newUserID = (userCount + 1).toString(); // Generate new User_ID

//       // Display a preview of the data that will be passed to the next page
//       window.alert(`User Data Preview:\nUser ID: ${newUserID}\n`);

//       const response = await fetch('/api/createUser', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           User_ID: newUserID,
//           newData: {
//             User_type: 'Customer',
//             User_name: null,
//             First_name: null,
//             Last_name: null,
//             date_of_birth: null,
//             Country: null,
//             NIC_code: null,
//             Gender: null,
//             Email: null,
//             Membership_Type: null,
//             No_of_booking: null,
//             Password: null,
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

// return (
//   <div className={styles.container}>
//     {/* Navbar */}
//     <div className={styles.navbar}>
//       {/* Navigation Links */}
//       <div className={styles.navLinks}>
//         <a href="#">Home</a>
//         <a href="#">Contact</a>
//         <a href="#">About Us</a>
//       </div>

//       {/* Authentication Buttons */}
//       <div className={styles.authButtons}>
//         <button onClick={handleSignUp} className={styles.authButton}>Sign Up</button>
//         <button onClick={handleSignIn} className={styles.authButton}>Login</button>
       
//       </div>
//     </div>

//     {/* Main Content */}
//     <div className={styles.content}>
//       <h1 className={styles.contenfirstline}>Welcome to </h1>
//       <h1 className={styles.contensecondline}>Flymora Airlines</h1>
//       {/* Add more content or structure below as needed */}
//     </div>

//     <div>
//       <button onClick={handleGuestLogIn} className={styles.authGuestButton}>Book Now</button>
//     </div>


//     <div className={styles.promotionBar}>
//         <div className={styles.promoItem}>
//           <div className={styles.imageWrapper}>
//             <Image src="/images/UK.jpg" alt="Elevate your experience" width={300} height={200} />
//           </div>
//           <h3>Elevate your experience</h3>
//           <p>Purchase add-ons</p>
//         </div>
//         <div className={styles.promoItem}>
//           <div className={styles.imageWrapper}>
//             <Image src="/images/AUSTRALIA.jpg" alt="Fly to London" width={300} height={200} />
//           </div>
//           <h3>Fly to London</h3>
//           <p>Fares from LKR 239,504</p>
//         </div>
//         <div className={styles.promoItem}>
//           <div className={styles.imageWrapper}>
//             <Image src="/images/RUSSIA.jpg" alt="Stopover in Qatar" width={300} height={200} />
//           </div>
//           <h3>Stopover in Qatar from $14 pp</h3>
//           <p>Book now</p>
//         </div>
//         <div className={styles.promoItem}>
//           <div className={styles.imageWrapper}>
//             <Image src="/images/USA.jpg" alt="Exclusive offer" width={300} height={200} />
//           </div>
//           <h3>Exclusive offer for cardholders</h3>
//           <p>Save up to 12%</p>
//         </div>
//       </div>

//   </div>
  
// );
// }
// export default HomePage;
import React, { useEffect, useState } from 'react'; 
import { useRouter } from 'next/router';
import styles from '../styles/HomePage.module.css';
import Image from 'next/image';

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
        <div className={styles.navLinks}>
          <a href="#">Home</a>
          <a href="#">Contact</a>
          <a href="#">About Us</a>
        </div>
        <div className={styles.authButtons}>
          <button onClick={handleSignUp} className={styles.authButton}>Sign Up</button>
          <button onClick={handleSignIn} className={styles.authButton}>Login</button>
        </div>
      </div>
      
      {/* Banner Image */}
      <div className={styles.bannerImage}>
        <Image
          src="/images/b1.jpg"
          alt="Banner Image"
          layout="responsive"
          width={1920}
          height={300}
        />
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        <h1 className={styles.contenfirstline}>Welcome to </h1>
        <h1 className={styles.contensecondline}>Flymora Airlines</h1>
      </div>

      <div>
        <button onClick={handleGuestLogIn} className={styles.authGuestButton}>Book Now</button>
      </div>

      {/* Promotion Bar */}
      <div className={styles.promotionBar}>
        <div className={styles.promoItem}>
          <div className={styles.imageWrapper}>
            <Image src="/images/UK.jpg" alt="Elevate your experience" width={300} height={200} />
          </div>
          <h3 className={styles.promoTitle}>Elevate your experience</h3>
          <p>Purchase add-ons</p>
        </div>
        <div className={styles.promoItem}>
          <div className={styles.imageWrapper}>
            <Image src="/images/AUSTRALIA.jpg" alt="Fly to London" width={300} height={200} />
          </div>
          <h3 className={styles.promoTitle}>Fly to London</h3>
          <p>Fares from LKR 239,504</p>
        </div>
        <div className={styles.promoItem}>
          <div className={styles.imageWrapper}>
            <Image src="/images/RUSSIA.jpg" alt="Stopover in Qatar" width={300} height={200} />
          </div>
          <h3 className={styles.promoTitle}>Stopover in Qatar from $14 pp</h3>
          <p>Book now</p>
        </div>
        <div className={styles.promoItem}>
          <div className={styles.imageWrapper}>
            <Image src="/images/USA.jpg" alt="Exclusive offer" width={300} height={200} />
          </div>
          <h3 className={styles.promoTitle}>Exclusive offer for cardholders</h3>
          <p>Save up to 12%</p>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerColumns}>
          <div>
            <h3>Flymora Airlines</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press Releases</a></li>
              <li><a href="#">Sponsorship</a></li>
            </ul>
          </div>
          <div>
            <h3>Group Companies</h3>
            <ul>
              <li><a href="#">Flymora Cargo</a></li>
              <li><a href="#">Flymora Executive</a></li>
              <li><a href="#">Flymora Holidays</a></li>
            </ul>
          </div>
          <div>
            <h3>Business Solutions</h3>
            <ul>
              <li><a href="#">Corporate Travel</a></li>
              <li><a href="#">Advertise with Us</a></li>
            </ul>
          </div>
          <div>
            <h3>Help</h3>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Travel Alerts</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.socialLinks}>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
          <p>&copy; 2024 Flymora Airlines. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
