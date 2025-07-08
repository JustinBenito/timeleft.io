import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Goal {
  id: string;
  text: string;
  date: string;
  color: string;
}

interface GoalTrackerProps {
  goals: Goal[];
  onGoalAdd: (goal: Omit<Goal, 'id'>) => void;
  onGoalRemove: (id: string) => void;
  selectedDate?: string;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({ 
  goals, 
  onGoalAdd, 
  onGoalRemove, 
  selectedDate 
}) => {
  const [newGoal, setNewGoal] = useState('');
  const [goalDate, setGoalDate] = useState(selectedDate || '');
  const [isAddingGoal, setIsAddingGoal] = useState(false);

  const colors = [
    '#FF1493', '#00FF7F', '#1E90FF', '#FF4500', '#32CD32', '#FF69B4', '#00CED1', '#FF6347', '#00FFFF', '#DA70D6', '#FFFF00', '#7FFF00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim() && goalDate) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      onGoalAdd({
        text: newGoal.trim(),
        date: goalDate,
        color: randomColor,
      });
      setNewGoal('');
      setGoalDate('');
      setIsAddingGoal(false);
    }
  };

  React.useEffect(() => {
    if (selectedDate) {
      setGoalDate(selectedDate);
      setIsAddingGoal(true);
    }
  }, [selectedDate]);

  return (
    <div className="p-6 h-full">
      <div className="mb-4">
        <div className="text-white text-sm font-medium mb-2">Goals</div>
        <div className="text-gray-400 text-xs">
          Track your important dates and milestones
        </div>
      </div>

      <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="flex items-center justify-between p-3 bg-[#1F2123] rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: goal.color }}
              />
              <div>
                <div className="text-white text-sm">{goal.text}</div>
                <div className="text-white text-xs">
                  {new Date(goal.date).toLocaleDateString()}
                </div>
              </div>
            </div>
            <button
              onClick={() => onGoalRemove(goal.id)}
              className="text-white hover:text-red-400 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {isAddingGoal ? (
        <form onSubmit={handleSubmit} className="space-y-1">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Enter goal..."
            className="w-full p-2 bg-[#1F2123] border border-gray-700 rounded text-white text-sm placeholder-white focus:outline-none focus:border-blue-500"
            autoFocus
          />
          <input
            type="date"
            value={goalDate}
            onChange={(e) => setGoalDate(e.target.value)}
            className="w-full p-2 bg-[#1F2123] border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-blue-500"
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-sm rounded transition-colors"
            >
              Add Goal
            </button>
            <button
              type="button"
              onClick={() => setIsAddingGoal(false)}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAddingGoal(true)}
          className="flex items-center space-x-2 w-full p-3 border-2 border-dashed border-gray-600 rounded-lg hover:border-gray-500 transition-colors"
        >
          <Plus size={16} className="text-rose-500" />
          <span className="text-white text-sm">Add new goal</span>
        </button>
      )}
    </div>
  );
};

export default GoalTracker;