import React, { useState, useEffect } from 'react';

const DaysLeftWeek: React.FC = () => {
  const [currentDay, setCurrentDay] = useState(0);

  useEffect(() => {
    const updateCurrentDay = () => {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      setCurrentDay(dayOfWeek);
    };

    updateCurrentDay();
    const interval = setInterval(updateCurrentDay, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex flex-col items-center justify-center p-6 h-full">
      <div className="space-y-2 mb-2">
        {days.map((day, index) => (
          <div
            key={day}
            className={`w-32 h-3 rounded-full transition-all duration-300 ${
              index <= currentDay 
                ? 'bg-gray-400 opacity-20' 
                : 'bg-white'
            }`}
          />
        ))}
      </div>
      <div className="text-center">
        <div className="text-white text-sm font-medium">{7 - currentDay - 1} Days left this Week</div>

      </div>
    </div>
  );
};

export default DaysLeftWeek;