import { Request, Response } from 'express';
import { Task } from '../models/task.model';
import { TASKS, USERS } from '../DATA_SET';
import { v4 as uuidv4 } from 'uuid';

export const createTask = (req: Request, res: Response) => {
  const newTask: Task = req.body;
  newTask.id = uuidv4();

  if (newTask.assignedTo) {
    const found = USERS.find((u) => u.id === newTask.assignedTo);
    if (!found) {
      return res.status(404).json({ message: `User ${newTask.assignedTo} not found` });
    }
  }

  TASKS.push(newTask);
  res.status(201).json(newTask);
};


export const getTaskById = (req: Request, res: Response) => {
  const taskId = req.params.id;
  const task = TASKS.find((t) => t.id === taskId);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};


export const updateTask = (req: Request, res: Response) => {
  const taskId = req.params.id;
  const updatedTask: Task = req.body;
  const taskIndex = TASKS.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    
    TASKS[taskIndex] = updatedTask;
    res.status(200).json(updatedTask);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

export const deleteTask = (req: Request, res: Response) => {
  const taskId = req.params.id;
  const taskIndex = TASKS.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    TASKS.splice(taskIndex, 1);
    res.status(200).json({ message: 'Task deleted' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

export const getAllTasks = (req: Request, res: Response) => {
  const { assignedTo, category, page, pageSize } = req.query;

  let filteredTasks = [...TASKS];

  if (assignedTo) {
    filteredTasks = filteredTasks.filter((task) => task.assignedTo === assignedTo);
  }

  if (category) {
    filteredTasks = filteredTasks.filter((task) => task.category === category);
  }

  if (page && pageSize) {
    const startIndex = (Number(page) - 1) * Number(pageSize);
    const endIndex = startIndex + Number(pageSize);
    filteredTasks = filteredTasks.slice(startIndex, endIndex);
  }

  res.status(200).json(filteredTasks);
};
