import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BLACK_LISTED_TOKENS } from '../DATA_SET';
import { authenticateUser } from './auth.middleware';

describe('authenticateUser', () => {

  process.env.SECRET = 'SECRET_PASSWORD';


  it('should authenticate a user with a valid token', () => {

    const validToken = jwt.sign({ userId: '1' }, process.env.SECRET || '', { expiresIn: '1h' });

    const req = {
      header: jest.fn().mockReturnValue(validToken),
    } as unknown as Request & { user: any };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    
    authenticateUser(req, res, next);

    expect(req.user).toBeDefined();
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return "Unauthorized. Token is missing." if no token is provided', () => {
    const req = {
      header: jest.fn().mockReturnValue(undefined),
    } as unknown as Request & { user: any };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    authenticateUser(req, res, next);

    expect(req.user).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized. Token is missing.' });
  });

  it('should return "Unauthorized. Token is expired" for a blacklisted token', () => {
    const expiredToken = 'expiredToken';

    const req = {
      header: jest.fn().mockReturnValue(expiredToken),
    } as unknown as Request & { user: any };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    BLACK_LISTED_TOKENS.push(expiredToken);

    authenticateUser(req, res, next);

    expect(req.user).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized. Token is expired' });
  });

  it('should return "Unauthorized. Invalid token." for an invalid token', () => {
    const invalidToken = 'invalidToken';

    const req = {
      header: jest.fn().mockReturnValue(invalidToken),
    } as unknown as Request & { user: any };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    authenticateUser(req, res, next);

    expect(req.user).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized. Invalid token.' });
  });
});
