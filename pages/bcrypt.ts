import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

const saltRounds = 10; // Number of salt rounds for bcrypt

// Hash the password before saving
const hashPassword = async (plainPassword: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};

// Example usage in a signup API handler
const signupHandler = async (req: Request, res: Response): Promise<void> => {
  const { password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    // Now save the `hashedPassword` to the database
    // ...
    res.status(200).json({ message: 'User signed up successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up user' });
  }
};
