import { create } from 'zustand';
import { Task, TaskStatus, Timer } from './types';

interface TaskStore {
  tasks: Task[];
  timer: Timer;
  addTask: (task: Omit<Task, 'id' | 'timeSpent' | 'createdAt'>) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  updateTaskNotes: (id: string, notes: string) => void;
  updateTimer: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  timer: {
    weeklyTimeRemaining: 24 * 60 * 60, // 24 hours in seconds
    isRunning: false,
  },
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: Math.random().toString(36).substring(7),
          timeSpent: 0,
          createdAt: new Date(),
        },
      ],
    })),
  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),
  updateTaskNotes: (id, notes) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, notes } : task
      ),
    })),
  updateTimer: () =>
    set((state) => ({
      timer: {
        ...state.timer,
        weeklyTimeRemaining: Math.max(0, state.timer.weeklyTimeRemaining - 1),
      },
    })),
}));