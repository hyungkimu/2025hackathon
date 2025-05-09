"use client";

import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { format, isSameDay } from "date-fns";

export function CalendarDemo({ availableDates }: { availableDates: string[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const router = useRouter();

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);

    if (selectedDate) {
      const formatted = format(selectedDate, "yyyy-MM-dd");

      // 해당 날짜에 일기가 있으면만 이동
      if (availableDates.includes(formatted)) {
        router.push(`/diary/${formatted}`);
      }
    }
  };

  // ❌ 비활성화할 날짜를 만들어서 전달
  const disabledDates = (day: Date) => {
    const dayStr = format(day, "yyyy-MM-dd");
    return !availableDates.includes(dayStr);
  };

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={handleSelect}
      className="rounded-md border shadow"
      disabled={disabledDates}
      modifiersClassNames={{
        today: "bg-yellow-400 text-gray-700 border",
      }}
    />
  );
}
