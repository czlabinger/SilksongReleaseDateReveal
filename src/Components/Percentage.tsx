import React from "react";

type PercentageProps = {
  date: Date | string;
};

const Percentage: React.FC<PercentageProps> = ({ date }) => {
  const currentDate = new Date(date);
  const targetDate = new Date("2025-12-25");

  currentDate.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const timeDiff = targetDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));


  let percentage: number;
  if (daysRemaining <= 0) {
    percentage = 100; 
  } else {
    percentage = (1 / daysRemaining) * 100;
  }

  return (
    <div>
      {percentage.toFixed(18)}%
    </div>
  );
};

export default Percentage;
