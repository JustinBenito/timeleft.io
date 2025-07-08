import React, { useState } from 'react';
import PieChartToday from './components/PieChartToday';
import DaysLeftWeek from './components/DaysLeftWeek';
import MonthsLeftYear from './components/MonthsLeftYear';
import MotivationalMetrics from './components/MotivationalMetrics';
import DotMatrixClock from './components/DotMatrixClock';
import YearlyDotsGrid from './components/YearlyDotsGrid';
import GoalTracker from './components/GoalTracker';
import { useLocalStorage } from './hooks/useLocalStorage';

interface Goal {
  id: string;
  text: string;
  date: string;
  color: string;
}

function App() {
  const [goals, setGoals] = useLocalStorage<Goal[]>('timeleft-goals', []);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();

  const handleGoalAdd = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
    };
    setGoals([...goals, newGoal]);
  };

  const handleGoalRemove = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
  };

  return (

    <div className="flex overflow-hidden flex-col min-h-screen bg-black text-white p-4">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <h1 className="font-bricolage text-lg font-regular">time<span className='text-rose-500'>left</span>.io</h1>
      </header>

      {/* Main Grid - fills available space */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-y-0">
          {/* Top Row - Time Visualization */}
          <div className="flex-1 lg:col-span-12 grid grid-cols-1 md:grid-cols-3">
            <div className="border-2 border-b-0 md:border-r-0 border-dashed border-gray-700 h-full">
              <PieChartToday />
            </div>
            <div className="border-2 border-b-0 md:border-r-0 border-dashed border-gray-700 h-full">
              <DaysLeftWeek />
            </div>
            <div className="border-2 border-b-0 border-dashed border-gray-700 h-full">
              <MonthsLeftYear />
            </div>
          </div>
          {/* Middle Row - Metrics and Clock */}
          <div className="flex-1 lg:col-span-12 grid grid-cols-1 md:grid-cols-2">
            <div className="border-2 border-b-0 md:border-r-0 border-dashed border-gray-700 h-full">
              <MotivationalMetrics />
            </div>
            <div className="border-2 border-b-0 border-dashed border-gray-700 h-full">
              <DotMatrixClock />
            </div>
          </div>
          {/* Bottom Row - Year Grid and Goals */}
          <div className="flex-1 lg:col-span-12 grid grid-cols-1 md:grid-cols-2">
            <div className="border-2 border-b-0 md:border-b-2 md:border-r-0 border-dashed border-gray-700 h-full">
              <YearlyDotsGrid 
                goals={goals} 
                onDayClick={handleDayClick}
              />
            </div>
            <div className="border-2 border-dashed border-gray-700 h-full">
              <GoalTracker 
                goals={goals}
                onGoalAdd={handleGoalAdd}
                onGoalRemove={handleGoalRemove}
                selectedDate={selectedDate}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='flex w-full flex-col items-center justify-center px-4 py-4 text-white md:px-8 lg:px-16'>
        <div className='text-center'>
          <div>
            Made with 🩵 by
            <a href='https://justinbenito.com' className='ml-2 text-[#b5f4ff]'>Justin Benito</a>
          </div>
        </div>
      </footer>
    </div>

  );
}

export default App;