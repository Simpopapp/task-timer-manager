import { create } from 'zustand';
import { Task, TaskStatus, Timer } from './types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TaskStore {
  tasks: Task[];
  timer: Timer;
  addTask: (task: Omit<Task, 'id' | 'timeSpent' | 'createdAt' | 'completedAt'>) => Promise<void>;
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
  updateTaskNotes: (id: string, notes: string) => Promise<void>;
  updateTimer: () => void;
  updateTaskTime: (id: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  timer: {
    weeklyTimeRemaining: 24 * 60 * 60,
    isRunning: false,
    activeTaskId: null,
  },
  fetchTasks: async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const tasks: Task[] = data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        category: task.category || 'work', // Default category
        status: task.status as TaskStatus || 'pending',
        notes: task.notes || '',
        timeSpent: task.time_spent || 0,
        createdAt: new Date(task.created_at || new Date()),
        completedAt: task.completed_at ? new Date(task.completed_at) : null,
        priority: task.priority,
        assigned_to: task.assigned_to
      }));

      set({ tasks });
    } catch (error) {
      toast.error('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    }
  },
  addTask: async (task) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          title: task.title,
          description: task.description,
          category: task.category,
          status: task.status,
          notes: task.notes,
          time_spent: 0,
          priority: 'medium',
        }])
        .select()
        .single();

      if (error) throw error;

      const newTask: Task = {
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category || 'work',
        status: data.status as TaskStatus,
        notes: data.notes || '',
        timeSpent: data.time_spent || 0,
        createdAt: new Date(data.created_at),
        completedAt: data.completed_at ? new Date(data.completed_at) : null,
        priority: data.priority,
        assigned_to: data.assigned_to
      };

      set(state => ({
        tasks: [newTask, ...state.tasks],
      }));

      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Failed to add task');
      console.error('Error adding task:', error);
    }
  },
  updateTaskStatus: async (id, status) => {
    try {
      const now = new Date().toISOString();
      const { error } = await supabase
        .from('tasks')
        .update({
          status,
          completed_at: status === 'completed' ? now : null,
          updated_at: now,
        })
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        tasks: state.tasks.map(task =>
          task.id === id
            ? {
                ...task,
                status,
                completedAt: status === 'completed' ? new Date() : null,
              }
            : task
        ),
        timer: {
          ...state.timer,
          isRunning: status === 'progress',
          activeTaskId: status === 'progress' ? id : null,
        },
      }));

      toast.success(`Task ${status === 'completed' ? 'completed' : 'updated'}`);
    } catch (error) {
      toast.error('Failed to update task status');
      console.error('Error updating task status:', error);
    }
  },
  updateTaskNotes: async (id, notes) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ notes, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        tasks: state.tasks.map(task =>
          task.id === id ? { ...task, notes } : task
        ),
      }));
    } catch (error) {
      toast.error('Failed to update task notes');
      console.error('Error updating task notes:', error);
    }
  },
  updateTimer: () => {
    set(state => ({
      timer: {
        ...state.timer,
        weeklyTimeRemaining: Math.max(0, state.timer.weeklyTimeRemaining - 1),
      },
    }));
  },
  updateTaskTime: async (id) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          time_spent: get().tasks.find(t => t.id === id)!.timeSpent + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        tasks: state.tasks.map(task =>
          task.id === id ? { ...task, timeSpent: task.timeSpent + 1 } : task
        ),
      }));
    } catch (error) {
      console.error('Error updating task time:', error);
    }
  },
}));