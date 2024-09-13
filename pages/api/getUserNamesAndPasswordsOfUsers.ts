// /pages/api/signin.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserNamesAndPasswordsOfUsers } from '../../lib/db'; // Assuming this function fetches the usernames and passwords from the DB
import bcrypt from 'bcrypt'; // Import bcrypt to compare passwords

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Username/Email and password are required' });
  }

  try {
    // Fetch all users (assumed to return an array of { User_name, Email, Password })
    const users = await getUserNamesAndPasswordsOfUsers();
  
    if (!users) {
      return res.status(500).json({ message: 'Could not retrieve users' });
    }
  
    // Find the user by either username or email
    const user = users.find(
      (user: { User_name: string; Email: string }) =>
        user.User_name === identifier || user.Email === identifier
    );
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid username/email or password' });
    }
  
    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.Password);
  
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username/email or password' });
    }
  
    // Success: return a success message or initiate a session/JWT if needed
    return res.status(200).json({ message: 'Login successful', userId: user.User_name });
  
  } catch (error) {
    console.error('Error during sign-in:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  
}
