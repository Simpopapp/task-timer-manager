import { Timer } from '@/components/Timer';
import { TaskList } from '@/components/TaskList';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Task Manager</h1>
        <Timer />
        <TaskList />
      </div>
    </div>
  );
};

export default Index;