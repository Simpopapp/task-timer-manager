import { useState } from 'react';
import { useTaskStore } from '@/lib/store';
import { TaskCard } from './TaskCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TaskCategory } from '@/lib/types';

export const TaskList = () => {
  const { tasks, addTask } = useTaskStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory>('work');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle,
        description: '',
        category: selectedCategory,
        status: 'pending',
        notes: '',
      });
      setNewTaskTitle('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title..."
          className="flex-1"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as TaskCategory)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
        </select>
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};