import { useState } from 'react';
import { useRouter } from 'next/router';

const Signin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: '', // This will be either username or email
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/getUserNamesAndEmails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: formData.identifier, // username or email
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const { User_ID } = result; // Assuming the result contains the User_ID

        // Display User_ID in a popup window
        window.alert(`User ID: ${User_ID}`);

        // Redirect to the selectAirportPage with the User_ID in the query string
        router.push({
          pathname: '/selectAirportPage',
          query: { user_id: User_ID },
        });
      } else {
        // Display error message
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email:
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Signin;
