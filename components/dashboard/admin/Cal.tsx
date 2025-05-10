"use client";

import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { format, isSameDay } from "date-fns";

export function CalendarDemo({
  seniorId,
  availableDates,
}: {
  seniorId: string;
  availableDates: string[];
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const router = useRouter();

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);

    if (selectedDate) {
      const formatted = format(selectedDate, "yyyy-MM-dd");

      if (availableDates.includes(formatted)) {
        router.push(`/diary/${seniorId}/${formatted}`);
      }
    }
  };

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
