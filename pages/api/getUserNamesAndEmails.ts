import { NextApiRequest, NextApiResponse } from 'next';
import { getUserNamesAndEmails } from '../../lib/db'; // Assuming this function fetches the usernames and emails from the DB

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { identifier } = req.body;

  if (!identifier) {
    return res.status(400).json({ message: 'Username/Email is required' });
  }

  try {
    // Fetch all users (assumed to return an array of { User_name, Email, User_ID })
    const users = await getUserNamesAndEmails();

    if (!users) {
      return res.status(500).json({ message: 'Could not retrieve users' });
    }

    // Find the user by either username or email
    const user = users.find(
      (user: { User_name: string; Email: string }) =>
        user.User_name === identifier || user.Email === identifier
    );

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or email' });
    }

    // Success: return the User_ID in the response for use on the client side
    return res.status(200).json({ message: 'Login successful', User_ID: user.User_ID });

  } catch (error) {
    console.error('Error during sign-in:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
