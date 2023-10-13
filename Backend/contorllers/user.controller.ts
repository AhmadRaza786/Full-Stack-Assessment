// user.controller.ts
import { Request, Response } from 'express';
import { BLACK_LISTED_TOKENS, USERS } from "../DATA_SET";
import jwt from 'jsonwebtoken';


export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Find the user by their username or email
  const user = await USERS.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized. Invalid credentials.' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.SECRET || '', { expiresIn: '1h' });

  return res.status(200).json({ token });
};


export const logout = (req: Request, res: Response) => {
  const token = req.header('auth-token');

  if (token) {
    BLACK_LISTED_TOKENS.push(token);
  }

  res.json({ message: 'Logged out successfully' });
};
