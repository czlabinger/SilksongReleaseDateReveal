import React from "react";
import { Button } from "@heroui/button";

const TARGET_DATE = new Date("2025-09-18");

type PreviousDayButtonProps = {
  currentDate: Date;
  setDate: (date: Date) => void;
};

const PreviousDayButton: React.FC<PreviousDayButtonProps> = ({ currentDate, setDate }) => {
  const handleClick = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() - 1);

    if (nextDate >= TARGET_DATE) {
      alert("The date is already past the target date.");
      return;
    }

    setDate(nextDate);
  };

  return (
    <div>
      <Button
        className="relative overflow-hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onPress={handleClick}
      >
            Previous Day
        </Button>

    </div>
  );
};

export default PreviousDayButton;
