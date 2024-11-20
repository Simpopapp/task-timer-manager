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
    pending: 'bg-status-pending',
    progress: 'bg-status-progress',
    completed: 'bg-status-completed',
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