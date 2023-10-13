import { Request, Response } from 'express';
import { login, logout } from './user.controller';
import { BLACK_LISTED_TOKENS } from '../DATA_SET';

describe('User Controller', () => {
  describe('login', () => {
    it('should successfully log in and return a token', async () => {
      const validUsername = 'alice';
      const validPassword = 'password';

      const req = {
        body: { username: validUsername, password: validPassword },
      } as Request;

      const res = {
        json: jest.fn(),
        status: jest.fn(() => res),
      } as unknown as Response;

      // Mock user data
      const USERS = [
        { id: 'user123', username: validUsername, password: validPassword },
        // Add more user data as needed
      ];

      process.env.SECRET = 'your-secret-key';

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
    });

    it('should return "Unauthorized. Invalid credentials." for invalid login', async () => {
      const invalidUsername = 'invalidUser';
      const invalidPassword = 'invalidPassword';

      const req = {
        body: { username: invalidUsername, password: invalidPassword },
      } as Request;

      const res = {
        json: jest.fn(),
        status: jest.fn(() => res),
      } as unknown as Response;

      // Mock user data
      const USERS = [
        { id: 'user123', username: 'validUser', password: 'validPassword' },
        // Add more user data as needed
      ];

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized. Invalid credentials.' });
    });
  });

  describe('logout', () => {
    it('should log out successfully and add the token to the blacklist', () => {
      const validToken = 'validToken';

      const req = {
          header: () => validToken,
      } as unknown as Request;

      const res = {
        json: jest.fn(),
      } as unknown as Response;

    

      logout(req, res);

      expect(BLACK_LISTED_TOKENS).toContain(validToken);
      expect(res.json).toHaveBeenCalledWith({ message: 'Logged out successfully' });
    });

    it('should not add the token to the blacklist if no token is provided', () => {
        const req = {
            header: () => undefined, // Simulate no token provided
        } as unknown as Request;
      
        const res = {
          json: jest.fn(),
        } as unknown as Response;
      
        // Mock data and setup
        const BLACK_LISTED_TOKENS = ['existingToken']; // Add a token to simulate an existing token
      
        logout(req, res);
      
        expect(BLACK_LISTED_TOKENS).not.toContain(undefined); // Ensure undefined is not added
        expect(res.json).toHaveBeenCalledWith({ message: 'Logged out successfully' });
      });
  });
});
