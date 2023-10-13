import express from 'express';
import * as TaskController from './contorllers/task.controller';
import { validateCreateUpdateTask } from './middlewares/validate-create-update-task.middleware';
import { authenticateUser } from './middlewares/auth.middleware';
import { login } from './contorllers/user.controller';

const router = express.Router();

router.post('/tasks', authenticateUser, validateCreateUpdateTask, TaskController.createTask);
router.get('/tasks/:id', authenticateUser, TaskController.getTaskById);
router.put('/tasks/:id', authenticateUser, validateCreateUpdateTask, TaskController.updateTask);
router.delete('/tasks/:id', authenticateUser, TaskController.deleteTask);
router.get('/tasks', authenticateUser, TaskController.getAllTasks);

router.post('/user/login', login)

export default router;
