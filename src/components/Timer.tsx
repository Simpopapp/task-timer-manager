import { useEffect } from 'react';
import { useTaskStore } from '@/lib/store';
import { Progress } from '@/components/ui/progress';

export const Timer = () => {
  const { timer, tasks, updateTimer, updateTaskTime } = useTaskStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer.isRunning) {
        updateTimer();
        if (timer.activeTaskId) {
          updateTaskTime(timer.activeTaskId);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer.isRunning, timer.activeTaskId]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const activeTask = tasks.find((task) => task.id === timer.activeTaskId);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Weekly Timer</h2>
        <div className="text-4xl font-bold text-primary mb-4">
          {formatTime(timer.weeklyTimeRemaining)}
        </div>
        <Progress value={(timer.weeklyTimeRemaining / (24 * 60 * 60)) * 100} />
      </div>

      {activeTask && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Current Task Timer</h3>
          <div className="text-2xl font-bold text-primary">
            {formatTime(activeTask.timeSpent)}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Currently tracking: {activeTask.title}
          </p>
        </div>
      )}
    </div>
  );
};