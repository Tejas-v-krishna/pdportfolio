import React, { useState, useEffect } from 'react';

export const BottomStatusBar: React.FC = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Format date: "JUN 13, 2026"
      const dateStr = now.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }).toUpperCase();

      // Format time: "4:28 PM"
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      setDate(dateStr);
      setTime(timeStr);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Hide immediately when scrolling down (past 30px)
      // This ensures it is only visible when at the top of the page (in the hero)
      // and is hidden before it can float over the Philosophy section!
      setIsVisible(window.scrollY <= 30);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-transparent text-black/85 flex flex-row justify-center items-center z-[900] font-body font-bold text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.2em] uppercase select-none transition-all duration-500 ease-in-out gap-8 sm:gap-16 md:gap-24 whitespace-nowrap ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div>KERALA, IN</div>
      <div>{date}</div>
      <div>{time}</div>
    </div>
  );
};

export default BottomStatusBar;
