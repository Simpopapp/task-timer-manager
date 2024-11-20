import { Task } from '@/lib/types';
import { useTaskStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

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

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 mb-4">
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
          <p className="text-sm text-gray-500 mb-2">Time spent: {formatTime(task.timeSpent)}</p>
          <Progress 
            value={(task.timeSpent / (8 * 3600)) * 100} 
            className="h-2"
          />
        </div>

        {task.status !== 'completed' && (
          <Textarea
            value={task.notes}
            onChange={(e) => updateTaskNotes(task.id, e.target.value)}
            placeholder="Add notes..."
            className="mb-4"
          />
        )}

        {task.status !== 'completed' && (
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
              variant="outline"
              className="bg-status-completed text-white hover:bg-status-completed/90"
            >
              Complete
            </Button>
          </div>
        )}
      </Card>
    </motion.div>
  );
};