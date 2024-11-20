export type TaskStatus = 'pending' | 'progress' | 'completed';
export type TaskCategory = 'work' | 'personal' | 'shopping' | 'health';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  category: TaskCategory;
  status: TaskStatus;
  notes: string;
  timeSpent: number;
  createdAt: Date;
  completedAt: Date | null;
  priority: string | null;
  assigned_to: string | null;
}

export interface Timer {
  weeklyTimeRemaining: number;
  isRunning: boolean;
  activeTaskId: string | null;
}