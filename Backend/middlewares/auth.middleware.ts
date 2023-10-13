import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BLACK_LISTED_TOKENS } from '../DATA_SET';

interface UserRequest extends Request {
  user?: any;
}

export const authenticateUser = (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Token is missing.' });
  }

  if (BLACK_LISTED_TOKENS.includes(token)) {
    return res.status(401).json({ message: 'Unauthorized. Token is expired' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET || '');

    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
  }
};
