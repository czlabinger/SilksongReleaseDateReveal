"use client";

import Percentage from "@/Components/Percentage";
import Footer from "@/Components/Footer";
import { useState } from "react";
import NextDayButton from "@/Components/NextDayButton";
import PreviousDayButton from "@/Components/PreviousDayButton";
import RandomBackgroundImages from '@/Components/RandomBackground';

export default function Home() {

  function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
  
  function formatDateDDthMMYYYY(date: Date): string {
    const day = date.getDate();
    const suffix = getOrdinalSuffix(day);
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day}${suffix} of ${month} ${year}`;
  }

  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <>
      <RandomBackgroundImages/>
      <div className="text-center pt-32 flex flex-col min-h-screen">
        The probability of a release date for <strong>Silksong</strong> on the <strong>{formatDateDDthMMYYYY(currentDate)}</strong>

        <div className="flex items-center justify-center gap-8 pt-8">
          <PreviousDayButton currentDate={currentDate} setDate={setCurrentDate} />
          
          <div className="text-5xl w-[600px] text-center">
            <Percentage date={currentDate} />
          </div>
          
          <NextDayButton currentDate={currentDate} setDate={setCurrentDate} />
        </div>

        <Footer />

      </div>
    </>
  );
}
