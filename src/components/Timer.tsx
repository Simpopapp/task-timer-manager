import { useEffect } from 'react';
import { useTaskStore } from '@/lib/store';

export const Timer = () => {
  const { timer, updateTimer } = useTaskStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer.isRunning) {
        updateTimer();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer.isRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Weekly Timer</h2>
      <div className="text-4xl font-bold text-primary">
        {formatTime(timer.weeklyTimeRemaining)}
      </div>
      <div className="mt-4 h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{
            width: `${(timer.weeklyTimeRemaining / (24 * 60 * 60)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};