import { Request, Response, NextFunction } from 'express';
import { validateCreateUpdateTask } from './validate-create-update-task.middleware';
import { Task } from '../models/task.model';
import { USERS } from '../DATA_SET';

describe('validateCreateUpdateTask', () => {
  const mockRequest = (newTask: Partial<Task> = {}): Request => ({
    body: newTask,
  } as Request);

  const mockResponse = (): Response => {
    const res: Response = ({
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown) as Response;
    return res;
  };

  const mockNext = jest.fn() as NextFunction;

  it('should pass when all required fields are provided', () => {
    const newTask: Partial<Task> = {
      title: 'Task Title',
      description: 'Task Description',
      dueDate: new Date(),
      category: 'Task Category',
      status: 'Pending',
    };

    const req = mockRequest(newTask);
    const res = mockResponse();

    validateCreateUpdateTask(req, res, mockNext);

    expect(res.status).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  it('should return a 400 status when title is missing', () => {
    const newTask: Partial<Task> = {
      description: 'Task Description',
      dueDate: new Date(),
      category: 'Task Category',
      status: 'Pending',
    };

    const req = mockRequest(newTask);
    const res = mockResponse();

    validateCreateUpdateTask(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Title is required' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  // Add similar test cases for other missing fields and invalid status

  it('should return a 400 status when status is invalid', () => {
    const newTask: Partial<Task> = {
      title: 'Task Title',
      description: 'Task Description',
      dueDate: new Date(),
      category: 'Task Category',
      status: 'InvalidStatus' as 'Pending' | 'Completed',
    };

    const req = mockRequest(newTask);
    const res = mockResponse();

    validateCreateUpdateTask(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Status is invalid. It must be "Pending" or "Completed"' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return a 404 status when assignedTo user is not found', () => {
    const newTask: Partial<Task> = {
      title: 'Task Title',
      description: 'Task Description',
      dueDate: new Date(),
      category: 'Task Category',
      status: 'Pending',
      assignedTo: 'InvalidUserId',
    };

    const req = mockRequest(newTask);
    const res = mockResponse();

    validateCreateUpdateTask(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User InvalidUserId not found' });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
