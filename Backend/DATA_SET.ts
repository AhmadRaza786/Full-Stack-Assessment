import { Task } from './models/task.model';
import { User } from './models/user.model';

// Mock data for tasks
export const TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete Project Proposal',
    description: 'Finish the project proposal for the client.',
    creationDate: new Date('2023-10-11'),
    dueDate: new Date('2023-10-18'),
    assignedTo: '1',
    category: 'Client Projects',
    status: 'Pending',
  },
  {
    id: '2',
    title: 'Review Code Pull Request',
    description: 'Review and merge the pull request on GitHub.',
    creationDate: new Date('2023-10-10'),
    dueDate: new Date('2023-10-15'),
    assignedTo: '2',
    category: 'Internal Development',
    status: 'Pending',
  },
  {
    id: '3',
    title: 'Prepare Presentation',
    description: 'Create a presentation for the upcoming meeting.',
    creationDate: new Date('2023-10-09'),
    dueDate: new Date('2023-10-14'),
    assignedTo: '',
    category: 'Meetings',
    status: 'Completed',
  },
];


export const USERS: User[] = [
  {
    id: '1',
    fullName: 'John Doe',
    username: 'john',
    password: 'password',
  },
  {
    id: '2',
    fullName: 'Alice Smith',
    username: 'alice',
    password: 'password',

  },
]

export const BLACK_LISTED_TOKENS: string[] = [];