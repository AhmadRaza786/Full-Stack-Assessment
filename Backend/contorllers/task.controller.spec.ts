import { Request, Response } from 'express';
import { getAllTasks, deleteTask, updateTask, getTaskById, createTask } from './task.controller';

import { TASKS } from '../DATA_SET';

describe('createTask', () => {

  const newTaskData = {
    title: 'New Task',
    description: 'Description of the new task',
    dueDate: new Date('2023-10-18'),
    assignedTo: '1',
    category: 'Client Projects',
    status: 'Pending',
  };


  it('should create a new task and return it with a 201 status', () => {

    const req = {
      body: newTaskData,
    } as Request;


    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    } as unknown as Response;



    createTask(req, res);


    expect(res.status).toHaveBeenCalledWith(201);

  });

  it('should return "User not found" when assigned to a non-existing user', () => {

    const newTaskData = {
      title: 'New Task',
      description: 'Description of the new task',
      assignedTo: 'nonExistingUserId',
      category: 'Client Projects',
      status: 'Pending',
    };

    const req = {
      body: newTaskData,
    } as Request;


    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    } as unknown as Response;

    createTask(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User nonExistingUserId not found' });
  });
});

describe('getTaskById', () => {
  it('should return an existing task by ID', () => {
    const taskIdToRetrieve = '1';

    const req = {
      params: { id: taskIdToRetrieve },
    } as unknown as Request;


    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    } as unknown as Response;

    getTaskById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return "Task not found" for a non-existing task', () => {
    const nonExistingTaskId = 'nonExistingTask';

    const req = {
      params: { id: nonExistingTaskId },
    } as unknown as Request;


    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    } as unknown as Response;

    getTaskById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
  });
});

describe('getAllTasks', () => {
  it('should retrieve all tasks when no query parameters are provided', () => {
    const req = {
      query: {}
    } as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    } as unknown as Response;

    // Call the function
    getAllTasks(req, res);

    // Verify that the response was sent with all tasks
    expect(res.json).toHaveBeenCalledWith(TASKS);
  });

  it('should filter tasks by assignedTo when "assignedTo" query parameter is provided', () => {
    const req = {
      query: {
        assignedTo: '1', // Replace with a valid user ID
      },
    } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    } as unknown as Response;

    // Call the function
    getAllTasks(req, res);

    // Verify that the response contains tasks assigned to 'user123'
    const filteredTasks = TASKS.filter((task) => task.assignedTo === '1');
    expect(res.json).toHaveBeenCalledWith(filteredTasks);
  });

  it('should filter tasks by category when "category" query parameter is provided', () => {
    const req = {
      query: {
        category: 'categoryName', // Replace with a valid category name
      },
    } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    } as unknown as Response;

    // Call the function
    getAllTasks(req, res);

    // Verify that the response contains tasks in the specified category
    const filteredTasks = TASKS.filter((task) => task.category === 'categoryName');
    expect(res.json).toHaveBeenCalledWith(filteredTasks);
  });

  it('should support pagination when "page" and "pageSize" query parameters are provided', () => {
    const req = {
      query: {
        page: '2',
        pageSize: '10',
      },
    } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    } as unknown as Response;

    // Call the function
    getAllTasks(req, res);

    // Verify that the response contains the second page of tasks with the specified page size
    const startIndex = (Number(req.query.page) - 1) * Number(req.query.pageSize);
    const endIndex = startIndex + Number(req.query.pageSize);
    const expectedTasks = TASKS.slice(startIndex, endIndex);
    expect(res.json).toHaveBeenCalledWith(expectedTasks);
  });
});

describe('updateTask', () => {
  const updatedTaskData = {
    id: '1',
    title: 'Complete Project Proposal',
    description: 'Finish the project proposal for the client.',
    dueDate: '2023-10-18',
    assignedTo: '1',
    category: 'Client Projects',
    status: 'Pending',
  };

  it('should update an existing task and return the updated task', () => {
    const taskIdToUpdate = '1';


    const req = {
      params: { id: taskIdToUpdate },
      body: updatedTaskData,
    } as unknown as Request;


    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    } as unknown as Response;


    updateTask(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

  });

  it('should return "Task not found" for a non-existing task', () => {
    const nonExistingTaskId = '10';

    const req = {
      params: { id: nonExistingTaskId },
      body: updatedTaskData,
    } as unknown as Request;

    // Create a mock response object
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res), // Return `res` for method chaining
    } as unknown as Response;

    // Call the function
    updateTask(req, res);

    // Verify that the response status and message
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
  });
});

describe('deleteTask', () => {
  it('should delete an existing task and return a success message', () => {
    const taskIdToDelete = '1'; // Replace with a valid task ID
    const req = { params: { id: taskIdToDelete } } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res), // Return `res` for method chaining
    } as unknown as Response;

    // Call the function
    deleteTask(req, res);

    // Verify that the response status and message
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Task deleted' });

    // Verify that the task has been removed from TASKS
    // Add expectations to ensure the task with taskIdToDelete is no longer in TASKS
  });

  it('should return "Task not found" for a non-existing task', () => {
    const nonExistingTaskId = 'nonExistingTask123'; // Replace with a non-existing task ID
    const req = { params: { id: nonExistingTaskId } } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res), // Return `res` for method chaining
    } as unknown as Response;

    // Call the function
    deleteTask(req, res);

    // Verify that the response status and message
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
  });
});