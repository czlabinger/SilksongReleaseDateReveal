import React from "react";
import { Button } from "@heroui/button";

const TARGET_DATE = new Date("2025-09-18");

type NextDayButtonProps = {
  currentDate: Date;
  setDate: (date: Date) => void;
};

const NextDayButton: React.FC<NextDayButtonProps> = ({ currentDate, setDate }) => {
  const handleClick = () => {
    const nextDate = new Date(currentDate);

    if (nextDate > TARGET_DATE) {
      alert("The date is already past the target date.");
      return;
    }

    nextDate.setDate(nextDate.getDate() + 1);
    setDate(nextDate);
  };

  return (
    <div>
      <Button
        className="relative overflow-hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onPress={handleClick}
      >
        Next Day
      </Button>
    </div>
  );
};

export default NextDayButton;
