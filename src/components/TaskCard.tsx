import { Task } from '@/lib/types';
import { useTaskStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { updateTaskStatus, updateTaskNotes } = useTaskStore();

  const statusColors = {
    pending: 'bg-yellow-500',
    progress: 'bg-blue-500',
    completed: 'bg-green-500',
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className="p-6 mb-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{task.title}</h3>
        <span
          className={`${
            statusColors[task.status]
          } px-3 py-1 rounded-full text-white text-sm`}
        >
          {task.status}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{task.description}</p>
      
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          Time spent: {formatTime(task.timeSpent)}
        </p>
      </div>

      <Textarea
        value={task.notes}
        onChange={(e) => updateTaskNotes(task.id, e.target.value)}
        placeholder="Add notes..."
        className="mb-4"
      />

      <div className="flex gap-2">
        <Button
          onClick={() => updateTaskStatus(task.id, 'pending')}
          variant={task.status === 'pending' ? 'default' : 'outline'}
        >
          Pending
        </Button>
        <Button
          onClick={() => updateTaskStatus(task.id, 'progress')}
          variant={task.status === 'progress' ? 'default' : 'outline'}
        >
          In Progress
        </Button>
        <Button
          onClick={() => updateTaskStatus(task.id, 'completed')}
          variant={task.status === 'completed' ? 'default' : 'outline'}
        >
          Completed
        </Button>
      </div>
    </Card>
  );
};