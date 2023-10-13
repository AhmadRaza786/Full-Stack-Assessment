export interface Task {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  dueDate: Date;
  assignedTo: string; // UserId
  category: string;
  status: 'Pending' | 'Completed';
}

