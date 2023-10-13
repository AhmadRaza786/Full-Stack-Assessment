import { Request, Response, NextFunction } from 'express';
import { Task } from '../models/task.model';
import { USERS } from '../DATA_SET';


function isValidStatus(status: string): boolean {
  return status === "Pending" || status === "Completed";
}

export const validateCreateUpdateTask = (req: Request, res: Response, next: NextFunction) => {
  const newTask: Task = req.body;

  // Validate and return an error for each missing field
  if (!newTask.title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  if (!newTask.description) {
    return res.status(400).json({ message: 'Description is required' });
  }

  if (!newTask.dueDate) {
    return res.status(400).json({ message: 'Due Date is required' });
  }

  if (!newTask.category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  if (!newTask.status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  if (!isValidStatus(newTask.status)) {
    return res.status(400).json({ message: 'Status is invalid. It must be "Pending" or "Completed"' });
  }


  // Check if the user with the provided userId exists
  if (newTask.assignedTo) {
    const found = USERS.find((u) => u.id === newTask.assignedTo);
    if (!found) {
      return res.status(404).json({ message: `User ${newTask.assignedTo} not found` });
    }
  }

  // If all fields are valid, proceed to the next middleware or route
  next();
};